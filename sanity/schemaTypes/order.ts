import { defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
    name: 'order',
    title: 'Orders',
    type: 'document',
    icon: PackageIcon,
    fields: [
        {
            name: 'id',
            title: 'Order ID',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'paymentId',
            title: 'Payment Reference (Paystack)',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'customerName',
            title: 'Customer Name',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'billingAddress',
            title: 'Billing Address',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'shippingAddress',
            title: 'Shipping Address',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'orderItem' }],
            readOnly: true,
        },
        {
            name: 'total',
            title: 'Total (₦)',
            type: 'number',
            readOnly: true,
        },
        {
            name: 'shipping',
            title: 'Shipping Charge (₦)',
            type: 'number',
            readOnly: true,
        },
        {
            name: 'tax',
            title: 'Tax Charge (₦)',
            type: 'number',
            readOnly: true,
        },
        {
            name: 'discount',
            title: 'Discount (₦)',
            type: 'number',
            readOnly: true,
        },
        {
            name: 'grandTotal',
            title: 'Amount Paid (₦)',
            type: 'number',
            readOnly: true,
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Completed', value: 'completed' },
                    { title: 'Failed', value: 'failed' },
                ],
            },
            initialValue: 'pending',
            readOnly: true,
        },
        {
            name: 'created',
            title: 'Created Date',
            type: 'datetime',
            readOnly: true,
        },
        {
            name: 'updated',
            title: 'Updated Date',
            type: 'datetime',
            readOnly: true,
        },
    ],
})


export const orderItem = {
    name: 'orderItem',
    title: 'Order Item',
    type: 'object',
    fields: [
        {
            name: 'product',
            title: 'Product',
            type: 'reference',
            to: [{ type: 'product' }],
        },
        {
            name: 'size',
            title: 'Size',
            type: 'string',
        },
        {
            name: 'color',
            title: 'Color',
            type: 'string',
        },
        {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
    ],
    preview: {
        select: {
            productName: 'product.name',
            quantity: 'quantity',
            color: 'color',
            size: 'size',
        },
        prepare({ productName, quantity, color, size }: { productName: string, quantity: number, color: string, size: string }) {
            return {
                title: `${productName || 'Unknown Product'} (${quantity || 0})`,
                subtitle: `${color || 'No color selected'}, ${size || 'No size selected'}`,
            }
        },
    },
}