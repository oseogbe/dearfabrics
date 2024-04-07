"use client"

import { FaStarHalfAlt } from "react-icons/fa"
import { FaRegStar, FaStar } from "react-icons/fa6"

interface ProductStarsProps {
    rating?: number
}

const ProductStars: React.FC<ProductStarsProps> = ({
    rating
}) => {
    return (
        <div className="flex items-center gap-1 md:gap-3">
            <FaStar size={12} className="fill-df-yellow" />
            <FaStar size={12} className="fill-df-yellow" />
            <FaStar size={12} className="fill-df-yellow" />
            <FaStarHalfAlt size={12} className="fill-df-yellow" />
            <FaRegStar size={12} className="fill-df-yellow" />
            <div className="text-sm">(88)</div>
        </div>
    )
}

export default ProductStars