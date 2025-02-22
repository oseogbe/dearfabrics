"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { useShoppingCart } from "use-shopping-cart"
import { Product } from "use-shopping-cart/core"
import { motion } from "framer-motion"

import Container from "@/components/Container"
import OrderSummary from "@/components/cart/OrderSummary"

import { formatCurrency } from "@/lib/utils"
import { urlFor } from "@/lib/sanity"

import { FaRegSadTear } from "react-icons/fa"

const CartPage = () => {
    const { cartDetails, cartCount, incrementItem, decrementItem, removeItem } =
        useShoppingCart()
    const [cartProducts, setCartProducts] = useState<Product[]>([])

    useEffect(() => {
        if (!cartDetails) return
        const filteredProducts = Object.values(cartDetails).flatMap(
            product => product as Product)
        setCartProducts(filteredProducts)
    }, [cartDetails, cartCount])

    return (
        <Container>
            <div className="pt-5 xl:pt-10">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 xl:col-span-8 lg:pr-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div className="flex items-center justify-between pb-4 lg:pb-8 border-b border-gray-300">
                            <h2 className="font-bold text-2xl lg:text-3xl leading-10 text-black">
                                Shopping Cart
                            </h2>
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
                        {!cartDetails ||
                            (!cartCount && (
                                <div className="grid place-items-center h-[50vh]">
                                    <div className="flex flex-col items-center text-gray-900">
                                        <div className="flex">
                                            <motion.div
                                                animate={{ rotate: [-10, 10, -10] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            >
                                                <FaRegSadTear size={36} />
                                            </motion.div>
                                        </div>
                                        <p className="text-xl md:text-2xl mt-4">
                                            Your cart is empty
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {cartProducts.map((product) => {
                            return (
                                <div
                                    key={product.id}
                                    className="relative flex flex-col min-[500px]:flex-row min-[500px]:items-start gap-5 py-6 border-b border-gray-200 group"
                                >
                                    <div className="w-full md:max-w-[210px] flex items-center aspect-square bg-df-gray">
                                        <Image
                                            src={urlFor(product?.image as string)
                                                .width(300)
                                                .url()}
                                            alt={product.name as string}
                                            height={300}
                                            width={300}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                        <div className="md:col-span-2 md:py-4">
                                            <div className="flex flex-col max-[500px]:items-center gap-3">
                                                {product.categories && product.categories.length > 0 && (
                                                    <Link
                                                        href={`/${product.categories[0]}/${product.slug}`}
                                                        className="text-center md:text-left font-semibold text-base leading-7 text-black hover:cursor-pointer"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                )}
                                                {/* <h6 className="font-normal text-base leading-7 text-gray-500 uppercase">{product.categories[0]}</h6> */}
                                                <div className="font-thin text-gray-900">
                                                    {product.size} {product.color && (`, ${product.color}`)}
                                                </div>

                                                <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300">
                                                    {formatCurrency(product.price)}
                                                </h6>
                                                <div className="flex items-center gap-x-2 text-sm text-gray-500 mt-4 xl:mt-12">
                                                    {product.inStock ? (
                                                        <div className="px-3 py-1 text-xs text-white bg-green-500 rounded-full">
                                                            In Stock
                                                        </div>
                                                    ) : (
                                                        <div className="px-3 py-1 text-xs text-white bg-red-500 rounded-full">
                                                            Sold Out
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start md:py-4 max-[500px]:justify-center h-full max-md:mt-3">
                                            <div className="grid place-items-center gap-y-4">
                                                <div className="flex items-start h-full">
                                                    <button
                                                        className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                                                        onClick={() => {
                                                            if (product?.quantity > 1) {
                                                                decrementItem(product.id)
                                                            }
                                                        }}
                                                    >
                                                        <svg
                                                            className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 22 22"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M16.5 11H5.5"
                                                                stroke=""
                                                                strokeWidth="1.6"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M16.5 11H5.5"
                                                                stroke=""
                                                                strokeOpacity="0.2"
                                                                strokeWidth="1.6"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M16.5 11H5.5"
                                                                stroke=""
                                                                strokeOpacity="0.2"
                                                                strokeWidth="1.6"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent focus:border-gray-200 focus:outline-none focus:ring-0"
                                                        value={
                                                            cartDetails && cartDetails[product.id]
                                                                ? cartDetails[product.id].quantity
                                                                : ""
                                                        }
                                                        disabled
                                                    />
                                                    <button
                                                        className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                                                        onClick={() => incrementItem(product.id)}
                                                    >
                                                        <svg
                                                            className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 22 22"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M11 5.5V16.5M16.5 11H5.5"
                                                                stroke=""
                                                                strokeWidth="1.6"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M11 5.5V16.5M16.5 11H5.5"
                                                                stroke=""
                                                                strokeOpacity="0.2"
                                                                strokeWidth="1.6"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M11 5.5V16.5M16.5 11H5.5"
                                                                stroke=""
                                                                strokeOpacity="0.2"
                                                                strokeWidth="1.6"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {/* remove cart item */}
                                                <div
                                                    className="text-sm underline cursor-pointer text-gray-900"
                                                    onClick={() => removeItem(product.id)}
                                                >
                                                    remove
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start md:py-8 max-[500px]:justify-center md:justify-end h-full max-md:mt-3">
                                            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300">
                                                {formatCurrency(product.price * product?.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* <div className="flex items-center justify-end mt-8">
                            <button
                                className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-df-yellow shadow-sm shadow-transparent transition-all duration-500 hover:text-df-yellow/80">
                                Add Coupon Code
                                <svg className="transition-all duration-500 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                    fill="none">
                                    <path
                                        d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                                        stroke="#e9ac2d" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div> */}
                    </div>
                    <OrderSummary />
                </div>
            </div>
        </Container>
    );
};

export default CartPage;
