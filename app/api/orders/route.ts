import { NextRequest, NextResponse } from "next/server"
import { createOrder } from "@/lib/sanity"

export async function POST(request: NextRequest) {
    try {
        const orderData = await request.json()

        const result = await createOrder(orderData)

        return NextResponse.json({ success: true, result }, { status: 201 })

    } catch (e) {
        return NextResponse.error()
    }
}