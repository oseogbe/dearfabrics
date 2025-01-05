"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import ProductFilter from "@/components/product/ProductFilter"
import FilterModal from "@/components/product/FilterModal"
import ProductCard from "@/components/product/ProductCard"
import Pagination from "@/components/Pagination"
import Select from "@/components/Select"

import { formatCurrency } from "@/lib/utils"
import { ProductType } from "@/typings"
import { IoClose } from "react-icons/io5"
import { fetchProductsByCategory } from "@/lib/sanity"

const ProductsClient = ({
    initialProducts,
    initialTotal,
    initialPageSize,
    initialPage,
    minPrice,
    maxPrice,
    category,
    subcategory,
    relatedCategories
}: {
    initialProducts: ProductType[]
    initialTotal: number
    initialPageSize: number
    initialPage: number
    minPrice: number
    maxPrice: number
    category: string
    subcategory: string
    relatedCategories: {
        _id: string
        name: string
        slug: {
            current: string
        }
    }[]
}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [products, setProducts] = useState(initialProducts)
    const [total, setTotal] = useState(initialTotal)
    const [pageSize, setPageSize] = useState(initialPageSize)
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        searchParams.get("categories")?.toString().split(",") ?? []
    )
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])

    useEffect(() => {
        setPriceRange([minPrice, maxPrice])
    }, [minPrice, maxPrice])

    useEffect(() => {
        const query = selectedCategories.length > 0 ? `?categories=${selectedCategories.join(',')}` : ''
        replace(`${pathname}${query}`)
    }, [pathname, replace, selectedCategories])


    // Fetch products dynamically when filters or pagination changes
    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                pageSize: pageSize.toString(),
                categories: selectedCategories.join(","),
                minPrice: priceRange[0].toString(),
                maxPrice: priceRange[1].toString(),
            })

            const { products, total } = await fetchProductsByCategory(category, subcategory, currentPage, pageSize)

            console.log('products', products)

            setProducts(products)
            setTotal(total)
        }

        fetchData()
    }, [currentPage, pageSize, selectedCategories, priceRange, category, subcategory])

    const handlePriceChange = (values: number[]) => {
        setPriceRange(values)
    }

    const handleCategoryChange = (category: string, checked: boolean) => {
        let categories = [...selectedCategories]
        if (checked) {
            categories.push(category)
        } else {
            categories = categories.filter((cat) => cat !== category)
        }
        setSelectedCategories(categories)
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
        setCurrentPage(page)
    }

    const clearFilters = () => {
        setSelectedCategories([])
        setSelectedColors([])
        setSelectedSizes([])
        setPriceRange([minPrice, maxPrice])
    }

    return (
        <>
            {/* Sidebar and filter options */}
            <div className="hidden xl:block w-[280px] shrink-0">
                <div className="p-8 border shadow-md rounded-lg">
                    <h3 className="text-[#807D7E] text-2xl font-bold">Filter Options</h3>
                    <hr className="my-8" />
                    <ProductFilter
                        priceRange={priceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        selectedCategories={selectedCategories}
                        relatedCategories={relatedCategories}
                        selectedColors={selectedColors}
                        selectedSizes={selectedSizes}
                        onPriceChange={handlePriceChange}
                        onCategoryChange={handleCategoryChange}
                        onColorChange={handleColorChange}
                        onSizeChange={handleSizeChange}
                    />
                </div>
            </div>

            {/* Product listing */}
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <div className="text-xs md:text-base text-gray-900">
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

                {/* Active filters */}
                {/** Filter chips logic remains unchanged **/}

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
