"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import Container from "@/components/Container"
import ProductsClient from "./ProductsClient"

import { fetchProductsByCategory } from "@/lib/sanity"
import Pagination from "@/components/Pagination"

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

const CollectionPage = () => {
    const { type } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const { products, total } = await fetchProductsByCategory(type.toString(), currentPage, pageSize)
            setProducts(products)
            setTotal(total)
        }
        fetchData()
    }, [currentPage, type, pageSize])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <Container>
            <div className="pt-5 flex xl:gap-8 xl:pt-10">
                <ProductsClient
                    products={products}
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