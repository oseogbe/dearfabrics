"use client"

import Image from 'next/image'

import OrderSummary from '@/components/cart/OrderSummary'

import { formatAmount } from '@/lib/utils'

import { CheckCircleIcon, Clock3Icon } from 'lucide-react'

interface CartClientProps {
    products: {
        id: string
        name: string
        slug: string
        category: string
        price: number
        quantity: number
        image: string
        inStock?: boolean
        shipsIn?: string
    }[]
}

const CartClient: React.FC<CartClientProps> = ({
    products
}) => {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                    {/* <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">3 Items</h2> */}
                </div>
                {/* <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                    <div className="col-span-12 md:col-span-7">
                        <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                    </div>
                    <div className="col-span-12 md:col-span-5"> 
                        <div className="grid grid-cols-5">
                            <div className="col-span-3">
                                <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                            </div>
                            <div className="col-span-2">
                                <p className="font-normal text-lg leading-8 text-gray-400 text-right">Total</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                {
                    products.map(product => (
                        <div
                            key={product.id}
                            className="relative flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group"
                        >
                            <div className="w-full md:max-w-[210px] flex items-center aspect-square bg-df-gray">
                                <Image
                                    src={product.image}
                                    alt="perfume bottle image"
                                    height={170}
                                    width={170}
                                    className="mx-auto"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                <div className="md:col-span-2">
                                    <div className="flex flex-col max-[500px]:items-center gap-3">
                                        <h6 className="font-semibold text-base leading-7 text-black">{product.name}</h6>
                                        <h6 className="font-normal text-base leading-7 text-gray-500 capitalize">{product.category}</h6>
                                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-df-yellow">N{formatAmount(product.price)}</h6>
                                    </div>
                                </div>
                                <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                    <div className="flex items-center h-full">
                                        <button
                                            className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                viewBox="0 0 22 22" fill="none">
                                                <path d="M16.5 11H5.5" stroke="" stroke-width="1.6"
                                                    stroke-linecap="round" />
                                                <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                    stroke-linecap="round" />
                                                <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                    stroke-linecap="round" />
                                            </svg>
                                        </button>
                                        <input type="text"
                                            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent focus:border-gray-200 focus:outline-none focus:ring-0"
                                            value={product.quantity} disabled />
                                        <button
                                            className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                viewBox="0 0 22 22" fill="none">
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                                    stroke-linecap="round" />
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                                    stroke-width="1.6" stroke-linecap="round" />
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                                    stroke-width="1.6" stroke-linecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-df-yellow">N{formatAmount(product.price * product.quantity)}</p>
                                </div>
                                <div className='absolute bottom-6 flex items-center gap-x-2 text-sm text-gray-500'>
                                    {product.inStock && (
                                        <><CheckCircleIcon size={18} className='text-green-500' /> In stock</>
                                    )}
                                    {product.shipsIn && (
                                        <><Clock3Icon size={18} className='text-gray-500' /> Ships in {product.shipsIn}</>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                }

                {/* <div className="flex items-center justify-end mt-8">
                    <button
                        className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-df-yellow shadow-sm shadow-transparent transition-all duration-500 hover:text-df-yellow/80">
                        Add Coupon Code
                        <svg className="transition-all duration-500 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                            fill="none">
                            <path
                                d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                                stroke="#e9ac2d" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                    </button>
                </div> */}
            </div>
            <OrderSummary products={products} />
        </div>
    )
}

export default CartClient