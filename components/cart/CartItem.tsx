"use client"

import Image from "next/image"

import { FaPlus, FaMinus, FaX } from "react-icons/fa6"

interface CartItemProps {
    name: string
    price: number
    quantity: number
    image: string
}

const CartItem: React.FC<CartItemProps> = ({
    name,
    price,
    quantity,
    image
}) => {
    return (
        <div
            className="flex justify-between items-center h-20 md:h-[120px] border-b"
        >
            <div className="relative w-[120px] md:w-[160px] h-full">
                <Image
                    src={image}
                    fill
                    priority
                    sizes="(max-width: 160px) 160px, 160px"
                    className="object-cover"
                    alt={`Image of ${name}`}
                />
            </div>
            <div className="flex flex-col justify-between w-full h-full pl-4 md:pl-6 pb-4">
                <div className="flex items-start justify-between">
                    <h5 className="text-xs md:text-base">{name}</h5>
                    <button className="mt-[3px] md:mt-1.5 cursor-pointer"><FaX className="text-[10px] md:text-sm" /></button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <button><FaMinus className="text-[10px]" /></button>
                        <div className="font-light text-xs md:text-base">{quantity}</div>
                        <button><FaPlus className="text-[10px]" /></button>
                    </div>
                    <div className="font-light text-xs md:text-base">{price * quantity}</div>
                </div>
            </div>
        </div>
    )
}

export default CartItem