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

// export type RelatedProductType = Pick<ProductType, "name" | "slug" | "image" | "oldPrice" | "price" | "stars" | "ratings">