"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import { Mail, XIcon } from "lucide-react"

const NewsletterPopup = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        const hasSeenPopup = Cookies.get('hasSeenNewsletterPopup')
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true)
                Cookies.set('hasSeenNewsletterPopup', 'true', { expires: 7 }) // expires in 7 days
            }, 5000) // show popup 5 seconds after the page loads

            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsVisible(false)
        }, 700) // match the duration of the fade-out-down animation
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`relative w-96 lg:w-[440px] aspect-square bg-white px-6 py-12 rounded-lg shadow-lg overflow-hidden ${isClosing ? 'animate-fade-out-down' : 'animate-fade-in-up'}`}>
                <div className="relative z-10">
                    <h2 className="text-gray-900 text-xl lg:text-2xl font-bold mb-4 text-center">Sign up for our Newsletter!</h2>
                    <p className="text-gray-700 mb-6 text-center">Be the first to know about exclusive deals, new arrivals, and special promotions.</p>
                    <form action="" className="flex flex-col space-y-4">
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full p-3 pl-[54px] text-gray-900 border border-gray-900 rounded-md focus:outline-none focus:ring-0 focus:border-df-yellow/80"
                            />
                            <Mail className="absolute top-3.5 left-5 w-5 h-5 text-gray-900" />
                        </div>
                        <button
                            type="submit"
                            className="bg-df-yellow text-gray-900 font-medium px-4 py-2 rounded-md"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
                <div className='absolute bottom-0 left-0 w-full h-full z-0'>
                    <Image
                        src="/img/assets/fabrics-montage.png"
                        layout="fill"
                        objectFit="cover"
                        alt="lace and ankara fabrics"
                    />
                </div>
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><XIcon /></button>
            </div>
        </div>
    )
}

export default NewsletterPopup