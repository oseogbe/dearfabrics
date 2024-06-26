"use client"

import useCartSidebar from "@/hooks/useCartSidebar"

import { LuShoppingCart } from "react-icons/lu"
import { useShoppingCart } from "use-shopping-cart"

const CartButton = () => {
    const cartSidebar = useCartSidebar()

    const { cartCount } = useShoppingCart()

    let total
    if (cartCount) {
        total = cartCount <= 9 ? cartCount : '9+'
    } else {
        total = 0
    }

    return (
        <>
            <div
                className="relative p-3 xl:p-4 bg-[#F6F6F6] rounded-lg cursor-pointer"
                onClick={cartSidebar.onOpen}
            >
                <LuShoppingCart className="w-4 h-4 xl:w-5 xl:h-5 text-[#807D7E]" />
                <div className="bg-black w-5 xl:w-6 aspect-square absolute -right-2 -top-2 rounded-full text-white flex items-center justify-center text-xs md:text-sm font-medium">
                    {total}
                </div>
            </div>
        </>
    )
}

export default CartButton