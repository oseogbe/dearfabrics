import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { validateCartItems } from 'use-shopping-cart/utilities'

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
    try {
        const { cartItems } = await request.json()
        console.log('Server', cartItems)
        // const line_items = validateCartItems(inventory, cartItems)

        type CartItem = {
            name: string
            price: number
            quantity: number
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: cartItems.map((item: CartItem) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            success_url: `${headers().get('origin')}/success`,
            cancel_url: `${headers().get('origin')}/cancel`,
        })

        console.log({ sessionId: session.id })

        return NextResponse.json({ sessionId: session.id })
    } catch (e) {

    }
}