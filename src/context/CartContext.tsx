"use client";

import { createContext, useContext, useEffect, useState, useTransition, useCallback, ReactNode } from 'react';
import { ttqAddToCart } from '@/lib/tiktokPixel';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    brand?: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalAmount: number;
    totalItems: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isPending: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPending, startCartTransition] = useTransition();

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cairovolt_cart');
            if (savedCart) {
                setItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Deferred localStorage write — never blocks the main thread
    // Safari private browsing: localStorage.setItem throws QuotaExceededError
    useEffect(() => {
        if (!isLoaded) return;

        let idleId: number | undefined;
        const saveCart = () => {
            try {
                localStorage.setItem('cairovolt_cart', JSON.stringify(items));
            } catch {
                // Safari private browsing or storage full — silently ignore
            }
        };

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            idleId = requestIdleCallback(saveCart);
        } else {
            const timeoutId = setTimeout(saveCart, 0);
            idleId = timeoutId as unknown as number;
        }

        return () => {
            if (idleId !== undefined) {
                if ('cancelIdleCallback' in window) {
                    cancelIdleCallback(idleId);
                } else {
                    clearTimeout(idleId);
                }
            }
        };
    }, [items, isLoaded]);

    const addToCart = useCallback((newItem: CartItem) => {
        startCartTransition(() => {
            setItems(currentItems => {
                const existingItem = currentItems.find(item => item.productId === newItem.productId);
                if (existingItem) {
                    return currentItems.map(item =>
                        item.productId === newItem.productId
                            ? { ...item, quantity: item.quantity + newItem.quantity }
                            : item
                    );
                }
                return [...currentItems, newItem];
            });
        });
        // TikTok Pixel: AddToCart event
        ttqAddToCart({
            content_id: newItem.productId,
            content_name: newItem.name,
            value: newItem.price * newItem.quantity,
            quantity: newItem.quantity,
        });
        // Delay drawer open so "✓ Added" button feedback is visible first
        setTimeout(() => setIsOpen(true), 600);
    }, [startCartTransition]);

    const removeFromCart = useCallback((productId: string) => {
        startCartTransition(() => {
            setItems(currentItems => currentItems.filter(item => item.productId !== productId));
        });
    }, [startCartTransition]);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        startCartTransition(() => {
            setItems(currentItems =>
                currentItems.map(item =>
                    item.productId === productId
                        ? { ...item, quantity }
                        : item
                )
            );
        });
    }, [removeFromCart, startCartTransition]);

    const clearCart = useCallback(() => {
        startCartTransition(() => {
            setItems([]);
        });
    }, [startCartTransition]);

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalAmount,
            totalItems,
            isOpen,
            setIsOpen,
            isPending
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
