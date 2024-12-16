export type ProductType = {
    id: string
    name: string
    slug: string
    description?: string
    categories: string[]
    oldPrice?: number
    price: number
    currency: string
    quantity?: number
    images: string[]
    colors: {
        [key: number]: string[]
    }
    sizes?: {
        [key: number]: string[]
    }
    stars: number
    ratings: number
    inStock?: boolean
    shipsIn?: string
    relatedProducts: string[]
}

export type OrderItem = {
    productId: string
    size: string
    color: string
    quantity: number
    price: number
}

export type OrderData = {
    customerName: string
    email: string
    billingAddress: string
    shippingAddress: string
    phone: string
    items: OrderItem[]
    total: number
    shipping: number
    tax: number
    discount: number
    grandTotal: number
}

// export type RelatedProductType = Pick<ProductType, "name" | "slug" | "image" | "oldPrice" | "price" | "stars" | "ratings">