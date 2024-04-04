"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface AdCardProps {
    heading: string
    title: string
    offerLabel: string
    actionLabel: string
    actionLink: string
    backgroundImageUrl: string
    imageUrl: string
}

const AdCard: React.FC<AdCardProps> = ({
    heading,
    title,
    offerLabel,
    actionLabel,
    actionLink,
    backgroundImageUrl,
    imageUrl
}) => {
    const router = useRouter()

    return (
        <div
            className={`relative w-full h-[350px] flex flex-col justify-center p-6 xl:p-12 bg-no-repeat bg-cover text-white rounded-xl`}
            style={{
                backgroundImage: `url(${backgroundImageUrl})`
            }}
        >
            <h5 className="font-semibold text-sm xl:text-lg">{heading}</h5>
            <h3 className="font-bold text-2xl xl:text-4xl mt-6 z-10">{title}</h3>
            <p className="font-medium text-xs xl:text-base uppercase mt-2 z-10">{offerLabel}</p>
            <div className="font-semibold text-sm xl:text-xl cursor-pointer underline mt-8 xl:mt-12" onClick={() => router.push(actionLink)}>{actionLabel}</div>
            <Image
                src={imageUrl}
                alt="dear fabrics ad-card image"
                width={500}
                height={500}
                className="absolute h-full xl:h-[120%] bottom-0 right-0 pl-28 xl:pl-14 object-contain"
            />
        </div>
    )
}

export default AdCard