"use client"

import Image from "next/image"

interface TestimonialCardProps {
    commenter: string
    comment: string
    image: string
    stars: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    commenter,
    comment,
    image,
    stars
}) => {
    return (
        <div className="mb-12 md:mb-0 p-12 border shadow-md rounded-lg xl:rounded-xl">
            <div className="mb-6 flex justify-center">
                <Image
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
                    alt={`${commenter}'s picture`}
                    height={500}
                    width={500}
                    priority
                    className="w-24 xl:w-32 rounded-full shadow-lg dark:shadow-black/20 border-e-2 border-df-yellow"
                />
            </div>
            <h5 className="mb-4 text-center text-sm xl:text-lg font-bold text-gray-900">{commenter}</h5>
            <p className="mb-4 text-xs xl:text-base text-center text-gray-900">
                {comment}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="inline-block w-4 xl:w-6">
                    <path fill="currentColor"
                        d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                </svg>
            </p>
            <ul className="mb-0 flex justify-center">
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-4 xl:w-6 text-df-yellow">
                        <path fill="currentColor"
                            d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-4 xl:w-6 text-df-yellow">
                        <path fill="currentColor"
                            d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-4 xl:w-6 text-df-yellow">
                        <path fill="currentColor"
                            d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-4 xl:w-6 text-df-yellow">
                        <path fill="currentColor"
                            d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-4 xl:w-6 text-df-yellow">
                        <path fill="currentColor"
                            d="m480 757 157 95-42-178 138-120-182-16-71-168v387ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                </li>
            </ul>
        </div>
    )
}

export default TestimonialCard