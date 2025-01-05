"use client"

import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

import { formatCurrency } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface ProductFilterProps {
    priceRange: number[]
    minPrice: number
    maxPrice: number
    selectedColors: string[]
    selectedSizes: string[]
    onPriceChange: (values: number[]) => void
    onColorChange: (color: string) => void
    onSizeChange: (size: string) => void
}

const ProductFilter = ({
    priceRange,
    minPrice,
    maxPrice,
    selectedColors,
    selectedSizes,
    onPriceChange,
    onColorChange,
    onSizeChange,
}: ProductFilterProps) => {
    const [step, setStep] = useState(0)

    useEffect(() => {
        if (maxPrice <= 500) {
            setStep(10)
        } else if (maxPrice <= 5000) {
            setStep(100)
        } else if (maxPrice <= 50000) {
            setStep(1000)
        } else if (maxPrice <= 500000) {
            setStep(10000)
        } else {
            setStep(100000)
        }
    }, [maxPrice])

    // TODO: change to colors defined for products in selected category
    const colors = [
        "Purple",
        "Black",
        "Red",
        "Orange",
        "Navy",
        "White",
        "Brown",
        "Green",
        "Yellow",
        "Grey",
        "Pink",
        "Blue",
    ]

    // TODO: change to sizes defined for products in selected category
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
                <h4 className='text-[#807D7E] text-base xl:text-xl font-semibold'>Price Range</h4>
                <div className='text-sm xl:text-base text-gray-900'>{formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}</div>
                <RangeSlider
                    id="range-slider-yellow"
                    min={minPrice}
                    max={maxPrice}
                    step={step}
                    value={priceRange}
                    onInput={onPriceChange}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <h4 className='text-[#807D7E] text-base xl:text-xl font-semibold'>Colors</h4>
                <div className='grid grid-cols-8 md:grid-cols-12 xl:grid-cols-4 gap-2 xl:gap-6'>
                    {
                        colors.map(color => (
                            <div key={color}>
                                <div
                                    className='w-full aspect-square border rounded-md xl:rounded-lg cursor-pointer'
                                    style={{
                                        backgroundColor: color,
                                        borderWidth: '2px',
                                        boxShadow: selectedColors.includes(color) ? `0 0 0 2px ${color}` : ''
                                    }}
                                    onClick={() => onColorChange(color)}
                                ></div>
                                <div className='mt-2 text-[#8A8989] text-[8px] xl:text-[10px] text-center font-semibold'>{color}</div>
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