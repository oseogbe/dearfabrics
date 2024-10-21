import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        const reference = searchParams.get('reference')

        if (!reference) {
            throw Error('Transaction reference is required')
        }

        const paystackUrl = `https://api.paystack.co/transaction/verify/${reference}`

        const response = await fetch(paystackUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        })

        const data = await response.json()

        if (!data.status) {
            return NextResponse.json(
                { message: 'Payment verification failed' },
                { status: 400 }
            )
        }

        return NextResponse.json(data)

    } catch (e) {
        return NextResponse.error()
    }
}