export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { updateOrderStatus } from '@/lib/sanity'
import { Resend } from "resend"
import OrderCompletedEmail from "@/emails/order-completed-email"

const resend = new Resend(process.env.RESEND_API_KEY)

// POST handler for webhook
export async function POST(req: NextRequest) {
    const secret = process.env.PAYSTACK_SECRET_KEY
    const body = await req.json() // Read request body

    // Paystack signature verification (for security)
    const hash = crypto
        .createHmac('sha512', secret!)
        .update(JSON.stringify(body))
        .digest('hex')

    // Verify the signature sent from Paystack
    if (hash === req.headers.get('x-paystack-signature')) {
        // Handle the event - e.g., transaction update, payment verification, etc.
        const event = body

        if (event.event === 'charge.success') {
            // Payment was successful
            const paymentData = event.data

            // Process payment data (e.g., save to the database or mark order as paid)
            await updateOrderStatus(paymentData.metadata.order_id, paymentData.reference, 'completed')

            console.log('Payment successful:', paymentData)

            // Send email notification
            try {
                await resend.emails.send({
                    from: `DearFabrics.ng <${process.env.RESEND_FROM_EMAIL}>`,
                    to: ["dearfabricsng@gmail.com"],
                    subject: "New Order Completed",
                    react: OrderCompletedEmail({ orderId: paymentData.metadata.order_id, reference: paymentData.reference })
                })
            } catch (error) {
                console.error("Failed to send email:", error)
            }

            // Respond with a success acknowledgment
            return NextResponse.json({ status: 'success' })
        } else {
            // Handle other events like charge.failed, etc.
            return NextResponse.json({ status: 'unhandled event type' }, { status: 400 })
        }
    } else {
        // Invalid signature (possible security issue)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
}