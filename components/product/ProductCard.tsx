"use client"

import Image from "next/image"

import AddToCart from "./AddToCart"
import ProductStars from "./ProductStars"
import ViewProduct from "./ViewProduct"

interface ProductCardProps {
    name: string
    discountPrice?: number | null
    price: number
    image: string
    stars: number
    ratings: number
}

const ProductCard: React.FC<ProductCardProps> = ({
    name,
    discountPrice,
    price,
    image,
    stars,
    ratings
}) => {
    return (
        <div className="group w-full">
            <div className="relative h-[250px] md:h-[270px] xl:h-[320px] w-full rounded">
                <div className="absolute top-3 left-3 px-3 py-1 bg-df-yellow text-white text-xs rounded">-40%</div>
                <Image
                    src={image}
                    alt={`${image}'s picture`}
                    fill
                    className="object-cover -z-10"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-[10px] transition-transform duration-300 transform-gpu translate-y-full group-hover:translate-y-0">
                        <AddToCart />
                        <ViewProduct />
                    </div>
                </div>
            </div>
            <div className="py-4 flex flex-col gap-2">
                <h4 className="text-sm md:text-base font-bold">{name}</h4>
                <div className="flex items-center gap-2 text-sm md:text-base">
                    <div className="bg-df-gray p-2 rounded-lg font-bold">₦{discountPrice || price}</div>
                    {discountPrice && <div className="line-through">₦{price}</div>}
                </div>
                <ProductStars
                    stars={stars}
                    ratings={ratings}
                />
            </div>
        </div>
    )
}

export default ProductCard