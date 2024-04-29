"use client"

import { useState } from 'react'

import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

const ProductFilter = () => {
    const [value, setValue] = useState([100000, 150000])

    return (
        <div className="p-8 border shadow-md rounded-lg">
            <h3 className='text-[#807D7E] text-2xl font-bold'>Filter Options</h3>
            <hr className='my-8' />
            <div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-[#807D7E] text-xl font-semibold'>Price</h4>
                    <div>₦{value[0]} - ₦{value[1]}</div>
                    <RangeSlider
                        id="range-slider-yellow"
                        min={50000}
                        max={200000}
                        step={10000}
                        defaultValue={[100000, 150000]}
                        onInput={setValue}
                    />
                </div>
            </div>

        </div>
    )
}

export default ProductFilter