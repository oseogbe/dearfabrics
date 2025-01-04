import { defineField, defineType } from "sanity"
import { HashIcon } from '@sanity/icons'

const coupon = defineType({
    name: 'coupon',
    title: 'Coupons',
    type: 'document',
    icon: HashIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Internal name for the coupon',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'couponCode',
            title: 'Coupon Code',
            type: 'string',
            description: 'The code that customers will use to apply the discount',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'discountType',
            title: 'Discount Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Percent Off', value: 'percent_off' },
                    { title: 'Amount Off', value: 'amount_off' },
                ],
                layout: 'radio',
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'amountOff',
            title: 'Amount Off',
            type: 'number',
            description: 'The amount to subtract from the total, in cents (only for Amount Off type)',
            hidden: ({ parent }) => parent?.discountType !== 'amount_off',
            validation: Rule => Rule.custom((field, context) => {
                const discountType = (context.parent as { discountType?: string }).discountType
                if (discountType === 'amount_off' && !field) {
                    return 'Amount Off is required for Amount Off discount type'
                }
                return true
            }),
        }),
        defineField({
            name: 'percentOff',
            title: 'Percent Off',
            type: 'number',
            description: 'The percentage to subtract from the total (only for Percent Off type)',
            hidden: ({ parent }) => parent?.discountType !== 'percent_off',
            validation: Rule => Rule.custom((field, context) => {
                const discountType = (context.parent as { discountType?: string }).discountType
                if (discountType === 'percent_off' && !field) {
                    return 'Percent Off is required for Percent Off discount type'
                }
                if (field && (field <= 0 || field > 100)) {
                    return 'Percent Off must be between 1 and 100'
                }
                return true
            }),
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'string',
            options: {
                list: [
                    { title: 'Once', value: 'once' },
                    { title: 'Repeating', value: 'repeating' },
                    { title: 'Forever', value: 'forever' },
                ],
                layout: 'radio',
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'durationInMonths',
            title: 'Duration in Months',
            type: 'number',
            description: 'Number of months the coupon will apply (only for Repeating duration)',
            hidden: ({ parent }) => parent?.duration !== 'repeating',
            validation: Rule => Rule.custom((field, context) => {
                const duration = (context.parent as { duration?: string }).duration
                if (duration === 'repeating' && (!field || field <= 0)) {
                    return 'Duration in Months is required and must be greater than 0 for Repeating duration'
                }
                return true
            }),
        }),
        defineField({
            name: 'maxRedemptions',
            title: 'Max Redemptions',
            type: 'number',
            description: 'Maximum number of times this coupon can be redeemed in total',
            validation: Rule => Rule.min(0),
        }),
        defineField({
            name: 'useCount',
            title: 'Usage Count',
            type: 'number',
            description: 'Number of times the coupon has been used',
            validation: Rule => Rule.min(0),
            readOnly: true,
        }),
        defineField({
            name: 'redeemBy',
            title: 'Redeem By',
            type: 'datetime',
            description: 'The date after which the coupon can no longer be redeemed',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'couponCode',
            discountType: 'discountType',
            amountOff: 'amountOff',
            percentOff: 'percentOff',
        },
        prepare(selection) {
            const { title, subtitle, discountType, amountOff, percentOff } = selection
            const discount =
                discountType === 'amount_off'
                    ? `$${(amountOff / 100).toFixed(2)} off`
                    : `${percentOff}% off`
            return {
                title: `${title} - ${discount}`,
                subtitle,
            }
        },
    },
})

export default coupon
