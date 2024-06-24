import Container from "@/components/Container"
import ProductsClient from "./ProductsClient"

import { products } from "@/lib/products"

interface CollectionsProps {
    params: {
        type: string
    },
    searchParams?: {
        type?: string
        minPrice?: number
        maxPrice?: number
        page?: string
    }
}

const CollectionPage = ({
    params,
    searchParams
}: CollectionsProps) => {


    return (
        <Container>
            <div className="pt-5 flex xl:gap-8 xl:pt-10">
                <ProductsClient products={products} />
            </div>
        </Container>
    )
}

export default CollectionPage