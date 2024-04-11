"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import TestimonialCard from './testimonial/TestimonialCard'

import 'swiper/css'
import 'swiper/css/navigation'

interface TestimonialsProps {
    testimonials: {
        commenter: string
        comment: string
        image: string
        rating: number
    }[]
}

const Testimonials: React.FC<TestimonialsProps> = ({
    testimonials
}) => {
    return (
        <div>
            <div className="pl-5 border-l-4 border-df-yellow">
                <h3 className="font-bold text-xl md:text-2xl xl:text-4xl">Testimonials</h3>
            </div>
            <div className="mt-6 md:mt-8 xl:mt-[62px]">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 18,
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                    }}
                    grabCursor={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                >
                    {
                        testimonials.map((testimonial, i) => (
                            <SwiperSlide key={i}>
                                <TestimonialCard
                                    commenter={testimonial.commenter}
                                    comment={testimonial.comment}
                                    image={testimonial.image}
                                    rating={testimonial.rating}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper >
            </div>
        </div>
    )
}

export default Testimonials