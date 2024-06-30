"use client"

import { ProductType } from "@/typings"

import { FaRegHeart } from "react-icons/fa"
import { toast } from "sonner"

const AddToFavorite = ({
    product
}: {
    product: ProductType
}) => {
    const handleClick = () => {
        // add or remove from favourites and change color between pink and black
        toast("Added to favourites", { duration: 1000 })
    }

    return (
        <button
            type="button"
            className="bg-white p-3 rounded-full shadow-md cursor-pointer"
            onClick={handleClick}
        >
            <FaRegHeart size={24} className="text-black" />
        </button>
    )
}

export default AddToFavorite