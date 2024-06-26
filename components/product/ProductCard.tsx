"use client"

import Image from "next/image"
import Link from "next/link"

import ProductStars from "./ProductStars"
// import ViewProduct from "./ViewProduct"

import { percentageDiscount } from "@/lib/utils"
import { ProductType } from "@/typings"
import QuickView from "./QuickView"
import AddToFavorite from "./AddToFavorite"

const ProductCard = ({
    product
}: {
    product: ProductType
}) => {
    return (
        <div className="max-w-[230px] md:max-w-[250px] flex-shrink-0">
            <div className="relative h-[200px] md:h-[280px] overflow-y-clip w-full rounded group">
                {product.discountPrice && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-df-yellow text-white text-xs rounded">
                        {percentageDiscount(product.price, product.discountPrice)}% off
                    </div>
                )}
                <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover"
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
                <Link href={`/${product.category}/${product.slug}`} className="flex flex-col gap-2">
                    <h4 className="text-sm md:text-base font-bold">
                        {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm md:text-base">
                        <div className="bg-df-gray p-2 rounded-lg font-bold">N{product.discountPrice || product.price}</div>
                        {product.discountPrice && <div className="line-through">N{product.price}</div>}
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