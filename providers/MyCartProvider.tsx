"use client"

import { ReactNode } from 'react'

import { CartProvider } from "use-shopping-cart"
// import { loadStripe } from '@stripe/stripe-js'

const MyCartProvider = ({
    children
}: {
    children: ReactNode
}) => {
    // const stripePromise = loadStripe(process.env.STRIPE_API_KEY as unknown as string)

    return (
        <CartProvider
            cartMode="checkout-session"
            currency="NGN"
            stripe={process.env.STRIPE_API_KEY as unknown as string}
            shouldPersist
        >
            <>{children}</>
        </CartProvider>
    )
}

export default MyCartProvider