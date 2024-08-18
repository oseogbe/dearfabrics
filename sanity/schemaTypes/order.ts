import { defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
    name: 'order',
    title: 'Orders',
    type: 'document',
    icon: PackageIcon,
    fields: [
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
            name: 'address',
            title: 'Address',
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
            title: 'Total',
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
                ],
            },
            initialValue: 'pending',
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
}