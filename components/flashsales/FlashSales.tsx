"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Countdown, { zeroPad } from "react-countdown"
// import dynamic from "next/dynamic"  // import dynamic for client-side loading
// import { zeroPad, type CountdownProps } from "react-countdown"

import ProductCard from "../product/ProductCard"
import ArrowLeft from "../ArrowLeft"
import ArrowRight from "../ArrowRight"

import { Sale } from "@/typings"

// dynamically import Countdown and disable SSR
// const Countdown = dynamic(() => import("react-countdown").then((mod) => mod.default as React.ComponentType<CountdownProps>))

interface FlashSalesProps {
    sale: Sale
}

const FlashSales: React.FC<FlashSalesProps> = ({
    sale
}) => {
    const [isClient, setIsClient] = useState(false)
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

    type rendererValues = {
        days: number
        hours: number
        minutes: number
        seconds: number
    }

    const renderer = ({ days, hours, minutes, seconds }: rendererValues) => {
        return (
            <>
                <div className="flex flex-col items-center">
                    <div className="text-[6px] md:text-[8px] xl:text-xs font-medium text-gray-900">Days</div>
                    <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold text-gray-900">{zeroPad(days)}</div>
                </div>
                <Image
                    src="/img/semicolon.svg"
                    alt=""
                    width="5"
                    height="5"
                    className="mt-4 h-3 md:mt-5 md:h-[14px] xl:mt-6 xl:h-5"
                />
                <div className="flex flex-col items-center">
                    <div className="text-[6px] md:text-[8px] xl:text-xs font-medium text-gray-900">Hours</div>
                    <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold text-gray-900">{zeroPad(hours)}</div>
                </div>
                <Image
                    src="/img/semicolon.svg"
                    alt=""
                    width="5"
                    height="5"
                    className="mt-4 h-3 md:mt-5 md:h-[14px] xl:mt-6 xl:h-5"
                />
                <div className="flex flex-col items-center">
                    <div className="text-[6px] md:text-[8px] xl:text-xs font-medium text-gray-900">Minutes</div>
                    <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold text-gray-900">{zeroPad(minutes)}</div>
                </div>
                <Image
                    src="/img/semicolon.svg"
                    alt=""
                    width="5"
                    height="5"
                    className="mt-4 h-3 md:mt-5 md:h-[14px] xl:mt-6 xl:h-5"
                />
                <div className="flex flex-col items-center">
                    <div className="text-[6px] md:text-[8px] xl:text-xs font-medium text-gray-900">Seconds</div>
                    <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold text-gray-900">{zeroPad(seconds)}</div>
                </div>
            </>
        )
    }

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    return (
        <div>
            <div className="grid grid-cols-6 grid-rows-2">
                <div className="row-start-1 col-start-1 row-end-1 row-span-full pl-3 border-l-4 border-df-yellow text-df-yellow font-bold text-sm md:text-base xl:text-xl self-center">
                    Today&apos;s
                </div>
                <div className="row-start-2 col-start-1 col-span-full mt-2 xl:mt-4 flex items-center justify-between md:justify-start gap-[44px] xl:gap-[88px]">
                    <h3 className="flex-shrink-0 font-bold text-xl md:text-2xl xl:text-4xl text-gray-900">{sale.name}</h3>
                    <div className="flex gap-2">
                        <Countdown
                            date={new Date(sale.endDate).getTime()}
                            renderer={renderer}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2 row-start-1 md:row-start-2 col-start-6">
                    <ArrowLeft onClick={() => handleScroll('left')} />
                    <ArrowRight onClick={() => handleScroll('right')} />
                </div>
            </div>
            <div ref={saleProductsRef} className="mt-10 flex overflow-x-scroll gap-6 scrollbar-hide">
                {
                    sale.products.map((product, i) => (
                        <ProductCard
                            key={i}
                            product={product}
                            containerStyles="w-[230px] md:w-[270px] flex-shrink-0"
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default FlashSales