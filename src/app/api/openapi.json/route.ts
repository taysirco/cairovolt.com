import { NextResponse } from 'next/server';

/**
 * OpenAPI 3.1.0 Specification for CairoVolt M2M Commerce API
 * Serves at: /api/openapi.json
 * 
 * This spec enables AI agents to auto-discover available endpoints,
 * understand request/response schemas, and execute actions programmatically.
 */

export async function GET() {
    const spec = {
        openapi: '3.1.0',
        info: {
            title: 'CairoVolt M2M Commerce API',
            description: 'Machine-to-Machine API for AI agents, smart assistants, and IoT devices to browse products, check prices/availability, and place orders on CairoVolt — the authorized Anker & Joyroom distributor in Egypt.',
            version: '1.0.0',
            contact: {
                name: 'CairoVolt Support',
                email: 'support@cairovolt.com',
                url: 'https://cairovolt.com/en/contact',
            },
            'x-logo': {
                url: 'https://cairovolt.com/logo.png',
            },
        },
        servers: [
            {
                url: 'https://cairovolt.com',
                description: 'Production',
            },
        ],
        paths: {
            '/api/v1/checkout': {
                get: {
                    operationId: 'checkProductAvailability',
                    summary: 'Check product price & availability',
                    description: 'Look up a product by SKU, slug, or search query. Returns real-time price, stock status, shipping info, and a ready-to-use buy action.',
                    tags: ['Checkout'],
                    parameters: [
                        {
                            name: 'sku',
                            in: 'query',
                            description: 'Product SKU (e.g., A1289)',
                            schema: { type: 'string' },
                        },
                        {
                            name: 'slug',
                            in: 'query',
                            description: 'Product URL slug (e.g., anker-737-powerbank)',
                            schema: { type: 'string' },
                        },
                        {
                            name: 'q',
                            in: 'query',
                            description: 'Free-text search query (e.g., "anker charger 45w")',
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Product found with price and availability',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/AvailabilityResponse' },
                                },
                            },
                        },
                        '404': {
                            description: 'Product not found',
                        },
                    },
                },
                post: {
                    operationId: 'placeOrder',
                    summary: 'Place an order (Cash on Delivery)',
                    description: 'Submit an order for a product. Payment is Cash on Delivery — no prepayment required. The customer pays after inspecting the product.',
                    tags: ['Checkout'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/OrderRequest' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Order placed successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/OrderResponse' },
                                },
                            },
                        },
                        '400': { description: 'Missing required fields' },
                        '404': { description: 'Product not found' },
                        '409': { description: 'Product out of stock' },
                    },
                },
            },
            '/api/products': {
                get: {
                    operationId: 'listProducts',
                    summary: 'List all products with filtering & pagination',
                    tags: ['Products'],
                    parameters: [
                        { name: 'brand', in: 'query', description: 'Filter by brand (e.g., Anker, Joyroom)', schema: { type: 'string' } },
                        { name: 'category', in: 'query', description: 'Filter by category slug (e.g., power-banks, wall-chargers)', schema: { type: 'string' } },
                        { name: 'slug', in: 'query', description: 'Filter by product slug', schema: { type: 'string' } },
                        { name: 'status', in: 'query', description: 'Filter by status (active, draft)', schema: { type: 'string' } },
                        { name: 'search', in: 'query', description: 'Search by name (EN/AR) or slug', schema: { type: 'string' } },
                        { name: 'page', in: 'query', description: 'Page number (default: 1)', schema: { type: 'integer', default: 1 } },
                        { name: 'limit', in: 'query', description: 'Items per page (default: 50)', schema: { type: 'integer', default: 50 } },
                    ],
                    responses: {
                        '200': {
                            description: 'Paginated product list',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ProductListResponse' },
                                },
                            },
                        },
                    },
                },
            },
            '/api/products/{id}': {
                get: {
                    operationId: 'getProduct',
                    summary: 'Get a single product by Firestore ID',
                    tags: ['Products'],
                    parameters: [
                        { name: 'id', in: 'path', required: true, description: 'Firestore document ID', schema: { type: 'string' } },
                    ],
                    responses: {
                        '200': { description: 'Product details' },
                        '404': { description: 'Product not found' },
                    },
                },
            },
            '/api/categories': {
                get: {
                    operationId: 'listCategories',
                    summary: 'List all product categories',
                    tags: ['Categories'],
                    responses: {
                        '200': { description: 'Array of categories' },
                    },
                },
            },
            '/api/reviews': {
                get: {
                    operationId: 'getProductReviews',
                    summary: 'Get verified reviews for a product',
                    tags: ['Reviews'],
                    parameters: [
                        { name: 'productSlug', in: 'query', required: true, description: 'Product slug', schema: { type: 'string' } },
                    ],
                    responses: {
                        '200': { description: 'Reviews and aggregate rating' },
                    },
                },
            },
            '/api/feed': {
                get: {
                    operationId: 'getMerchantFeed',
                    summary: 'Google Merchant Center XML product feed',
                    tags: ['Feeds'],
                    responses: {
                        '200': {
                            description: 'RSS 2.0 XML product feed',
                            content: { 'application/xml': {} },
                        },
                    },
                },
            },
            '/.well-known/llms.txt': {
                get: {
                    operationId: 'getAIFeed',
                    summary: 'AI agent feed (Markdown) — product catalog, lab test data, business info',
                    tags: ['Feeds'],
                    responses: {
                        '200': {
                            description: 'Markdown text for AI consumption',
                            content: { 'text/plain': {} },
                        },
                    },
                },
            },
        },
        components: {
            schemas: {
                AvailabilityResponse: {
                    type: 'object',
                    properties: {
                        available: { type: 'boolean', description: 'Whether the product is in stock' },
                        product: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                sku: { type: 'string', nullable: true },
                                slug: { type: 'string' },
                                brand: { type: 'string' },
                                category: { type: 'string' },
                                name: {
                                    type: 'object',
                                    properties: {
                                        en: { type: 'string' },
                                        ar: { type: 'string' },
                                    },
                                },
                                price: {
                                    type: 'object',
                                    properties: {
                                        amount: { type: 'number' },
                                        currency: { type: 'string', enum: ['EGP'] },
                                        originalPrice: { type: 'number', nullable: true },
                                        discount: { type: 'integer', nullable: true, description: 'Discount percentage' },
                                    },
                                },
                                stock: { type: 'integer' },
                                image: { type: 'string', nullable: true },
                                url: { type: 'string', format: 'uri' },
                            },
                        },
                        shipping: {
                            type: 'object',
                            properties: {
                                fee: { type: 'number' },
                                currency: { type: 'string' },
                                freeAbove: { type: 'number' },
                                estimatedDays: {
                                    type: 'object',
                                    properties: { min: { type: 'integer' }, max: { type: 'integer' } },
                                },
                            },
                        },
                        payment: {
                            type: 'object',
                            properties: {
                                methods: { type: 'array', items: { type: 'string' } },
                                note: { type: 'string' },
                            },
                        },
                        actions: {
                            type: 'object',
                            description: 'Available actions the AI agent can execute',
                            properties: {
                                buy: {
                                    type: 'object',
                                    properties: {
                                        method: { type: 'string', enum: ['POST'] },
                                        url: { type: 'string', format: 'uri' },
                                        body: { type: 'object' },
                                    },
                                },
                            },
                        },
                    },
                },
                OrderRequest: {
                    type: 'object',
                    required: ['customerName', 'phone', 'address', 'city'],
                    properties: {
                        sku: { type: 'string', description: 'Product SKU or slug (one of sku/slug required)' },
                        slug: { type: 'string', description: 'Product URL slug (one of sku/slug required)' },
                        quantity: { type: 'integer', default: 1, minimum: 1 },
                        customerName: { type: 'string', description: 'Customer full name' },
                        phone: { type: 'string', description: 'Phone number (e.g., +201063374834)' },
                        whatsapp: { type: 'string', description: 'WhatsApp number (defaults to phone)' },
                        address: { type: 'string', description: 'Full delivery address' },
                        city: { type: 'string', description: 'City or governorate code' },
                    },
                },
                OrderResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        order: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                orderId: { type: 'string', description: 'Human-readable order ID (e.g., CV-123456)' },
                                status: { type: 'string', enum: ['pending', 'confirmed', 'shipped', 'delivered'] },
                                pricing: {
                                    type: 'object',
                                    properties: {
                                        subtotal: { type: 'number' },
                                        shipping: { type: 'number' },
                                        total: { type: 'number' },
                                        currency: { type: 'string' },
                                    },
                                },
                                delivery: {
                                    type: 'object',
                                    properties: {
                                        estimatedDays: {
                                            type: 'object',
                                            properties: { min: { type: 'integer' }, max: { type: 'integer' } },
                                        },
                                        address: { type: 'string' },
                                        city: { type: 'string' },
                                    },
                                },
                            },
                        },
                        tracking: {
                            type: 'object',
                            properties: {
                                whatsapp: { type: 'string', format: 'uri' },
                                phone: { type: 'string' },
                            },
                        },
                    },
                },
                ProductListResponse: {
                    type: 'object',
                    properties: {
                        items: { type: 'array', items: { type: 'object' } },
                        pagination: {
                            type: 'object',
                            properties: {
                                page: { type: 'integer' },
                                limit: { type: 'integer' },
                                total: { type: 'integer' },
                                totalPages: { type: 'integer' },
                            },
                        },
                        source: { type: 'string', enum: ['firebase', 'static_fallback'] },
                    },
                },
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-API-Key',
                    description: 'API key required for write operations (POST/PUT/DELETE on /api/products, /api/categories). Read operations and /api/v1/checkout are public.',
                },
            },
        },
        security: [],
        tags: [
            { name: 'Checkout', description: 'M2M Commerce — check availability and place orders programmatically' },
            { name: 'Products', description: 'Browse and search the product catalog' },
            { name: 'Categories', description: 'Product categories' },
            { name: 'Reviews', description: 'Verified customer reviews' },
            { name: 'Feeds', description: 'Machine-readable feeds (XML, Markdown)' },
        ],
    };

    return NextResponse.json(spec, {
        headers: {
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
