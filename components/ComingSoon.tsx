"use client"

import Image from "next/image"
import Container from "./Container"

const ComingSoon = () => {
    return (
        <Container>
            <div className="pt-16 md:pt-24">
                <Image
                    src="/img/dfng-logo-alt.svg"
                    alt="dearfabrics.ng logo"
                    width={500}
                    height={500}
                    className="cursor-pointer mx-auto h-14 md:h-20 xl:h-24 w-auto"
                />
            </div>
            <div className="relative flex flex-col items-center">
                <h2 className="font-heading m-10 text-6xl sm:text-7xl lg:text-8xl leading-[3.5rem] md:leading-[5rem] sm:leading-[7rem] lg:leading-[7rem] font-black	text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-df-yellow">
                        Coming Soon
                    </span>
                    <span className="">⏳</span>
                </h2>
                <p className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-df-yellow text-xl text-center tracking-wide">For your fabrics, ready to wear, jewelry, accessories and more...</p>
            </div>
            <div className="max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto relative z-10">
                <div className="max-w-xl mx-auto">
                    <div className="mb-5">
                        <h2 className="font-extralight text-center text-xl md:text-3xl md:leading-tight text-slate-100">Join the waiting list so you can be notified when we go live!</h2>
                    </div>
                    <form>
                        <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                            <div className="w-full">
                                <label htmlFor="hero-input" className="sr-only">Subscribe</label>
                                <input type="text" id="hero-input" name="hero-input" className="py-4 px-3 md:py-5 md:px-4 block w-full border-gray-200 rounded-lg text-base md:text-xl focus:border-black focus:ring-2 focus:ring-df-yellow ring-offset-2 text-slate-900 font-medium placeholder:text-black disabled:opacity-50 disabled:pointer-events-none" placeholder="enter your email" />
                            </div>
                            <a className="w-full sm:w-auto whitespace-nowrap py-4 px-3 md:py-5 md:px-4 inline-flex justify-center items-center gap-x-2 text-base md:text-xl font-semibold rounded-lg border border-transparent bg-df-yellow/80 text-white hover:bg-df-yellow focus:ring-2 focus:ring-df-yellow ring-offset-2 disabled:opacity-50 disabled:pointer-events-none" href="#">
                                subscribe
                            </a>
                        </div>
                    </form>
                </div>

            </div>
            <div className="flex justify-center">
                <Image
                    src="/img/assets/afro-girl-with-glasses-smiling.png"
                    alt="dearfabrics.ng logo"
                    width={500}
                    height={500}
                    className="hidden md:block absolute bottom-0 w-[60%] xl:w-1/3"
                />
            </div>
        </Container>
    )
}

export default ComingSoon