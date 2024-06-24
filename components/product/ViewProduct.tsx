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
        <div
            className="bg-white p-4 rounded-full shadow-md cursor-pointer"
            onClick={() => router.push(`/${product.category}/${product.slug}`)}
        >
            <FaRegEye className="text-df-yellow hover:text-black transition-all duration-300" />
        </div>
    )
}

export default ViewProduct