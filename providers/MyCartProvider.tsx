"use client"

import { ReactNode } from 'react'

import { CartProvider } from "use-shopping-cart"
import { loadStripe } from '@stripe/stripe-js'

const MyCartProvider = ({
    children
}: {
    children: ReactNode
}) => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
        throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    return (
        <CartProvider
            cartMode="checkout-session"
            currency="NGN"
            stripe={stripePromise as unknown as string}
            shouldPersist
        >
            <>{children}</>
        </CartProvider>
    )
}

export default MyCartProvider