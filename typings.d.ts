export type ProductType = {
    _id: string
    name: string
    slug: string
    description?: string
    sku: string
    category: string
    oldPrice?: number
    price: number
    currency: string
    quantity?: number
    image: string
    images: string[]
    colors: string[]
    sizes?: string[]
    stars: number
    ratings: number
    inStock?: boolean
    shipsIn?: string
    relatedProducts: string[]
}

// export type RelatedProductType = Pick<ProductType, "name" | "slug" | "image" | "oldPrice" | "price" | "stars" | "ratings">