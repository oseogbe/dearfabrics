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
        <div className="flex items-center gap-1 md:gap-2">
            {/* 
                <FaStar size={12} className="fill-df-yellow" />
                <FaStar size={12} className="fill-df-yellow" />
                <FaStar size={12} className="fill-df-yellow" />
                <FaStarHalfAlt size={12} className="fill-df-yellow" />
                <FaRegStar size={12} className="fill-df-yellow" />
            */}
            <div className="flex flex-row-reverse justify-end items-center">
                <input id="hs-ratings-readonly-1" type="radio" className="peer -ms-4 size-4 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="1" />
                <label htmlFor="hs-ratings-readonly-1" className="peer-checked:text-df-yellow text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                </label>
                <input id="hs-ratings-readonly-2" type="radio" className="peer -ms-4 size-4 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="2" />
                <label htmlFor="hs-ratings-readonly-2" className="peer-checked:text-df-yellow text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                </label>
                <input id="hs-ratings-readonly-3" type="radio" className="peer -ms-4 size-4 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="3" />
                <label htmlFor="hs-ratings-readonly-3" className="peer-checked:text-df-yellow text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                </label>
                <input id="hs-ratings-readonly-4" type="radio" className="peer -ms-4 size-4 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="4" />
                <label htmlFor="hs-ratings-readonly-4" className="peer-checked:text-df-yellow text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                </label>
                <input id="hs-ratings-readonly-5" type="radio" className="peer -ms-4 size-4 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="5" />
                <label htmlFor="hs-ratings-readonly-5" className="peer-checked:text-df-yellow text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                </label>
            </div>
            <div className="text-sm">(0)</div>
        </div>
    )
}

export default ProductStars