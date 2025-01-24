"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Container from "@/components/Container"
import ProductCard from "@/components/product/ProductCard"
import Pagination from "@/components/Pagination"

import { searchProducts } from "@/lib/sanity"

import { ProductType } from "@/typings"

import { FaMagnifyingGlass } from 'react-icons/fa6'
import Image from 'next/image'

const SearchResultsPage = () => {
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const [data, setData] = useState<{ total: number, products: ProductType[] }>({ total: 0, products: [] })
    const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10))

    useEffect(() => {
        const fetchData = async () => {
            const result = await searchProducts(String(searchParams.get('query')), page)
            setData(result)
        }

        fetchData()
    }, [searchParams, page])

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', newPage.toString())
        setPage(newPage)
        replace(`/search-results?${params.toString()}`)
    }

    if (!searchParams.has('query')) {
        return (
            <Container>
                <section className="relative w-full pt-16 h-[75dvh] animate-fadeIn">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image
                            src="/img/dfng-logo.png"
                            width={120}
                            height={120}
                            alt="dearfabrics"
                            className='lg:hidden place-self-center'
                        />
                        <Image
                            src="/img/dfng-logo.png"
                            width={200}
                            height={200}
                            alt="dearfabrics"
                            className='hidden lg:block place-self-center'
                        />
                        <div className="flex items-center justify-center h-[150px] space-x-2 animate-bounce">
                            <div className="w-full text-gray-900 text-sm lg:text-3xl font-medium">What are you looking for?</div>
                            <FaMagnifyingGlass className="text-gray-900 lg:text-3xl animate-spin" />
                        </div>
                    </div>

                </section>
                <div className='w-full absolute bottom-0 left-1/2 -translate-x-1/2'>
                    <Image
                        src="/img/assets/fabrics-montage.png"
                        width={500}
                        height={500}
                        alt="lace and ankara fabrics"
                        className='lg:hidden'
                    />
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <section className="w-full pt-16">
                <div className="text-gray-900 text-[18px] md:text-[22px] lg:text-3xl font-bold">Search Results</div>
                <div className="text-gray-900 text-sm lg:text-base font-light mt-4">{data.total} result{data.total > 1 && 's'} for &apos;{searchParams.get('query')}&apos;</div>
                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8 mt-8">
                    {data.products.map((product: ProductType) => (
                        <ProductCard key={product.slug} product={product} containerStyles="" />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-16 flex justify-center">
                    <Pagination
                        pageSize={12}
                        total={data.total}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
        </Container>
    )
}

export default SearchResultsPage