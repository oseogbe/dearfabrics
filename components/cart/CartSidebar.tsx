"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useOnClickOutside from "use-onclickoutside"
import { FaLongArrowAltRight, FaRegSadTear } from "react-icons/fa"

import useCartSidebar from "@/hooks/useCartSidebar"

import CartItem from "./CartItem"
import Button from "../Button"

const CartSidebar = () => {
    const cartSidebar = useCartSidebar()

    const cartItems = [
        {
            name: 'Peruvian Gold Lace with Light Net',
            price: 100000,
            quantity: 1,
            image: '/img/products/fabric-1.png'
        },
        {
            name: 'Ankara with Pattern',
            price: 25000,
            quantity: 2,
            image: '/img/products/fabric-2.png'
        },
        {
            name: 'George Fabric',
            price: 65000,
            quantity: 1,
            image: '/img/products/fabric-3.png'
        },
        {
            name: 'Aso-oke Fabric',
            price: 100000,
            quantity: 1,
            image: '/img/products/fabric-4.png'
        },
        {
            name: 'Aso-oke Fabric',
            price: 120000,
            quantity: 2,
            image: '/img/products/fabric-5.png'
        },
        {
            name: 'Blue Ankara Print',
            price: 65000,
            quantity: 1,
            image: '/img/products/fabric-6.png'
        },
    ]

    const sidebarRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(sidebarRef, () => cartSidebar.onClose())

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
                        <h3 className="font-bold xl:text-lg">My Shopping Cart ({cartItems.length})</h3>
                        {
                            cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: [-10, 10, -10] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        <FaRegSadTear size={28} />
                                    </motion.div>
                                    <p className="text-lg mt-4">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col justify-between">
                                    <div className="flex flex-col overflow-y-auto scrollbar-hide gap-y-8 mt-8 xl:mt-12">
                                        {
                                            cartItems.map((item, i) => (
                                                <CartItem
                                                    key={i}
                                                    name={item.name}
                                                    price={item.price}
                                                    quantity={item.quantity}
                                                    image={item.image}
                                                />
                                            ))
                                        }
                                    </div>
                                    <div className="flex gap-4 my-4 xl:my-6">
                                        <Button
                                            label={`View Cart (${cartItems.length})`}
                                            type="secondary"
                                            onClick={() => { }}
                                        />
                                        <Button
                                            label="Checkout"
                                            icon={FaLongArrowAltRight}
                                            onClick={() => { }}
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