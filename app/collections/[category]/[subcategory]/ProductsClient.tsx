"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import ProductFilter from "@/components/product/ProductFilter"
import ProductCard from "@/components/product/ProductCard"
import Pagination from "@/components/Pagination"
import Select from "@/components/Select"

import { fetchProductsByCategory } from "@/lib/sanity"

import { ProductType } from "@/typings"

const ProductsClient = ({
    initialProducts,
    initialTotal,
    initialPageSize,
    initialPage,
    minPrice,
    maxPrice,
    category,
    subcategory,
}: {
    initialProducts: ProductType[]
    initialTotal: number
    initialPageSize: number
    initialPage: number
    minPrice: number
    maxPrice: number
    category: string
    subcategory: string
}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [products, setProducts] = useState(initialProducts)
    const [total, setTotal] = useState(initialTotal)
    const [pageSize, setPageSize] = useState(initialPageSize)
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const { products, total } = await fetchProductsByCategory(category, subcategory, currentPage, pageSize, priceRange[0], priceRange[1])
            setProducts(products)
            setTotal(total)
        }

        fetchData()
    }, [searchParams, category, subcategory, currentPage, pageSize, priceRange])

    const handlePriceChange = (values: number[]) => {
        setPriceRange(values)
        setCurrentPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('minPrice', values[0].toString())
        params.set('maxPrice', values[1].toString())
        params.set('page', '1')
        replace(`/collections/${category}/${subcategory}?${params.toString()}`)
    }

    const handleColorChange = (color: string) => {
        let colors = [...selectedColors]
        if (selectedColors.includes(color)) {
            colors = colors.filter((c) => c !== color)
        } else {
            colors.push(color)
        }
        setSelectedColors(colors)
    }

    const handleSizeChange = (size: string) => {
        let sizes = [...selectedSizes]
        if (selectedSizes.includes(size)) {
            sizes = sizes.filter((s) => s !== size)
        } else {
            sizes.push(size)
        }
        setSelectedSizes(sizes)
    }

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        setCurrentPage(page)
        replace(`/collections/${category}/${subcategory}?${params.toString()}`)
    }

    const clearFilters = () => {
        setSelectedColors([])
        setSelectedSizes([])
        setPriceRange([minPrice, maxPrice])
    }

    return (
        <>
            {/* Sidebar and filter options */}
            <div className="hidden xl:block w-[280px] shrink-0">
                <div className="p-8 border shadow-md rounded-lg">
                    <ProductFilter
                        priceRange={priceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        selectedColors={selectedColors}
                        selectedSizes={selectedSizes}
                        onPriceChange={handlePriceChange}
                        onColorChange={handleColorChange}
                        onSizeChange={handleSizeChange}
                    />
                </div>
            </div>

            {/* Product listing */}
            <div className="w-full">
                <h3 className="text-2xl md:text-3xl text-gray-900 font-bold capitalize my-4 md:my-6 xl:my-8">{subcategory.replace(/-/g, ' ')}</h3>
                <div className="flex items-center justify-between">
                    <div className="text-sm md:text-base text-gray-900">
                        Showing {pageSize * (currentPage - 1) + 1} -{" "}
                        {Math.min(pageSize * currentPage, total)} of {total} results
                    </div>
                    <div className="flex items-center gap-2">
                        <Select
                            options={[
                                "Default sorting",
                                "Sort by popularity",
                                "Sort by average rating",
                                "Sort by newness",
                                "Sort by price: low to high",
                                "Sort by price: high to low",
                            ]}
                        />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8 mt-8">
                    {products.map((product) => (
                        <ProductCard key={product.slug} product={product} containerStyles="" />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-16 flex justify-center">
                    <Pagination
                        pageSize={pageSize}
                        total={total}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}

export default ProductsClient
