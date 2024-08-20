"use client"

import { ReactNode } from 'react'

import { CartProvider } from "use-shopping-cart"
// import { loadStripe } from '@stripe/stripe-js'

const MyCartProvider = ({
    children
}: {
    children: ReactNode
}) => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
        throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
    }

    // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    return (
        // <CartProvider
        //     mode="payment"
        //     cartMode="client-only"
        //     stripe={stripePromise as unknown as string}
        //     successUrl='success'
        //     cancelUrl='error'
        //     language='en-UK'
        //     currency="NGN"
        //     billingAddressCollection={true}
        //     shouldPersist={true}
        // >
        <CartProvider
            cartMode="checkout-session"
            currency="USD"
            stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
            shouldPersist
        >
            <>{children}</>
        </CartProvider>
    )
}

export default MyCartProvider