"use client"

import { useShoppingCart } from "use-shopping-cart"

import { toast } from "sonner"

import { ProductType } from "@/typings"

import { LuShoppingCart } from "react-icons/lu"

interface AddToCartProps {
    product: ProductType
}

const AddToCart: React.FC<AddToCartProps> = ({
    product
}) => {
    const shoppingCart = useShoppingCart()

    const handleAddItem = () => {
        // TODO: this can't work cuz I'm not specifying the product color or size
        shoppingCart.addItem(product)
        toast("Added to cart", { duration: 1500 })
    }

    return (
        <div
            className="bg-white p-4 rounded-full shadow-md cursor-pointer"
            onClick={handleAddItem}
        >
            <LuShoppingCart className="text-df-yellow hover:text-black transition-all duration-300" />
        </div>
    )
}

export default AddToCart