export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { Resend } from "resend"

import OrderReceivedEmail from "@/emails/order-received-email"
import OrderCompletedEmail from "@/emails/order-completed-email"

import { updateOrderStatus } from '@/lib/sanity'

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
            await updateOrderStatus(paymentData.metadata.order.id, paymentData.reference, 'completed')

            console.log('Payment successful:', paymentData)

            // Send email notification to customer
            try {
                await resend.emails.send({
                    from: `DearFabrics.ng <${process.env.RESEND_FROM_EMAIL}>`,
                    to: [paymentData.customer.email],
                    subject: "Your Order is Completed",
                    react: OrderCompletedEmail({
                        customerName: paymentData.metadata.customer.name,
                        orderId: paymentData.metadata.order.id,
                        items: paymentData.metadata.order.line_items,
                        shipping: paymentData.metadata.shipping,
                        tax: paymentData.metadata.tax,
                        discount: paymentData.metadata.discount,
                        total: paymentData.amount / 100
                    })
                })
            } catch (error) {
                console.error("Failed to send email to customer:", error)
            }

            // Send email notification to admin
            try {
                await resend.emails.send({
                    from: `DearFabrics.ng <${process.env.RESEND_FROM_EMAIL}>`,
                    to: ["dearfabricsng@gmail.com"],
                    subject: "New Order Recieved",
                    react: OrderReceivedEmail({
                        orderId: paymentData.metadata.order.id,
                        reference: paymentData.reference,
                        customerName: paymentData.metadata.customer.name,
                        customerEmail: paymentData.metadata.customer.email,
                        customerPhone: paymentData.metadata.customer.phone,
                        customerAddress: paymentData.metadata.customer.address,
                        items: paymentData.metadata.order.line_items,
                        shipping: paymentData.metadata.shipping,
                        tax: paymentData.metadata.tax,
                        discount: paymentData.metadata.discount,
                        total: paymentData.amount / 100
                    })
                })
            } catch (error) {
                console.error("Failed to send email to admin:", error)
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