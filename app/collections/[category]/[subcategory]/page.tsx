import { fetchProductsByCategory } from "@/lib/sanity"
import Container from "@/components/Container"
import ProductsClient from "./ProductsClient"
import { ProductType, ProductVariant } from "@/typings"

const formatPrice = (num: number, upOrDown: 'up' | 'down') => {
    const magnitude = Math.floor(Math.log10(num))
    const base = Math.pow(10, magnitude)
    let roundedNum
    if (upOrDown == 'up') {
        roundedNum = Math.ceil(num / base) * base
    } else {
        roundedNum = Math.floor(num / base) * base
    }
    return roundedNum
}

const CollectionPage = async ({ params }: { params: { category: string; subcategory: string } }) => {
    const { category, subcategory } = params
    const pageSize = 20
    const currentPage = 1

    const { products, total } = await fetchProductsByCategory(category, subcategory, currentPage, pageSize)

    const productPrices = products.flatMap((p: ProductType) => p.variants).map((v: ProductVariant) => v.price)
    const minPrice = productPrices.length > 0 ? formatPrice(Math.min(...productPrices), "down") : 0
    const maxPrice = productPrices.length > 0 ? formatPrice(Math.max(...productPrices), "up") : 0

    return (
        <Container>
            <div className="pt-5 flex lg:gap-8 lg:pt-10">
                <ProductsClient
                    initialProducts={products}
                    initialTotal={total}
                    initialPageSize={pageSize}
                    initialPage={currentPage}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    category={category}
                    subcategory={subcategory}
                />
            </div>
        </Container>
    )
}

export default CollectionPage