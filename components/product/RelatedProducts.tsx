"use client"

import ProductCard from "./ProductCard"
import ArrowLeft from "../ArrowLeft"
import ArrowRight from "../ArrowRight"
import { useRef } from "react"

interface RelatedProductsProps {
    products: {
        name: string
        slug: string
        image: string
        discountPrice: number
        price: number
        stars: number
        ratings: number
    }[]
}

const RelatedProducts = ({
    products
}: RelatedProductsProps) => {
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
                    <h3 className="font-bold text-lg md:text-xl xl:text-2xl">Related Products</h3>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <ArrowLeft onClick={() => handleScroll('left')} />
                    <ArrowRight onClick={() => handleScroll('right')} />
                </div>
            </div>
            <div className="mt-6 md:mt-8 xl:mt-10">
                <div ref={saleProductsRef} className="mt-10 flex overflow-x-scroll gap-6 scrollbar-hide">
                    {
                        products.map(product => (
                            <div
                                key={product.name}
                                className="w-[230px] md:w-[250px] flex-shrink-0"
                            >
                                <ProductCard
                                    name={product.name}
                                    discountPrice={product.discountPrice}
                                    price={product.price}
                                    image={product.image}
                                    stars={product.stars}
                                    ratings={product.ratings}
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