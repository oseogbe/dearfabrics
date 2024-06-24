"use client"

import Image from "next/image"

import AddToCart from "./AddToCart"
import ViewProduct from "./ViewProduct"
import ProductStars from "./ProductStars"

import { ProductType } from "@/typings"
import { percentageDiscount } from "@/lib/utils"

const ProductCard = ({
    product
}: {
    product: ProductType
}) => {
    return (
        <div className="group w-full">
            <div className="relative h-[250px] md:h-[270px] xl:h-[320px] w-full rounded">
                {product.discountPrice && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-df-yellow text-white text-xs rounded">
                        -{percentageDiscount(product.price, product.discountPrice)}%
                    </div>
                )}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover -z-10 p-8"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-[10px] transition-transform duration-300 transform-gpu translate-y-full group-hover:translate-y-0">
                        <AddToCart product={product} />
                        <ViewProduct product={product} />
                    </div>
                </div>
            </div>
            <div className="py-4 flex flex-col gap-2">
                <h4 className="text-sm md:text-base font-bold">{product.name}</h4>
                <div className="flex items-center gap-2 text-sm md:text-base">
                    <div className="bg-df-gray p-2 rounded-lg font-bold">₦{product.discountPrice || product.price}</div>
                    {product.discountPrice && <div className="line-through">₦{product.price}</div>}
                </div>
                <ProductStars
                    stars={product.stars}
                    ratings={product.ratings}
                />
            </div>
        </div>
    )
}

export default ProductCard