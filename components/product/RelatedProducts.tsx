"use client"

import { useRef } from "react"

import { ProductType } from "@/typings"

import ProductCard from "./ProductCard"
import ArrowLeft from "../ArrowLeft"
import ArrowRight from "../ArrowRight"

const RelatedProducts = ({
    products
}: {
    products: ProductType[]
}) => {
    const saleProductsRef = useRef<HTMLDivElement>(null)

    const handleScroll = (direction: 'left' | 'right') => {
        const container = saleProductsRef.current
        const scrollAmount = 250

        if (container) {
            const { scrollLeft } = container
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount
            container.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="pl-5 border-l-4 border-df-yellow">
                    <h3 className="font-bold text-lg md:text-xl xl:text-2xl text-gray-900">Related Products</h3>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <ArrowLeft onClick={() => handleScroll('left')} />
                    <ArrowRight onClick={() => handleScroll('right')} />
                </div>
            </div>
            <div className="mt-6 md:mt-8 xl:mt-10">
                <div ref={saleProductsRef} className="mt-10 flex overflow-x-scroll gap-6 scrollbar-hide">
                    {
                        products?.map(product => (
                            <div
                                key={product.slug}
                                className="w-[230px] md:w-[250px] flex-shrink-0"
                            >
                                <ProductCard
                                    product={product}
                                    containerStyles=""
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RelatedProducts