"use client"

import Image from "next/image"

import { useShoppingCart } from "use-shopping-cart"

import { FaPlus, FaMinus, FaX } from "react-icons/fa6"
import { formatCurrency } from "@/lib/utils"
import { urlFor } from "@/lib/sanity"

const CartItem = ({
    sku
}: {
    sku: string
}) => {
    const { cartDetails, decrementItem, incrementItem, removeItem } = useShoppingCart()

    if (!cartDetails) return

    const cartItem = cartDetails[sku]

    return (
        <div
            className="flex justify-between items-center h-20 md:h-[120px] border-b"
        >
            <div className="relative w-[120px] md:w-[160px] h-full">
                <Image
                    src={urlFor(cartItem.image as string).width(200).url()}
                    fill
                    priority
                    sizes="(max-width: 160px) 160px, 160px"
                    className="object-cover"
                    alt={cartItem.name}
                />
            </div>
            <div className="flex flex-col justify-between w-full h-full pl-4 md:pl-6 pb-4">
                <div className="flex items-start justify-between">
                    <h5 className="text-xs md:text-base">{cartItem.name}</h5>
                    <button className="mt-[3px] md:mt-1.5 cursor-pointer" onClick={() => removeItem(cartItem.id)}>
                        <FaX className="text-[10px] md:text-sm" />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <button onClick={() => decrementItem(cartItem.id)}>
                            <FaMinus className="text-[10px]" />
                        </button>
                        <div className="font-light text-xs md:text-base">{cartItem.quantity}</div>
                        <button onClick={() => incrementItem(cartItem.id)}>
                            <FaPlus className="text-[10px]" />
                        </button>
                    </div>
                    <div className="font-light text-xs md:text-base">{formatCurrency(cartItem.value)}</div>
                </div>
            </div>
        </div>
    )
}

export default CartItem