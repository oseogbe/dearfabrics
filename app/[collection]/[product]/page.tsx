import { notFound } from "next/navigation"

import Container from "@/components/Container"
import ProductClient from "./ProductClient"
import RelatedProducts from "@/components/product/RelatedProducts"

import { fetchSingleProduct } from "@/lib/sanity"

import { ProductType } from "@/typings"

interface ProductPageProps {
    params: {
        collection: string
        product: string
    }
}

const ProductPage = async ({
    params
}: ProductPageProps) => {
    const selectedProduct = await fetchSingleProduct(params.product)

    if (!selectedProduct) {
        notFound()
    }

    return (
        <Container>
            <div className="pt-5 xl:pt-10">
                <div className="flex flex-col xl:flex-row xl:gap-8">
                    <ProductClient
                        product={selectedProduct}
                    />
                </div>
                <div className="mt-20">
                    <RelatedProducts
                        products={selectedProduct.relatedProducts as ProductType[]}
                    />
                </div>
            </div>
        </Container>
    )
}

export default ProductPage