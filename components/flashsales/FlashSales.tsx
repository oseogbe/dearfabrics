"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import Countdown, { zeroPad } from 'react-countdown'

import ProductCard from "../product/ProductCard"
import ArrowLeft from "../ArrowLeft"
import ArrowRight from "../ArrowRight"

import { fetchSaleData } from "@/lib/sanity"
import { ProductType } from "@/typings"

interface FlashSalesProps {

}

const FlashSales: React.FC<FlashSalesProps> = ({

}) => {
    const [hasMounted, setHasMounted] = useState(false)

    const saleProductsRef = useRef<HTMLDivElement>(null)

    type SaleType = {
        name: string
        startDate: string
        endDate: string
        products: ProductType[]
    }

    const [saleData, setSaleData] = useState<SaleType | null>(null)

    useEffect(() => {
        setHasMounted(true)
        const fetchData = async () => {
            // TODO: make dynamic by fetching all sales created and recreating component for each one
            setSaleData(await fetchSaleData('Flash Sales'))
        }
        fetchData()
    }, [saleData])

    if (!hasMounted || !saleData || new Date(saleData.startDate) > new Date() || new Date(saleData.endDate) < new Date()) {
        return null
    }

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
                    <div className="text-[6px] md:text-[8px] xl:text-xs font-medium">Days</div>
                    <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold">{zeroPad(days)}</div>
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
                    <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold">{zeroPad(hours)}</div>
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
                    <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold">{zeroPad(minutes)}</div>
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
                    <div className="text-[18px] md:text-[22px] xl:text-3xl font-bold">{zeroPad(seconds)}</div>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-6 grid-rows-2">
                <div className="row-start-1 col-start-1 row-end-1 row-span-full pl-3 border-l-4 border-df-yellow text-df-yellow font-bold text-sm md:text-base xl:text-xl self-center">
                    Today&apos;s
                </div>
                <div className="row-start-2 col-start-1 col-span-full mt-2 xl:mt-4 flex items-center justify-between md:justify-start gap-[44px] xl:gap-[88px]">
                    <h3 className="flex-shrink-0 font-bold text-xl md:text-2xl xl:text-4xl">{saleData.name}</h3>
                    <div className="flex gap-2">
                        <Countdown
                            date={new Date(saleData.endDate).getTime()}
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
                    saleData.products.map((product, i) => (
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