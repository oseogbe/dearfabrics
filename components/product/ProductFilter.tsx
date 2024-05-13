"use client"

import { Dispatch, SetStateAction } from 'react'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

interface ProductFilterProps {
    price: number[]
    minPrice: number
    maxPrice: number
    selectedCategories: string[]
    selectedColors: string[]
    selectedSizes: string[]
    onPriceChange: Dispatch<SetStateAction<number[]>>
    onCategoryChange: (category: string, checked: boolean) => void
    onColorChange: (color: string) => void
    onSizeChange: (size: string) => void
}

const ProductFilter = ({
    price,
    minPrice,
    maxPrice,
    selectedCategories,
    selectedColors,
    selectedSizes,
    onPriceChange,
    onCategoryChange,
    onColorChange,
    onSizeChange,
}: ProductFilterProps) => {
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
            code: "#7e22ce"
        },
        {
            name: "Black",
            code: "#000000"
        },
        {
            name: "Red",
            code: "#dc2626"
        },
        {
            name: "Orange",
            code: "#ea580c"
        },
        {
            name: "Navy",
            code: "#345eff"
        },
        {
            name: "White",
            code: "#ffffff"
        },
        {
            name: "Brown",
            code: "#d67e3b"
        },
        {
            name: "Green",
            code: "#22c55e"
        },
        {
            name: "Yellow",
            code: "#eab308"
        },
        {
            name: "Grey",
            code: "#6b7280"
        },
        {
            name: "Pink",
            code: "#ec4899"
        },
        {
            name: "Blue",
            code: "#60a5fa"
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
        <div className='space-y-10'>
            <div className='flex flex-col gap-4'>
                <h4 className='text-[#807D7E] text-base xl:text-xl font-semibold'>Sub-categories</h4>
                <div className='space-y-4'>
                    {
                        subCategories.map(category => (
                            <div key={category} className='flex justify-between'>
                                <h6 className='text-[#3C4242] text-xs xl:text-base font-semibold'>{category}</h6>
                                <input
                                    type="checkbox"
                                    className="shrink-0 border-gray-400 rounded !text-df-yellow focus:ring-0"
                                    checked={selectedCategories.includes(category)}
                                    onChange={e => onCategoryChange(category, e.target.checked)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h4 className='text-[#807D7E] text-base xl:text-xl font-semibold'>Price</h4>
                <div className='text-sm xl:text-base'>₦{price[0]} - ₦{price[1]}</div>
                <RangeSlider
                    id="range-slider-yellow"
                    min={minPrice}
                    max={maxPrice}
                    step={10000}
                    defaultValue={[minPrice, maxPrice]}
                    onInput={onPriceChange}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <h4 className='text-[#807D7E] text-base xl:text-xl font-semibold'>Colors</h4>
                <div className='grid grid-cols-8 md:grid-cols-12 xl:grid-cols-4 gap-2 xl:gap-6'>
                    {
                        colors.map(color => (
                            <div key={color.name}>
                                <div
                                    className='w-full aspect-square border rounded-md xl:rounded-lg cursor-pointer'
                                    style={{
                                        backgroundColor: color.code,
                                        borderWidth: '2px',
                                        boxShadow: selectedColors.includes(color.name) ? `0 0 0 2px ${color.code}` : ''
                                    }}
                                    onClick={() => onColorChange(color.name)}
                                ></div>
                                <div className='mt-2 text-[#8A8989] text-[8px] xl:text-[10px] text-center font-semibold'>{color.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h4 className='text-[#807D7E] text-base xl:text-xl font-semibold'>Sizes</h4>
                <div className='grid grid-cols-6 md:grid-cols-9 xl:grid-cols-3 gap-2 xl:gap-5'>
                    {
                        sizes.map(size => (
                            <div key={size}>
                                <div
                                    className='h-8 flex items-center justify-center text-[10px] xl:text-sm text-[#3C4242] font-semibold border rounded-md cursor-pointer'
                                    style={{
                                        borderWidth: '2px',
                                        background: selectedSizes.includes(size) ? '#e5e7eb' : ''
                                    }}
                                    onClick={() => onSizeChange(size)}
                                >{size}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductFilter