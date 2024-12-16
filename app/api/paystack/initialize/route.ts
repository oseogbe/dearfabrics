import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { email, amount, order_id } = await request.json()

        const paystackUrl = 'https://api.paystack.co/transaction/initialize'

        const response = await fetch(paystackUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                amount,
                callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback`,
                metadata: {
                    order_id
                }
            })
        })

        const data = await response.json()

        return NextResponse.json(data)

    } catch (e) {
        return NextResponse.error()
    }
}