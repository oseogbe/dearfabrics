"use client"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

import { cn } from "@/lib/utils"

const ProductFilter = () => {
    const [value, setValue] = useState([50000, 200000])

    const searchParams = useSearchParams()

    const subCategories = [
        "Lace",
        "Aso-oke",
        "George",
        "Flower",
        "Plain",
        "Ankara"
    ]

    const colors = [
        {
            name: "Purple",
            class: "bg-purple-700"
        },
        {
            name: "Black",
            class: "bg-black"
        },
        {
            name: "Red",
            class: "bg-red-600"
        },
        {
            name: "Orange",
            class: "bg-orange-600"
        },
        {
            name: "Navy",
            class: "bg-[#345eff]"
        },
        {
            name: "White",
            class: "bg-white"
        },
        {
            name: "Brown",
            class: "bg-[#d67e3b]"
        },
        {
            name: "Green",
            class: "bg-green-500"
        },
        {
            name: "Yellow",
            class: "bg-yellow-500"
        },
        {
            name: "Grey",
            class: "bg-gray-500"
        },
        {
            name: "Pink",
            class: "bg-pink-500"
        },
        {
            name: "Blue",
            class: "bg-blue-400"
        },
    ]

    const sizes = [
        "XXS",
        "XL",
        "XS",
        "S",
        "M",
        "L",
        "XXL",
        "3XL",
        "4XL"
    ]

    return (
        <div className="p-8 border shadow-md rounded-lg">
            <h3 className='text-[#807D7E] text-2xl font-bold'>Filter Options</h3>
            <hr className='my-8' />
            <div className='space-y-10'>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-[#807D7E] text-xl font-semibold'>Sub-categories</h4>
                    <div className='space-y-4'>
                        {
                            subCategories.map(category => (
                                <div key={category} className='flex justify-between'>
                                    <h6 className='text-[#3C4242] font-semibold'>{category}</h6>
                                    <input type="checkbox" className="shrink-0 border-gray-400 rounded !text-df-yellow focus:ring-df-yellow/80" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-[#807D7E] text-xl font-semibold'>Price</h4>
                    <div>₦{value[0]} - ₦{value[1]}</div>
                    <RangeSlider
                        id="range-slider-yellow"
                        min={50000}
                        max={200000}
                        step={10000}
                        defaultValue={[value[0], value[1]]}
                        onInput={setValue}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-[#807D7E] text-xl font-semibold'>Colors</h4>
                    <div className='grid grid-cols-4 gap-6'>
                        {
                            colors.map(color => (
                                <div key={color.name}>
                                    <div className={cn('w-full aspect-square border rounded-lg cursor-pointer', color.class)}></div>
                                    <div className='mt-2 text-[#8A8989] text-[10px] text-center font-semibold'>{color.name}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-[#807D7E] text-xl font-semibold'>Sizes</h4>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            sizes.map(size => (
                                <div key={size}>
                                    <div className='h-8 flex items-center justify-center text-sm text-[#3C4242] font-semibold border rounded-md cursor-pointer'>{size}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductFilter