import { NextRequest, NextResponse } from "next/server"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

type CouponType = {
    id: string
    name: string
    duration: string | number
    max_redemptions: number
    redeem_by: number | null
    amount_off?: number
    currency?: string
    percent_off?: number
    duration_in_months?: number
}

export async function POST(request: NextRequest) {
    try {
        const { coupon } = await request.json()

        const couponData: CouponType = {
            id: coupon.couponCode,
            name: coupon.name,
            duration: coupon.duration,
            max_redemptions: coupon.maxRedemptions || null,
            redeem_by: coupon.redeemBy ? Math.floor(new Date(coupon.redeemBy).getTime() / 1000) : null,
        }

        if (coupon.discountType === 'amount_off') {
            couponData.amount_off = coupon.amountOff
            couponData.currency = 'usd'
        } else if (coupon.discountType === 'percent_off') {
            couponData.percent_off = coupon.percentOff
        }

        if (coupon.duration === 'repeating') {
            couponData.duration_in_months = coupon.durationInMonths
        }

        const stripeCoupon = await stripe.coupons.create(couponData)
        return stripeCoupon

    } catch (e) {
        //  NextResponse.json({ error: "An error occurred." }, { status: 500 })
        return NextResponse.error()
    }
}
