"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import Container from "@/components/Container"
import ProductsClient from "./ProductsClient"

import { fetchProductsByCategory } from "@/lib/sanity"
import Pagination from "@/components/Pagination"
import { ProductType } from "@/typings"

// interface CollectionsProps {
//     params: {
//         type: string
//     },
//     searchParams?: {
//         type?: string
//         minPrice?: number
//         maxPrice?: number
//         page?: string
//     }
// }

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

const CollectionPage = () => {
    const { type } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [products, setProducts] = useState<ProductType[]>([])
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const { products, total } = await fetchProductsByCategory(type.toString(), currentPage, pageSize)
            setProducts(products)
            setTotal(total)
        }
        fetchData()
    }, [currentPage, type, pageSize])

    useEffect(() => {
        const productPrices = products.flatMap(product => product.price)
        setMinPrice(formatPrice(Math.min(...productPrices), "down"))
        setMaxPrice(formatPrice(Math.max(...productPrices), "up"))
    }, [maxPrice, minPrice, products])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <Container>
            <div className="pt-5 flex xl:gap-8 xl:pt-10">
                <ProductsClient
                    products={products}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    total={total}
                />
            </div>
            <div className="mt-16 flex justify-center">
                <Pagination
                    pageSize={pageSize}
                    total={total}
                    onPageChange={handlePageChange}
                />
            </div>
        </Container>
    )
}

export default CollectionPage