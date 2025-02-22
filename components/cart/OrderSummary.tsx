"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useShoppingCart } from "use-shopping-cart"

import { formatCurrency } from "@/lib/utils"

const OrderSummary = () => {
    const router = useRouter()
    const { cartCount, totalPrice, formattedTotalPrice } = useShoppingCart()
    const [discount, setDiscount] = useState(0)
    const grandTotal = Number(totalPrice) + discount

    return (
        <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:px-8 py-24">
            <h2 className="font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
            </h2>
            <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                    <p className="font-normal text-lg leading-8 text-gray-700">Subtotal</p>
                    <p className="font-medium text-lg leading-8 text-black">{formatCurrency(totalPrice as number)}</p>
                </div>
                {
                    discount > 0 && (
                        <div className="flex items-center justify-between pb-6">
                            <p className="font-normal text-lg leading-8 text-gray-700">Discount</p>
                            <p className="font-medium text-lg leading-8 text-black">{formatCurrency(discount)}</p>
                        </div>
                    )
                }
                <form>
                    <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Promo Code</label>
                    <div className="flex pb-4 w-full">
                        <div className="relative w-full">
                            <div className="absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                            <input
                                type="text"
                                className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400"
                                placeholder="xxxx xxxx xxxx"
                            />
                        </div>
                    </div>
                    <div className="flex items-center border-b border-gray-200">
                        <button
                            className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">Apply</button>
                    </div>
                </form>
                <div className="flex items-center justify-between py-8">
                    <p className="font-medium text-xl leading-8 text-black">{cartCount} Items</p>
                    <p className="font-semibold text-xl leading-8 text-df-yellow">{formatCurrency(grandTotal)}</p>
                </div>
                <button
                    className="w-full text-center bg-df-yellow rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-df-yellow/80"
                    onClick={() => router.push('/checkout')}
                >Checkout</button>
            </div>
        </div>
    )
}

export default OrderSummary