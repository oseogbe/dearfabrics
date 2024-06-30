"use client"

import { useRef } from "react"
import Image from "next/image"

import ProductCard from "../product/ProductCard"
import ArrowLeft from "../ArrowLeft"
import ArrowRight from "../ArrowRight"

import { products } from "@/lib/products"

interface FlashSalesProps {

}

const FlashSales: React.FC<FlashSalesProps> = ({

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
            <div className="grid grid-cols-6 grid-rows-2">
                <div className="row-start-1 col-start-1 row-end-1 row-span-full pl-3 border-l-4 border-df-yellow text-df-yellow font-bold text-sm md:text-base xl:text-xl self-center">
                    Today&apos;s
                </div>
                <div className="row-start-2 col-start-1 col-span-full mt-2 xl:mt-4 flex items-center justify-between md:justify-start gap-[44px] xl:gap-[88px]">
                    <h3 className="flex-shrink-0 font-bold text-xl md:text-2xl xl:text-4xl">Flash Sales</h3>
                    <div className="flex gap-2">
                        <div className="flex flex-col items-center">
                            <div className="text-[6px] md:text-[8px] xl:text-xs font-medium">Days</div>
                            <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold">03</div>
                        </div>
                        <Image
                            src="/img/semicolon.svg"
                            alt=""
                            width="5"
                            height="5"
                            className="mt-4 h-3 md:mt-5 md:h-[14px] xl:mt-6 xl:h-5"
                        />
                        <div className="flex flex-col items-center">
                            <div className="text-[6px] md:text-[8px] xl:text-xs font-medium">Hours</div>
                            <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold">23</div>
                        </div>
                        <Image
                            src="/img/semicolon.svg"
                            alt=""
                            width="5"
                            height="5"
                            className="mt-4 h-3 md:mt-5 md:h-[14px] xl:mt-6 xl:h-5"
                        />
                        <div className="flex flex-col items-center">
                            <div className="text-[6px] md:text-[8px] xl:text-xs font-medium">Minutes</div>
                            <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold">19</div>
                        </div>
                        <Image
                            src="/img/semicolon.svg"
                            alt=""
                            width="5"
                            height="5"
                            className="mt-4 h-3 md:mt-5 md:h-[14px] xl:mt-6 xl:h-5"
                        />
                        <div className="flex flex-col items-center">
                            <div className="text-[6px] md:text-[8px] xl:text-xs font-medium">Seconds</div>
                            <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold">56</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2 row-start-1 md:row-start-2 col-start-6">
                    <ArrowLeft onClick={() => handleScroll('left')} />
                    <ArrowRight onClick={() => handleScroll('right')} />
                </div>
            </div>
            <div ref={saleProductsRef} className="mt-10 flex overflow-x-scroll gap-6 scrollbar-hide">
                {
                    products.map(product => (
                        <ProductCard
                            key={product.sku}
                            product={product}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default FlashSales