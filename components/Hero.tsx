"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { urlFor } from "@/lib/sanity"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface HeroProps {
    slides: {
        text: string;
        subtext: string;
        category: string;
        image: string;
        mobileImage: string;
        link: string;
    }[]
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
    return (
        <>
            <div className="hidden lg:block">
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
                                <div className="relative w-full h-[350px] border shadow-sm rounded-xl overflow-hidden">
                                    <Image src={urlFor(slide.image).url()} alt={slide.text} fill className="object-cover" />
                                    <div className="absolute inset-y-0 right-0 flex flex-col justify-center space-y-6 text-gray-900 w-1/2 p-8">
                                        <h5 className="font-medium">{slide.category}</h5>
                                        <h3 className="text-3xl leading-10 font-black">{slide.text}</h3>
                                        <div className="text-lg font-semibold">{slide.subtext}</div>
                                        <Link href={slide.link}>
                                            <button className="w-[200px] h-[50px] bg-gray-900 text-lg text-white font-semibold rounded-lg">Shop Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper >
            </div >
            <div className="hidden md:block lg:hidden">
                <MediumSizeHero slides={slides} />
            </div>
            <div className="block md:hidden">
                <MobileSizeHero slides={slides} />
            </div>
        </>
    )
}

const MediumSizeHero: React.FC<HeroProps> = ({ slides }) => {
    return (
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
                        <div className="relative w-full h-[250px] border shadow-sm rounded-xl overflow-hidden">
                            <Image src={urlFor(slide.image).url()} alt={slide.text} fill className="object-cover" />
                            <div className="absolute inset-y-0 right-0 flex flex-col justify-center space-y-3 text-gray-900 w-1/2 p-8">
                                <h5 className="text-sm font-medium">{slide.category}</h5>
                                <h3 className="text-2xl leading-10 font-black">{slide.text}</h3>
                                <div className="font-semibold">{slide.subtext}</div>
                                <Link href={slide.link}>
                                    <button className="w-[160px] h-[40px] bg-gray-900 text-white text-sm font-semibold rounded-md">Shop Now</button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper >
    )
}

const MobileSizeHero: React.FC<HeroProps> = ({ slides }) => {
    return (
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
                        <div className="relative w-full h-[350px] border shadow-sm rounded-xl overflow-hidden">
                            <Image src={urlFor(slide.mobileImage).url()} alt={slide.text} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center space-y-3 p-8 text-gray-900 text-center">
                                <h5 className="text-sm font-medium text-white">{slide.category}</h5>
                                <h3 className="text-2xl leading-10 font-black text-white">{slide.text}</h3>
                                <div className="font-semibold text-white">{slide.subtext}</div>
                                <Link href={slide.link}>
                                    <button className="w-[160px] h-[40px] bg-white text-gray-900 text-sm font-semibold rounded-md">Shop Now</button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper >
    )
}

export default Hero