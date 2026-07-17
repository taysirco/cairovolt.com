"use client";

import { createContext, useContext, useEffect, useState, useTransition, useCallback, ReactNode } from 'react';
import { ttqAddToCart } from '@/lib/tiktokPixel';
import {
    getProductBySlug,
    getSmartBundleProducts,
    resolveCatalogPricing,
} from '@/lib/static-products';

export interface CartItem {
    productId: string;
    // Optional for carts saved before SKU persistence was introduced.
    sku?: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    brand?: string;
    // Links items that qualify for the server-validated bundle discount.
    bundleId?: string;
}

function normalizeBundleAssignments(items: CartItem[]): CartItem[] {
    const productSlug = (productId: string) => {
        if (!productId.startsWith('static_')) return productId;
        return productId.slice('static_'.length).split('_', 1)[0];
    };
    const groups = new Map<string, CartItem[]>();
    for (const item of items) {
        if (!item.bundleId) continue;
        const group = groups.get(item.bundleId) || [];
        group.push(item);
        groups.set(item.bundleId, group);
    }

    const invalidBundleIds = new Set<string>();
    for (const [bundleId, group] of groups) {
        const match = bundleId.match(/^combo-static_([a-z0-9-]+)$/);
        const mainProduct = match ? getProductBySlug(match[1]) : undefined;
        const expectedProducts = mainProduct
            ? [mainProduct, ...getSmartBundleProducts(mainProduct).bundleProducts.map(entry => entry.product)]
            : [];
        const expectedIds = new Set(expectedProducts.map(product => product.slug));
        const actualIds = new Set(group.map(item => productSlug(item.productId)));
        const isComplete = expectedIds.size >= 2
            && actualIds.size === expectedIds.size
            && [...actualIds].every(id => expectedIds.has(id));
        if (!isComplete) invalidBundleIds.add(bundleId);
    }

    if (invalidBundleIds.size === 0) return items;
    return items.map(item => item.bundleId && invalidBundleIds.has(item.bundleId)
        ? { ...item, bundleId: undefined }
        : item);
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    addBundleToCart: (bundleItems: CartItem[], bundleId: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalAmount: number;
    totalItems: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isPending: boolean;
    isLoaded: boolean;
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
                // تحديث أسعار السلة القديمة من الكتالوج الحالي — كي يرى العميل
                // السعر الصحيح (يطابق ما يفرضه الخادم عند الطلب). المنتجات غير
                // الموجودة في الكتالوج الثابت تبقى بسعرها المحفوظ.
                const parsed = JSON.parse(savedCart);
                const refreshed = Array.isArray(parsed)
                    ? parsed.map((it: CartItem) => {
                        const cat = resolveCatalogPricing(it);
                        if (cat.status === 'ok') {
                            const currentItem = { ...it } as CartItem & { originalPrice?: number };
                            delete currentItem.originalPrice;
                            return { ...currentItem, price: cat.price, sku: cat.sku || it.sku };
                        }
                        return it;
                    })
                    : parsed;
                setItems(Array.isArray(refreshed) ? normalizeBundleAssignments(refreshed) : []);
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

    // 🏆 إضافة الكومبو الذهبي ذرّياً: يضيف عناصر الكومبو الناقصة (كمية 1) ويوسم
    //    الجميع (بما فيها المنتج الأساسي الموجود سلفاً) بـbundleId دون رفع أي كمية —
    //    فيصير الخصم 5% ساري المفعول خادمياً على المجموعة. تحديث واحد للحالة (بلا سباق).
    const addBundleToCart = useCallback((bundleItems: CartItem[], bundleId: string) => {
        if (!bundleItems.length || !bundleId) return;
        startCartTransition(() => {
            setItems(currentItems => {
                const byId = new Map(currentItems.map(it => [it.productId, it]));
                for (const bi of bundleItems) {
                    const existing = byId.get(bi.productId);
                    if (existing) {
                        byId.set(bi.productId, { ...existing, bundleId }); // وسم فقط — الكمية تبقى
                    } else {
                        byId.set(bi.productId, { ...bi, bundleId, quantity: bi.quantity || 1 });
                    }
                }
                return Array.from(byId.values());
            });
        });
        const addedValue = bundleItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
        ttqAddToCart({ content_id: bundleId, content_name: 'golden-combo', value: addedValue, quantity: bundleItems.length });
        setTimeout(() => setIsOpen(true), 600);
    }, [startCartTransition]);

    const removeFromCart = useCallback((productId: string) => {
        startCartTransition(() => {
            setItems(currentItems => {
                const removedBundleId = currentItems.find(item => item.productId === productId)?.bundleId;
                return currentItems
                    .filter(item => item.productId !== productId)
                    .map(item => removedBundleId && item.bundleId === removedBundleId
                        ? { ...item, bundleId: undefined }
                        : item);
            });
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
            addBundleToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalAmount,
            totalItems,
            isOpen,
            setIsOpen,
            isPending,
            isLoaded
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
