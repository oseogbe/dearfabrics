"use client"

import Image from "next/image"
import Link from "next/link"

import { FaArrowRightLong } from "react-icons/fa6"

interface CategoriesProps {
    name: string
    categories: {
        title: string
        link: string
        image: string
    }[]
}

const FeaturedCategories: React.FC<CategoriesProps> = ({
    name,
    categories
}) => {
    return (
        <div>
            <div className="pl-5 border-l-4 border-df-yellow">
                <h3 className="font-bold text-xl md:text-2xl xl:text-4xl">{name}</h3>
            </div>
            <div className="flex gap-6 md:gap-8 xl:gap-[50px] mt-6 md:mt-8 xl:mt-[62px] overflow-x-scroll scrollbar-hide">
                {categories.map(category => (
                    <div className="flex-1 min-w-[270px]" key={category.title}>
                        <div className="relative h-[320px] xl:h-[400px] bg-gray-200 rounded-[10px] overflow-hidden">
                            <Image
                                src={category.image}
                                alt="dearfabrics category images"
                                fill
                                className="absolute object-cover"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                <h5 className="text-base xl:text-lg text-[#2A2F2F] font-extrabold">{category.title}</h5>
                                <p className="text-xs xl:text-sm text-[#7F7F7F] font-light">Explore Now!</p>
                            </div>
                            <Link
                                href={category.link}
                            >
                                <FaArrowRightLong className="text-lg xl:text-2xl text-[#797979] cursor-pointer" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedCategories