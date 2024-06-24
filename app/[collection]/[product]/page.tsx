import { notFound } from "next/navigation"

import Container from "@/components/Container"
import ProductClient from "./ProductClient"
import RelatedProducts from "@/components/product/RelatedProducts"

import { products } from "@/lib/products"
import { ProductType } from "@/typings"

interface ProductPageProps {
    params: {
        collection: string
        product: string
    }
}

const ProductPage = ({
    params
}: ProductPageProps) => {
    const selectedProduct = products.find(product => product.slug === params.product)

    if (!selectedProduct) {
        notFound()
    }

    const relatedProducts = selectedProduct.relatedProducts.map(relatedProduct => products.find(product => product.sku === relatedProduct))

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
                        products={relatedProducts as ProductType[]}
                    />
                </div>
            </div>
        </Container>
    )
}

export default ProductPage