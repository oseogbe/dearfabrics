"use client"

import { urlFor } from "@/lib/sanity"
import { formatCurrency, formatDate } from "@/lib/utils"
import { OrderData } from "@/typings"
import Image from "next/image"
import { useEffect } from "react"
import { useShoppingCart } from "use-shopping-cart"

const Client = ({ order }: { order: OrderData }) => {
    const { clearCart } = useShoppingCart()

    useEffect(() => {
        clearCart()
    }, [])

    return (
        <section className="relative w-full max-w-7xl mx-auto pt-24">
            <div className="px-4 md:px-5 lg-6">
                <h2 className="font-bold text-2xl lg:text-3xl leading-10 text-black mb-11">
                    Your Order Confirmed
                </h2>
                <h6 className="font-medium text-xl leading-8 text-black mb-3">Hello, {order.customerName}</h6>
                <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                    Your order has been completed and will be delivered within the next 7 days.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
                    <div className="box group">
                        <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Date</p>
                        <h6 className="font-semibold text-2xl leading-9 text-black">{formatDate(order.created)}</h6>
                    </div>
                    <div className="box group">
                        <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Order ID</p>
                        <h6 className="font-semibold text-2xl leading-9 text-black">#{order.id}</h6>
                    </div>
                    <div className="box group">
                        <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Payment Method</p>
                        <Image src="/img/assets/mastercard.svg" width={70} height={70} alt="mastercard logo" />
                    </div>
                    <div className="box group">
                        <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Address</p>
                        <h6 className="font-semibold text-2xl leading-9 text-black">{order.shippingAddress}</h6>
                    </div>
                </div>
                {order.items.map(({ product, price, quantity, color, size }) => (
                    <div key={product.id} className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
                        <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                            <div className="relative h-48">
                                <Image
                                    src={urlFor(product.images[0]).width(200).url()}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                            <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                                <div className="">
                                    <h5 className="font-semibold text-2xl leading-9 text-black mb-6">{product.name}</h5>
                                    <p className="font-normal text-xl leading-8 text-gray-500">
                                        Quantity : <span className="text-black font-semibold">{quantity}</span>
                                    </p>
                                    <p className="font-normal text-xl leading-8 text-gray-500">
                                        Color : <span className="text-black font-semibold">{color}</span>
                                    </p>
                                    <p className="font-normal text-xl leading-8 text-gray-500">
                                        Size : <span className="text-black font-semibold">{size}</span>
                                    </p>
                                </div>
                                <h5 className="font-semibold md:text-lg lg:text-2xl leading-10 text-black sm:text-right mt-3">
                                    {formatCurrency(price * quantity)}
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center sm:justify-end w-full my-6">
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-normal md:text-lg lg:text-xl leading-8 text-gray-500">Subtotal</p>
                            <p className="font-semibold md:text-lg lg:text-xl leading-8 text-gray-900">{formatCurrency(order.subtotal)}</p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-normal md:text-lg lg:text-xl leading-8 text-gray-500">Shipping Charge</p>
                            <p className="font-semibold md:text-lg lg:text-xl leading-8 text-gray-900">{formatCurrency(order.shipping)}</p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-normal md:text-lg lg:text-xl leading-8 text-gray-500">Taxes</p>
                            <p className="font-semibold md:text-lg lg:text-xl leading-8 text-gray-900">{formatCurrency(order.tax)}</p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-normal md:text-lg lg:text-xl leading-8 text-gray-500">Discount</p>
                            <p className="font-semibold md:text-lg lg:text-xl leading-8 text-gray-900">{formatCurrency(order.discount)}</p>
                        </div>
                        <div className="flex items-center justify-between py-6 border-y border-gray-100">
                            <p className="font-semibold text-2xl leading-9 text-gray-900">Total</p>
                            <p className="font-bold text-2xl leading-9 text-df-yellow">{formatCurrency(order.total)}</p>
                        </div>
                    </div>
                </div>
                <div className="data">
                    <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                        We&apos;ll be sending a shipping confirmation email when the items are shipped successfully.
                    </p>
                    <h6 className="font-bold text-2xl leading-9 text-black mb-3">
                        Thank you for shopping with us!
                    </h6>
                    <Image
                        src="/img/dfng-logo.png"
                        alt="dearfabrics.ng logo"
                        height={100}
                        width={100}
                        className="cursor-pointer h-9 md:h-10 xl:h-12 w-auto mt-[40px]"
                    />
                </div>
            </div>
        </section>
    )
}

export default Client