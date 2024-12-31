"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const AnkaraCard = () => {
    const router = useRouter()

    return (
        <div className="relative w-full h-[690px] md:h-[360px] xl:h-[540px] flex flex-col md:flex-row shadow-md">
            <Image
                src="/img/assets/ankara-fabrics.jpg"
                alt="ankara fabrics"
                fill
                className="absolute -z-10 object-cover"
            />
            <div className="flex-1 bg-black/80 p-10 xl:p-20 flex items-center md:rounded-l-lg">
                <div className="space-y-5 xl:space-y-7">
                    <h3 className="text-white text-2xl xl:text-5xl font-black uppercase">Everything <br />Ankara</h3>
                    <p className="text-white text-sm xl:text-xl font-medium">We sell the best and quality ankara fabrics with <br className="hidden xl:block" />the latest pattern and style just for you.</p>
                    <button onClick={() => router.push('/collections/fabrics/ankara')} className="bg-white px-5 xl:px-11 py-2 xl:py-3 text-sm xl:text-lg font-semibold rounded-lg text-gray-900">Shop Now</button>
                </div>
            </div>
            <div className="flex-1 md:rounded-r-lg"></div>
        </div>
    )
}

export default AnkaraCard