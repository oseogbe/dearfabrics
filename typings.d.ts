export type ProductType = {
    name: string
    slug: string
    description?: string
    sku: string
    category: string
    discountPrice?: number
    price: number
    currency: string
    quantity?: number
    image: string
    images: string[]
    colors: {
        name: string
        code: string
    }[]
    sizes?: string[]
    stars: number
    ratings: number
    inStock?: boolean
    shipsIn?: string
    relatedProducts: string[]
}

// export type RelatedProductType = Pick<ProductType, "name" | "slug" | "image" | "discountPrice" | "price" | "stars" | "ratings">