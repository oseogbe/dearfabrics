"use client"

import { LuShoppingCart } from "react-icons/lu"

interface AddToCartProps {

}

const AddToCart: React.FC<AddToCartProps> = ({

}) => {
    return (
        <div className="bg-white p-4 rounded-full shadow-md cursor-pointer"><LuShoppingCart className="text-df-yellow" /></div>
    )
}

export default AddToCart