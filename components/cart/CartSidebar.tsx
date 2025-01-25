"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { useShoppingCart } from "use-shopping-cart"
import { motion, AnimatePresence } from "framer-motion"
import useOnClickOutside from "use-onclickoutside"

import useCartSidebar from "@/hooks/useCartSidebar"

import CartItem from "./CartItem"
import Button from "../Button"

import { FaLongArrowAltRight, FaRegSadTear } from "react-icons/fa"

const CartSidebar = () => {
    const cartSidebar = useCartSidebar()

    const { cartDetails, cartCount } = useShoppingCart()

    const router = useRouter()

    const sidebarRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(sidebarRef, () => cartSidebar.onClose())

    const goToCartPage = () => {
        cartSidebar.onClose()
        router.push('/cart')
    }

    const goToCheckoutPage = () => {
        cartSidebar.onClose()
        router.push('/checkout')
    }

    return (
        <>
            {cartSidebar.isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                ></div>
            )}
            <AnimatePresence>
                {cartSidebar.isOpen && (
                    <motion.div
                        ref={sidebarRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 right-0 h-full w-[300px] md:w-[360px] xl:w-[440px] bg-white p-4 xl:p-6 z-50 shadow-md"
                    >
                        <h3 className="font-bold xl:text-lg text-gray-900">My Shopping Cart ({cartCount})</h3>
                        {
                            cartCount === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-900">
                                    <motion.div
                                        animate={{ rotate: [-10, 10, -10] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        <FaRegSadTear size={28} />
                                    </motion.div>
                                    <p className="text-base md:text-lg mt-4">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col justify-between">
                                    <div className="flex flex-col overflow-y-auto scrollbar-hide gap-y-8 mt-8 xl:mt-12">
                                        {
                                            cartDetails && Object.keys(cartDetails).map(key => (
                                                <CartItem
                                                    key={cartDetails[key].id}
                                                    sku={cartDetails[key].id}
                                                />
                                            ))
                                        }
                                    </div>
                                    <div className="flex gap-4 my-4 xl:my-6">
                                        <Button
                                            label={`View Cart (${cartCount})`}
                                            type="secondary"
                                            onClick={goToCartPage}
                                        />
                                        <Button
                                            label="Checkout"
                                            icon={FaLongArrowAltRight}
                                            onClick={goToCheckoutPage}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default CartSidebar