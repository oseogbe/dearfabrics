"use client"

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import ProductFilter from "@/components/product/ProductFilter"
import FilterModal from "@/components/product/FilterModal"
import ProductCard from '@/components/product/ProductCard'
import Select from "@/components/Select"

import { IoClose } from "react-icons/io5"
import { ProductType } from '@/typings'
import { formatCurrency } from '@/lib/utils'

const ProductsClient = ({
    products,
    minPrice,
    maxPrice,
    total
}: {
    products: ProductType[],
    minPrice: number
    maxPrice: number
    total: number
}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [priceRange, setPriceRange] = useState([0, 0])
    const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get('categories')?.toString().split(',') ?? [])
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])

    useEffect(() => {
        setPriceRange([minPrice, maxPrice])
    }, [minPrice, maxPrice])

    // update query string when selectedCategories change
    useEffect(() => {
        const query = selectedCategories.length > 0 ? `?categories=${selectedCategories.join(',')}` : ''
        replace(`${pathname}${query}`)
    }, [pathname, replace, selectedCategories])

    const handlePriceChange = (values: number[]) => {
        setPriceRange(values)
    }

    // update query string when category checkboxes change
    const handleCategoryChange = (category: string, checked: boolean) => {
        let categories = [...selectedCategories]
        if (checked) {
            categories.push(category)
        } else {
            categories = categories.filter(cat => cat !== category)
        }
        setSelectedCategories(categories)
    }

    const handleColorChange = (color: string) => {
        let colors = [...selectedColors]
        if (selectedColors.includes(color)) {
            colors = colors.filter(c => c !== color)
        } else {
            colors.push(color)
        }
        setSelectedColors(colors)
    }

    const handleSizeChange = (size: string) => {
        let sizes = [...selectedSizes]
        if (selectedSizes.includes(size)) {
            sizes = sizes.filter(s => s !== size)
        } else {
            sizes.push(size)
        }
        setSelectedSizes(sizes)
    }

    const clearFilters = () => {
        setSelectedCategories([])
        setSelectedColors([])
        setSelectedSizes([])
        setPriceRange([minPrice, maxPrice])
    }

    return (
        <>
            <div className="hidden xl:block w-[280px] shrink-0">
                <div className="p-8 border shadow-md rounded-lg">
                    <h3 className='text-[#807D7E] text-2xl font-bold'>Filter Options</h3>
                    <hr className='my-8' />
                    <ProductFilter
                        priceRange={priceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        selectedCategories={selectedCategories}
                        selectedColors={selectedColors}
                        selectedSizes={selectedSizes}
                        onPriceChange={handlePriceChange}
                        onCategoryChange={handleCategoryChange}
                        onColorChange={handleColorChange}
                        onSizeChange={handleSizeChange}
                    />
                </div>
            </div>
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <div className="text-xs md:text-base">
                        Showing 1-20 of {total} results
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            <div className="hidden md:block md:text-base mr-2 md:mr-4">Sort by:</div>
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
                        <div className="xl:hidden"><FilterModal /></div>
                    </div>
                </div>
                {
                    (
                        selectedCategories.length > 0 ||
                        minPrice !== priceRange[0] || maxPrice !== priceRange[1] ||
                        selectedColors.length > 0 ||
                        selectedSizes.length > 0
                    ) && (
                        <div className="flex items-center gap-4 text-xs md:text-base mt-4 overflow-x-scroll scrollbar-hide">
                            <span className='shrink-0'>Active Filter</span>
                            {
                                selectedCategories.map(category => (
                                    <div
                                        key={category}
                                        className="shrink-0 flex items-center px-2.5 py-1.5 bg-df-gray"
                                    >
                                        {category}
                                        <IoClose
                                            className="pl-3 text-3xl cursor-pointer"
                                            onClick={() => handleCategoryChange(category, false)}
                                        />
                                    </div>
                                ))
                            }
                            {
                                (minPrice !== priceRange[0] || maxPrice !== priceRange[1]) && (
                                    <div
                                        className="shrink-0 flex items-center px-2.5 py-1.5 bg-df-gray"
                                    >
                                        {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                                        <IoClose
                                            className="pl-3 text-3xl cursor-pointer"
                                            onClick={() => setPriceRange([minPrice, maxPrice])}
                                        />
                                    </div>
                                )
                            }
                            {
                                selectedColors.map(color => (
                                    <div
                                        key={color}
                                        className="shrink-0 flex items-center px-2.5 py-1.5 bg-df-gray"
                                    >
                                        {color}
                                        <IoClose
                                            className="pl-3 text-3xl cursor-pointer"
                                            onClick={() => handleColorChange(color)}
                                        />
                                    </div>
                                ))
                            }
                            {
                                selectedSizes.map(size => (
                                    <div
                                        key={size}
                                        className="shrink-0 flex items-center px-2.5 py-1.5 bg-df-gray"
                                    >
                                        {size}
                                        <IoClose
                                            className="pl-3 text-3xl cursor-pointer"
                                            onClick={() => handleSizeChange(size)}
                                        />
                                    </div>
                                ))
                            }
                            <div className="shrink-0 underline cursor-pointer" onClick={clearFilters}>Clear All</div>
                        </div>
                    )
                }
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8 mt-8">
                    {
                        products.map(product => (
                            <ProductCard
                                key={product.name}
                                product={product}
                                containerStyles=''
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProductsClient