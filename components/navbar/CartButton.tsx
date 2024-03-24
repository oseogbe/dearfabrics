"use client";

import { LuShoppingCart } from "react-icons/lu";

const CartButton = () => {
    return (
        <div
            className="p-3 md:p-4 bg-[#F6F6F6] rounded-lg cursor-pointer"
            onClick={() => { }}
        >
            <LuShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-[#807D7E]" />
        </div>
    )
}

export default CartButton