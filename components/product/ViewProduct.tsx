"use client"

import { useRouter } from "next/navigation"

import { ProductType } from "@/typings"

import { FaRegEye } from "react-icons/fa6"

const ViewProduct = ({
    product
}: {
    product: ProductType
}) => {
    const router = useRouter()

    return (
        <button
            type="button"
            className="bg-white p-3 rounded-full shadow-md cursor-pointer"
            onClick={() => router.push(`/${product.category}/${product.slug}`)}
        >
            <FaRegEye size={21} className="text-black" />
        </button>
    )
}

export default ViewProduct