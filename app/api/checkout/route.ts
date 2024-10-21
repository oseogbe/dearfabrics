import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { validateCartItems } from 'use-shopping-cart/utilities'

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
    try {
        const { cartItems, shipping, tax, discount } = await request.json()
        // const line_items = validateCartItems(inventory, cartItems)

        type CartItem = {
            name: string
            price: number
            quantity: number
        }

        // create an order?

        const line_items = cartItems.map((item: CartItem) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        if (shipping && shipping > 0) {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Shipping Fee',
                    },
                    unit_amount: shipping * 100,
                },
                quantity: 1,
            })
        }

        if (tax && tax > 0) {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Tax',
                    },
                    unit_amount: tax * 100,
                },
                quantity: 1,
            })
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items,
            discounts: [],
            success_url: `${headers().get('origin')}/order/hfjkjukkjjbjk`,
            cancel_url: `${headers().get('origin')}/checkout`,
        })

        return NextResponse.json({ sessionId: session.id })
    } catch (e) {
        //  NextResponse.json({ error: "An error occurred." }, { status: 500 })
        return NextResponse.error()
    }
}