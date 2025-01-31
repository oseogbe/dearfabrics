"use client"

import { lazy } from "react"
import Image from "next/image"
import Link from "next/link"

import AddToFavorite from "./AddToFavorite"
import ProductStars from "./ProductStars"

import { urlFor } from "@/lib/sanity"
import { formatCurrency, getProductPrices, percentageDiscount } from "@/lib/utils"

import { ProductType } from "@/typings"

const QuickView = lazy(() => import("./QuickView"))

const ProductCard = ({
    containerStyles,
    product
}: {
    containerStyles: string,
    product: ProductType
}) => {
    const { minOldPrice, minPrice, maxPrice } = getProductPrices(product)

    return (
        <div className={`${containerStyles}`}>
            <div className="relative h-[200px] md:h-[280px] overflow-y-hidden w-full rounded group">
                {minOldPrice && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-df-yellow text-white text-xs rounded">
                        {percentageDiscount(minOldPrice, minPrice)}% off
                    </div>
                )}
                <Image
                    src={urlFor(product.images[0]).width(500).url()}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover h-full"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-[10px] transition-transform duration-300 transform-gpu translate-y-full group-hover:translate-y-0">
                        <AddToFavorite product={product} />
                        {/* <ViewProduct product={product} /> */}
                        <QuickView product={product} />
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <Link href={`/${product.categories[0]}/${product.slug}`} className="flex flex-col gap-2">
                    <h4 className="text-sm md:text-base text-gray-900 font-bold">
                        {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm md:text-base">
                        {product.variants.length == 1 ?
                            <div className="bg-df-gray p-2 rounded-lg font-bold text-gray-900">{formatCurrency(minPrice)}</div>
                            :
                            <div className="bg-df-gray p-2 rounded-lg font-bold text-gray-900">{formatCurrency(minPrice)} - {formatCurrency(maxPrice)}</div>
                        }
                        {product.variants.length == 1 && minOldPrice && <div className="line-through text-gray-900">{formatCurrency(minOldPrice)}</div>}
                    </div>
                </Link>
                <div className="mt-2">
                    <ProductStars
                        stars={product.stars}
                        ratings={product.ratings}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCard