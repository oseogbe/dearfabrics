"use client"

import { useRef } from "react"
import Image from "next/image"

import ProductCard from "./product/ProductCard"
import ArrowLeft from "./ArrowLeft"
import ArrowRight from "./ArrowRight"

interface FlashSalesProps {

}

const FlashSales: React.FC<FlashSalesProps> = ({

}) => {
    const saleProductsRef = useRef<HTMLDivElement>(null)

    const products = [
        {
            name: "Damask Fabric 1",
            discountPrice: 20000,
            price: 25000,
            image: '/img/products/fabric-7.png'
        },
        {
            name: "Gold Necklace",
            discountPrice: 55000,
            price: 65000,
            image: '/img/products/gold-necklace.png'
        },
        {
            name: "Damask Fabric 2",
            discountPrice: 18000,
            price: 21000,
            image: '/img/products/fabric-7.png'
        },
        {
            name: "Damask Fabric 3",
            discountPrice: 23000,
            price: 27000,
            image: '/img/products/fabric-7.png'
        },
        {
            name: "Damask Fabric 4",
            discountPrice: null,
            price: 20000,
            image: '/img/products/fabric-7.png'
        },
        {
            name: "Damask Fabric 5",
            discountPrice: 28000,
            price: 33000,
            image: '/img/products/fabric-7.png'
        },
        {
            name: "Damask Fabric 6",
            discountPrice: 24000,
            price: 28000,
            image: '/img/products/fabric-7.png'
        },
        {
            name: "Damask Fabric 7",
            discountPrice: null,
            price: 25000,
            image: '/img/products/fabric-7.png'
        },
        {
            name: "Damask Fabric 8",
            discountPrice: 30000,
            price: 35000,
            image: '/img/products/fabric-7.png'
        },
        {
            name: "Damask Fabric 9",
            discountPrice: 25000,
            price: 29000,
            image: '/img/products/fabric-7.png'
        },
    ]

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
        <>
            <div className="grid grid-cols-6 grid-rows-2">
                <div className="row-start-1 col-start-1 row-end-1 row-span-full pl-3 border-l-4 border-df-yellow text-df-yellow font-bold text-sm md:text-base xl:text-xl self-center">
                    Today&apos;s
                </div>
                <div className="row-start-2 col-start-1 col-span-full mt-2 xl:mt-4 flex items-center justify-between md:justify-start gap-[44px] xl:gap-[88px]">
                    <div className="flex-shrink-0 font-extrabold text-xl md:text-2xl xl:text-4xl">Flash Sales</div>
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
                            key={product.name}
                            name={product.name}
                            discountPrice={product.discountPrice}
                            price={product.price}
                            image={product.image}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default FlashSales