"use client"

import { useRouter } from 'next/navigation'

import { FaAngleDown } from 'react-icons/fa6'
import { IoCall } from 'react-icons/io5'

const Announcement = () => {
    const router = useRouter()

    return (
        <div className="bg-black py-3 px-4 sm:px-2 md:px-10 xl:px-20">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto text-white text-xs xl:text-sm">
                <div className="md:flex flex-row items-center gap-3">
                    Massive Sales For Ankara Fabrics And Free Delivery Within Abuja - Up to 50% Off!
                    <span className="ml-3 md:ml-0 cursor-pointer hover:text-df-yellow font-extrabold underline transition">ShopNow</span>
                </div>
                <div className="hidden md:flex flex-row items-center">
                    <div className="flex flex-row items-center gap-x-4 cursor-pointer">English <FaAngleDown /></div>
                    <div className="px-4">|</div>
                    <IoCall className="cursor-pointer hover:fill-df-yellow transition" onClick={() => router.push('/contact')} />
                </div>
            </div>
        </div>
    )
}

export default Announcement