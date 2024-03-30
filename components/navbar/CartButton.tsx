"use client"

import useCartSidebar from "@/hooks/useCartSidebar"

import { LuShoppingCart } from "react-icons/lu"

const CartButton = () => {
    const cartSidebar = useCartSidebar()

    return (
        <>
            <div
                className="relative p-3 md:p-4 bg-[#F6F6F6] rounded-lg cursor-pointer"
                onClick={cartSidebar.onOpen}
            >
                <LuShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-[#807D7E]" />
                <div className="bg-black w-4 h-4 md:w-5 md:h-5 absolute -right-1 -top-1 rounded-full text-white flex items-center justify-center text-xs md:text-sm font-medium">0</div>
            </div>
        </>
    )
}

export default CartButton