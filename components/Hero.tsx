"use client"

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Hero = () => {

    const slides = [
        {
            text: "Trendy Glasses Just For You",
            subtext: "cool / colorful / comfy",
            category: "Sunglasses",
            image: "/img/hero/young-woman-wearing-sunglasses-mobile.png",
            link: "#"
        },
        {
            text: "Trendy Glasses Just For You 2",
            subtext: "cool / colorful / comfy",
            category: "Sunglasses",
            image: "/img/hero/young-woman-wearing-sunglasses-mobile.png",
            link: "#"
        },
        {
            text: "Trendy Glasses Just For You 3",
            subtext: "cool / colorful / comfy",
            category: "Sunglasses",
            image: "/img/hero/young-woman-wearing-sunglasses-mobile.png",
            link: "#"
        },
    ]

    return (
        <div className="h-full bg-df-yellow rounded-lg overflow-hidden">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                navigation
                pagination={{ clickable: true, type: 'bullets' }}
            >
                {
                    slides.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 xl:grid-cols-2">
                                <div className="grid grid-cols-5 md:grid-cols-6 xl:grid-cols-4">
                                    <div className="col-start-2 col-span-3 md:col-start-2 md:col-span-4 xl:col-start-2 xl:col-span-2 flex flex-col gap-6 text-center text-white my-12">
                                        <h5 className="text-sm md:text-base xl:text-left xl:text-lg font-semibold">{slide.category}</h5>
                                        <h3 className="text-[26px] leading-8 xl:text-left xl:text-4xl xl:leading-10 font-black">{slide.text}</h3>
                                        <div className="text-base xl:text-left xl:text-xl font-semibold">{slide.subtext}</div>
                                        <button
                                            className="bg-black w-[134px] xl:w-[200px] mx-auto xl:mx-0 text-sm xl:text-lg font-extrabold p-3 xl:p-4 rounded-md xl:rounded-lg"
                                            onClick={() => { }}
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                                <Image
                                    src={slide.image}
                                    alt={slide.text}
                                    fill
                                    className="object-contain object-bottom md:object-right xl:-ml-[12%]"
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper >
        </div >
    )
}

export default Hero