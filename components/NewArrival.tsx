"use client"

import Image from "next/image"
import Link from "next/link"

interface NewArrivalProps {

}

const NewArrival: React.FC<NewArrivalProps> = ({

}) => {
    return (
        <div>
            <div className="pl-3 border-l-4 border-df-yellow text-df-yellow font-bold text-sm md:text-base xl:text-xl self-center">
                Featured
            </div>
            <div className="mt-4 xl:mt-8">
                <h3 className="font-bold text-xl md:text-2xl xl:text-4xl">New Arrival</h3>
            </div>
            <div className="mt-6 md:mt-8 xl:mt-[62px] h-[750px] md:h-[360px] xl:h-[600px] grid grid-rows-4 md:grid-rows-2 grid-cols-2 md:grid-cols-4 gap-4 xl:gap-[30px]">
                <div className="relative row-start-1 row-span-2 md:row-span-full col-span-full md:col-start-1 md:col-span-2 bg-black overflow-hidden">
                    <Image
                        src="/img/assets/sequence-lace-fabric.png"
                        alt=""
                        height={1000}
                        width={1000}
                        className="absolute object-contain"
                    />
                    <div className="absolute bottom-3 xl:bottom-6 left-3 xl:left-6 space-y-2 xl:space-y-4">
                        <h5 className="text-[#fafafa] text-sm xl:text-2xl font-extrabold">Sequence Lace Fabric</h5>
                        <p className="text-[#fafafa] text-[10px] xl:text-sm">Silver and dark blue embroided lace fabric.</p>
                        <div><Link href="#" className="text-white text-[10px] xl:text-base underline">Shop Now</Link></div>
                    </div>
                </div>
                <div className="relative row-start-3 md:row-start-1 row-span-1 col-start-1 md:col-start-3 col-span-2 bg-black overflow-hidden">
                    <Image
                        src="/img/assets/gown-0.png"
                        alt=""
                        width={500}
                        height={500}
                        className="absolute bottom-0 left-1/4 h-[120%] object-contain"
                    />
                    <div className="absolute bottom-3 xl:bottom-6 left-3 xl:left-6 space-y-2 xl:space-y-4">
                        <h5 className="text-[#fafafa] text-sm xl:text-2xl font-extrabold">Women&apos;s Collections</h5>
                        <p className="text-[#fafafa] text-[10px] xl:text-sm">Featured women collections that give you another vibe.</p>
                        <div><Link href="#" className="text-white text-[10px] xl:text-base underline">Shop Now</Link></div>
                    </div>
                </div>
                <div className="relative row-start-4 md:row-start-2 row-span-1 col-start-1 md:col-start-3 col-span-1 bg-black overflow-hidden">
                    <Image
                        src="/img/assets/glasses-0.png"
                        alt=""
                        width={500}
                        height={500}
                        className="absolute bottom-0 left-4 xl:left-8 h-[80%] object-contain"
                    />
                    <div className="absolute bottom-3 xl:bottom-6 left-3 xl:left-6 space-y-2 xl:space-y-4">
                        <h5 className="text-[#fafafa] text-sm xl:text-2xl font-extrabold">Glasses</h5>
                        <p className="text-[#fafafa] text-[10px] xl:text-sm">Trending glasses to fit your looks.</p>
                        <div><Link href="#" className="text-white text-[10px] xl:text-base underline">Shop Now</Link></div>
                    </div>
                </div>
                <div className="relative row-start-4 md:row-start-2 row-span-1 col-start-2 md:col-start-4 col-span-1 bg-black overflow-hidden">
                    <Image
                        src="/img/assets/gucci-perfume-0.png"
                        alt=""
                        width={500}
                        height={500}
                        className="absolute bottom-0 left-4 xl:left-8 h-[80%] object-contain"
                    />
                    <div className="absolute bottom-3 xl:bottom-6 left-3 xl:left-6 space-y-2 xl:space-y-4">
                        <h5 className="text-[#fafafa] text-sm xl:text-2xl font-extrabold">Perfume</h5>
                        <p className="text-[#fafafa] text-[10px] xl:text-sm">GUCCI INTENSE OUD EDP</p>
                        <div><Link href="#" className="text-white text-[10px] xl:text-base underline">Shop Now</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrival