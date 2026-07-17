import { NextResponse } from 'next/server';
import { getAllGovernoratesSlugs } from '@/data/governorates';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import {
    STANDARD_DELIVERY_MAX_DAYS,
    STANDARD_DELIVERY_MIN_DAYS,
    STANDARD_SHIPPING_MAX_EGP,
    STANDARD_SHIPPING_MIN_EGP,
} from '@/lib/merchant-product-data';

/**
 * OpenAPI 3.1.0 Specification for CairoVolt M2M Commerce API
 * Serves at: /api/openapi.json
 * 
 * This spec enables AI agents to auto-discover available endpoints,
 * understand request/response schemas, and execute actions programmatically.
 */

export async function GET() {
    const governorateSlugs = getAllGovernoratesSlugs();

    const spec = {
        openapi: '3.1.0',
        info: {
            title: 'CairoVolt M2M Commerce API',
            description: 'Public CairoVolt catalog and cash-on-delivery ordering API. Clients can browse products, check the currently published catalog price and availability, and submit a customer-authorized order for delivery in Egypt.',
            version: '1.0.0',
            contact: {
                name: 'CairoVolt Support',
                email: 'info@cairovolt.com',
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
        'x-cairovolt-shipping': {
            currency: 'EGP',
            freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
            paidShippingRange: {
                min: STANDARD_SHIPPING_MIN_EGP,
                max: STANDARD_SHIPPING_MAX_EGP,
            },
            deliveryEstimateDays: {
                min: STANDARD_DELIVERY_MIN_DAYS,
                max: STANDARD_DELIVERY_MAX_DAYS,
            },
            note: 'The checkout returns the exact shipping fee after a valid Egyptian governorate slug is supplied. A lookup without a governorate returns the published range; Quick COD uses the maximum as a provisional estimate until the address is confirmed.',
        },
        paths: {
            '/api/verify': {
                post: {
                    operationId: 'checkWarrantySerial',
                    summary: 'Check a CairoVolt warranty serial',
                    description: 'Checks whether a 13-character serial was issued by CairoVolt and activates or returns its CairoVolt warranty record. It does not certify manufacturer authenticity.',
                    tags: ['Warranty'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['serial'],
                                    properties: {
                                        serial: { type: 'string', description: '13-character CairoVolt serial (CV-1XXXXXm313)' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Registered serial found; warranty record activated or returned' },
                        '400': { description: 'Invalid serial format' },
                        '404': { description: 'Serial not found in CairoVolt records' },
                        '429': { description: 'Too many attempts' },
                        '500': { description: 'Warranty-record service unavailable' },
                    },
                },
            },
            '/api/v1/checkout': {
                get: {
                    operationId: 'checkProductAvailability',
                    summary: 'Check product price & availability',
                    description: 'Look up a product by its established URL slug or by a free-text query. A unique SKU remains accepted for legacy integrations, but a slug is the stable product reference. Shipping is returned as 0 above the free-shipping threshold or as the published governorate-dependent range until an order supplies a valid governorate slug.',
                    tags: ['Checkout'],
                    parameters: [
                        {
                            name: 'slug',
                            in: 'query',
                            description: 'Established product URL slug (recommended)',
                            example: 'anker-737-powerbank',
                            schema: { type: 'string' },
                        },
                        {
                            name: 'sku',
                            in: 'query',
                            description: 'Unique catalog SKU for legacy integrations. Use slug when available because a SKU can identify more than one catalog page.',
                            deprecated: true,
                            example: 'A1289',
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
                        '409': {
                            description: 'Legacy SKU is ambiguous; retry with one of the returned product slugs',
                        },
                        '429': { description: 'Rate limit exceeded' },
                        '503': { description: 'Catalog service temporarily unavailable' },
                    },
                },
                post: {
                    operationId: 'placeOrder',
                    summary: 'Place an order (Cash on Delivery)',
                    description: 'Submit a customer-authorized single-product order using the established product slug. Payment is Cash on Delivery. The exact shipping fee is calculated from the validated Egyptian governorate slug and the server-side catalog subtotal.',
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
                        '400': { description: 'Missing or invalid fields, including an unknown governorate slug or a quantity outside 1-10' },
                        '404': { description: 'Product not found' },
                        '409': { description: 'Product out of stock or legacy SKU is ambiguous' },
                        '429': { description: 'Rate limit exceeded' },
                        '500': { description: 'Order could not be created' },
                        '503': { description: 'Order database temporarily unavailable' },
                    },
                },
            },
            '/api/v1/quick-cod': {
                get: {
                    operationId: 'checkQuickCodAvailability',
                    summary: 'Check a single product before Quick COD',
                    description: 'Returns the current catalog price, stock, and shipping range for one product. The query parameter keeps its legacy name `sku`, but clients should pass the established product slug; a unique SKU is accepted only for backward compatibility.',
                    tags: ['Checkout'],
                    parameters: [
                        {
                            name: 'sku',
                            in: 'query',
                            required: true,
                            description: 'Product reference. Pass the established product slug (recommended); a unique SKU is accepted for legacy clients.',
                            example: 'anker-737-powerbank',
                            schema: { type: 'string', minLength: 2, maxLength: 50 },
                            'x-preferred-reference': 'slug',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Product found with current price, stock, and governorate-dependent shipping range',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/QuickCodAvailabilityResponse' },
                                },
                            },
                        },
                        '400': { description: 'Missing product reference' },
                        '404': { description: 'Product not found' },
                        '409': { description: 'Legacy SKU is ambiguous; retry using a returned product slug' },
                        '429': { description: 'Rate limit exceeded' },
                        '503': { description: 'Catalog service temporarily unavailable' },
                    },
                },
                post: {
                    operationId: 'placeQuickCodOrder',
                    summary: 'Register a one-unit Quick COD request',
                    description: `Registers one unit for phone confirmation. The request field keeps its legacy name \`sku\`, but its value should be the established product slug. Below the free-shipping threshold, omitting city makes the response an estimate: it reports the ${STANDARD_SHIPPING_MIN_EGP}-${STANDARD_SHIPPING_MAX_EGP} EGP shipping range and uses the maximum in the provisional total until the governorate and address are confirmed. Supplying a valid governorate slug makes the shipping quote exact; orders at or above the free-shipping threshold have an exact 0 EGP fee even when city is omitted.`,
                    tags: ['Checkout'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/QuickCodRequest' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Quick COD request registered with exact or explicitly estimated pricing',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/QuickCodOrderResponse' },
                                },
                            },
                        },
                        '400': { description: 'Invalid phone, product reference, source, locale, or governorate slug' },
                        '404': { description: 'Product not found' },
                        '409': { description: 'Product unavailable, duplicate request, or legacy SKU is ambiguous' },
                        '429': { description: 'Rate limit exceeded' },
                        '500': { description: 'Order could not be created' },
                        '503': { description: 'Order database or catalog service temporarily unavailable' },
                    },
                },
            },
            '/api/orders': {
                post: {
                    operationId: 'placeWebsiteOrder',
                    summary: 'Place a cart order (Cash on Delivery)',
                    description: 'Creates a website cart order. Each quantity must be an integer from 1 to 10, no more than 20 item rows or 50 total units are accepted, and city must be a published Egyptian governorate slug. Product prices, discounts, shipping, and the final total are recalculated on the server; clients should identify ordinary items by slug. A productId may also be required to preserve a selected catalog variant.',
                    tags: ['Orders'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/WebsiteOrderRequest' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Order created with server-calculated item prices, discounts, shipping, and total',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/WebsiteOrderResponse' },
                                },
                            },
                        },
                        '400': { description: 'Invalid customer, item, quantity, coupon, variant, or governorate data' },
                        '413': { description: 'Request body exceeds 128 KiB' },
                        '429': { description: 'Rate limit exceeded' },
                        '500': { description: 'Order could not be created' },
                        '503': { description: 'Order database temporarily unavailable' },
                    },
                },
                get: {
                    operationId: 'listOrdersForStaff',
                    summary: 'List orders for authorized staff',
                    description: 'Protected administrative read. This operation is not a public catalog endpoint.',
                    tags: ['Orders'],
                    security: [{ ApiKeyAuth: [] }],
                    responses: {
                        '200': { description: 'Order records, newest first' },
                        '401': { description: 'API key is missing' },
                        '403': { description: 'API key is invalid' },
                        '500': { description: 'Order database query failed' },
                        '503': { description: 'API-key authentication is not configured' },
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
                    description: `Publishes the current checkout price and stock status for catalog items with a working product landing page. Shipping is 0 EGP from ${FREE_SHIPPING_THRESHOLD} EGP; below that threshold the feed uses the conservative nationwide maximum of ${STANDARD_SHIPPING_MAX_EGP} EGP while checkout calculates ${STANDARD_SHIPPING_MIN_EGP}-${STANDARD_SHIPPING_MAX_EGP} EGP from the submitted governorate slug.`,
                    tags: ['Feeds'],
                    responses: {
                        '200': {
                            description: 'RSS 2.0 XML product feed',
                            content: { 'application/xml': {} },
                        },
                    },
                },
            },
            '/api/knowledge-graph': {
                get: {
                    operationId: 'getCatalogKnowledgeGraph',
                    summary: 'Get store, brand, and active-product references as JSON-LD',
                    tags: ['Feeds'],
                    responses: {
                        '200': {
                            description: 'Schema.org JSON-LD graph generated from the published catalog',
                            content: { 'application/ld+json': {} },
                        },
                    },
                },
            },
            '/api/llms/catalog': {
                get: {
                    operationId: 'getCompactMachineCatalog',
                    summary: 'Get a compact Markdown snapshot of the published product catalog',
                    tags: ['Feeds'],
                    responses: {
                        '200': {
                            description: 'Markdown catalog with product-page links, current listed prices, and availability',
                            content: { 'text/markdown': {} },
                        },
                    },
                },
            },
            '/.well-known/llms.txt': {
                get: {
                    operationId: 'getAIFeed',
                    summary: 'AI agent feed (Markdown) — product catalog and business information',
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
                DayRange: {
                    type: 'object',
                    required: ['min', 'max'],
                    properties: {
                        min: { type: 'integer', minimum: 0 },
                        max: { type: 'integer', minimum: 0 },
                    },
                },
                MoneyRange: {
                    type: 'object',
                    required: ['min', 'max'],
                    properties: {
                        min: { type: 'number', minimum: 0 },
                        max: { type: 'number', minimum: 0 },
                    },
                },
                LocalizedName: {
                    type: 'object',
                    required: ['ar', 'en'],
                    properties: {
                        ar: { type: 'string' },
                        en: { type: 'string' },
                    },
                },
                CatalogPrice: {
                    type: 'object',
                    required: ['amount', 'currency'],
                    properties: {
                        amount: { type: 'number', minimum: 0 },
                        currency: { type: 'string', enum: ['EGP'] },
                    },
                },
                LookupShipping: {
                    type: 'object',
                    required: ['fee', 'currency', 'freeAbove', 'feeRange', 'note', 'estimatedDays'],
                    properties: {
                        fee: {
                            type: ['number', 'null'],
                            minimum: 0,
                            description: '0 when the free-shipping threshold is met; otherwise null until a governorate slug is supplied with the order.',
                        },
                        currency: { type: 'string', enum: ['EGP'] },
                        freeAbove: { type: 'number', const: FREE_SHIPPING_THRESHOLD },
                        feeRange: { $ref: '#/components/schemas/MoneyRange' },
                        note: { type: 'string' },
                        estimatedDays: { $ref: '#/components/schemas/DayRange' },
                    },
                },
                AvailabilityResponse: {
                    type: 'object',
                    required: ['available', 'product', 'shipping', 'payment', 'actions'],
                    properties: {
                        available: { type: 'boolean', description: 'Whether the product is in stock' },
                        product: {
                            type: 'object',
                            required: ['id', 'slug', 'brand', 'category', 'name', 'description', 'price', 'stock', 'image', 'url'],
                            properties: {
                                id: { type: 'string' },
                                sku: { type: ['string', 'null'] },
                                slug: { type: 'string' },
                                brand: { type: 'string' },
                                category: { type: 'string' },
                                name: { $ref: '#/components/schemas/LocalizedName' },
                                description: { $ref: '#/components/schemas/LocalizedName' },
                                price: { $ref: '#/components/schemas/CatalogPrice' },
                                stock: { type: 'integer', minimum: 0 },
                                image: { type: ['string', 'null'], format: 'uri' },
                                url: { type: 'string', format: 'uri' },
                            },
                        },
                        shipping: { $ref: '#/components/schemas/LookupShipping' },
                        payment: {
                            type: 'object',
                            properties: {
                                methods: { type: 'array', items: { type: 'string', enum: ['cash_on_delivery'] } },
                                note: { type: 'string' },
                            },
                        },
                        actions: {
                            type: 'object',
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
                    description: 'Use slug for a stable product reference. The legacy SKU field is accepted only when it uniquely identifies one catalog product.',
                    required: ['customerName', 'phone', 'address', 'city'],
                    anyOf: [
                        { required: ['slug'] },
                        { required: ['sku'] },
                    ],
                    properties: {
                        slug: {
                            type: 'string',
                            description: 'Established product URL slug (recommended)',
                            example: 'anker-737-powerbank',
                        },
                        sku: {
                            type: 'string',
                            description: 'Unique SKU retained for legacy integrations; retry with slug if the API reports an ambiguous match.',
                            deprecated: true,
                        },
                        quantity: { type: 'integer', default: 1, minimum: 1, maximum: 10 },
                        customerName: { type: 'string', description: 'Customer full name' },
                        phone: {
                            type: 'string',
                            pattern: '^(?:\\+?20|0)?1[0125][0-9]{8}$',
                            description: 'Egyptian mobile number',
                            example: '01558245974',
                        },
                        whatsapp: { type: 'string', description: 'WhatsApp number (defaults to phone)' },
                        address: { type: 'string', description: 'Full delivery address' },
                        city: {
                            type: 'string',
                            enum: governorateSlugs,
                            description: 'Egyptian governorate slug used to calculate the exact shipping fee',
                            example: 'cairo',
                        },
                    },
                },
                OrderResponse: {
                    type: 'object',
                    required: ['success', 'order', 'tracking'],
                    properties: {
                        success: { type: 'boolean', const: true },
                        order: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                orderId: { type: 'string', description: 'Human-readable order ID' },
                                status: { type: 'string', enum: ['pending'] },
                                items: { type: 'array', items: { type: 'object' } },
                                pricing: {
                                    type: 'object',
                                    properties: {
                                        subtotal: { type: 'number', minimum: 0 },
                                        shipping: { type: 'number', minimum: 0 },
                                        total: { type: 'number', minimum: 0 },
                                        currency: { type: 'string', enum: ['EGP'] },
                                    },
                                },
                                delivery: {
                                    type: 'object',
                                    properties: {
                                        estimatedDays: { $ref: '#/components/schemas/DayRange' },
                                        address: { type: 'string' },
                                        city: { type: 'string', enum: governorateSlugs },
                                    },
                                },
                                payment: { type: 'object' },
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
                QuickCodAvailabilityResponse: {
                    type: 'object',
                    required: ['available', 'product', 'shipping', 'quick_buy'],
                    properties: {
                        available: { type: 'boolean' },
                        product: {
                            type: 'object',
                            required: ['slug', 'brand', 'name', 'price', 'stock', 'image'],
                            properties: {
                                sku: { type: ['string', 'null'] },
                                slug: { type: 'string' },
                                brand: { type: 'string' },
                                name: { $ref: '#/components/schemas/LocalizedName' },
                                price: { $ref: '#/components/schemas/CatalogPrice' },
                                stock: { type: 'integer', minimum: 0 },
                                image: { type: ['string', 'null'], format: 'uri' },
                            },
                        },
                        shipping: { $ref: '#/components/schemas/LookupShipping' },
                        quick_buy: {
                            type: 'object',
                            properties: {
                                method: { type: 'string', enum: ['POST'] },
                                url: { type: 'string', format: 'uri' },
                                body: { type: 'object' },
                                note: { type: 'string' },
                            },
                        },
                    },
                },
                QuickCodRequest: {
                    type: 'object',
                    required: ['sku', 'phone'],
                    properties: {
                        sku: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 50,
                            description: 'Legacy field name for the product reference. Pass the established product slug; a unique SKU is accepted for backward compatibility.',
                            example: 'anker-737-powerbank',
                            'x-preferred-reference': 'slug',
                        },
                        phone: {
                            type: 'string',
                            pattern: '^01[0125][0-9]{8}$',
                            example: '01558245974',
                        },
                        name: { type: 'string', maxLength: 100 },
                        source: {
                            type: 'string',
                            enum: ['search', 'ai_agent', 'shortcut', 'direct'],
                            default: 'search',
                        },
                        locale: { type: 'string', enum: ['ar', 'en'], default: 'ar' },
                        city: {
                            type: 'string',
                            enum: governorateSlugs,
                            description: 'Optional governorate slug. Supply it to receive an exact shipping fee; omit it only when phone confirmation will establish the address.',
                            example: 'cairo',
                        },
                    },
                },
                QuickCodOrderResponse: {
                    type: 'object',
                    required: ['success', 'message', 'order', 'tracking'],
                    properties: {
                        success: { type: 'boolean', const: true },
                        message: { type: 'string' },
                        order: {
                            type: 'object',
                            required: ['id', 'orderId', 'status', 'product', 'pricing', 'delivery'],
                            properties: {
                                id: { type: 'string' },
                                orderId: { type: 'string' },
                                status: { type: 'string', enum: ['pending_cod'] },
                                product: { type: 'object' },
                                pricing: {
                                    type: 'object',
                                    required: ['subtotal', 'shipping', 'total', 'currency', 'isEstimate', 'status', 'shippingRange', 'totalRange'],
                                    properties: {
                                        subtotal: { type: 'number', minimum: 0 },
                                        shipping: {
                                            type: 'number',
                                            minimum: 0,
                                            description: 'Exact fee when city is supplied or shipping is free; otherwise the conservative provisional maximum.',
                                        },
                                        total: {
                                            type: 'number',
                                            minimum: 0,
                                            description: 'Exact total unless isEstimate is true; then it uses the provisional maximum shipping fee.',
                                        },
                                        currency: { type: 'string', enum: ['EGP'] },
                                        isEstimate: { type: 'boolean' },
                                        status: {
                                            type: 'string',
                                            enum: ['confirmed', 'pending_address_confirmation'],
                                        },
                                        shippingRange: { $ref: '#/components/schemas/MoneyRange' },
                                        totalRange: { $ref: '#/components/schemas/MoneyRange' },
                                        freeShippingNote: { type: 'string' },
                                    },
                                },
                                delivery: {
                                    type: 'object',
                                    properties: {
                                        method: { type: 'string' },
                                        estimatedDays: { $ref: '#/components/schemas/DayRange' },
                                        note: { type: 'string' },
                                    },
                                },
                            },
                        },
                        tracking: { type: 'object' },
                    },
                },
                WebsiteOrderItem: {
                    type: 'object',
                    description: 'Use slug for an ordinary catalog item. Include the cart productId when it carries a selected variant identifier. SKU is a legacy fallback and can be ambiguous.',
                    required: ['name'],
                    anyOf: [
                        { required: ['slug'] },
                        { required: ['productId'] },
                        { required: ['sku'] },
                    ],
                    properties: {
                        slug: {
                            type: 'string',
                            description: 'Established product URL slug (recommended)',
                        },
                        productId: {
                            type: 'string',
                            description: 'Cart product identifier; retain it when it includes a selected variant ID.',
                        },
                        sku: {
                            type: 'string',
                            deprecated: true,
                            description: 'Legacy product reference; use slug when possible.',
                        },
                        name: { type: 'string', minLength: 1, maxLength: 180 },
                        quantity: { type: 'integer', default: 1, minimum: 1, maximum: 10 },
                        brand: { type: 'string', maxLength: 60 },
                        image: { type: 'string', maxLength: 300 },
                        bundleId: { type: 'string', maxLength: 200 },
                    },
                },
                WebsiteOrderRequest: {
                    type: 'object',
                    required: ['customerName', 'phone', 'address', 'city', 'items'],
                    properties: {
                        customerName: { type: 'string', minLength: 2, maxLength: 100 },
                        phone: {
                            type: 'string',
                            pattern: '^01[0125][0-9]{8}$',
                            example: '01558245974',
                        },
                        whatsapp: {
                            type: 'string',
                            pattern: '^01[0125][0-9]{8}$',
                            description: 'Defaults to phone when omitted.',
                        },
                        address: { type: 'string', minLength: 5, maxLength: 300 },
                        city: {
                            type: 'string',
                            enum: governorateSlugs,
                            description: 'Egyptian governorate slug used for the exact shipping calculation',
                            example: 'cairo',
                        },
                        cityLabel: { type: 'string', maxLength: 50 },
                        items: {
                            type: 'array',
                            minItems: 1,
                            maxItems: 20,
                            items: { $ref: '#/components/schemas/WebsiteOrderItem' },
                            description: 'No more than 50 units across all item quantities.',
                        },
                        couponCode: { type: 'string', maxLength: 24 },
                    },
                },
                WebsiteOrderResponse: {
                    type: 'object',
                    required: ['id', 'orderId', 'message', 'items', 'pricing'],
                    properties: {
                        id: { type: 'string' },
                        orderId: { type: 'string' },
                        message: { type: 'string' },
                        items: { type: 'array', items: { type: 'object' } },
                        pricing: {
                            type: 'object',
                            required: ['subtotalBeforeDiscount', 'couponDiscount', 'bundleDiscount', 'shippingFee', 'totalAmount'],
                            properties: {
                                subtotalBeforeDiscount: { type: 'number', minimum: 0 },
                                couponDiscount: { type: 'number', minimum: 0 },
                                bundleDiscount: { type: 'number', minimum: 0 },
                                shippingFee: { type: 'number', minimum: 0 },
                                totalAmount: { type: 'number', minimum: 0 },
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
                        source: { type: 'string', enum: ['static'] },
                    },
                },
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-API-Key',
                    description: 'API key required for staff order reads and catalog-management write operations. Catalog reads and customer-facing order submissions are public and rate-limited.',
                },
            },
        },
        security: [],
        tags: [
            { name: 'Checkout', description: 'Check published availability and submit customer-authorized cash-on-delivery orders' },
            { name: 'Orders', description: 'Website cart orders and protected staff order reads' },
            { name: 'Products', description: 'Browse and search the product catalog' },
            { name: 'Categories', description: 'Product categories' },
            { name: 'Reviews', description: 'Verified customer reviews' },
            { name: 'Warranty', description: 'CairoVolt-issued warranty record checks' },
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
