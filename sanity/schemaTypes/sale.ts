import { defineField, defineType } from "sanity"
import { ClockIcon } from '@sanity/icons'

const sale = defineType({
    name: 'sale',
    title: 'Sales',
    type: 'document',
    icon: ClockIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'startDate',
            title: 'Start date',
            type: 'datetime',
            validation: Rule => Rule.required().min(new Date().toISOString())
        }),
        defineField({
            name: 'endDate',
            title: 'Closing date',
            type: 'datetime',
            validation: Rule => Rule.custom((endDate, context) => {
                const startDate = (context.document as { startDate?: string }).startDate
                if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
                    return 'End date must be after the start date'
                }
                return true
            }),
        }),
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            validation: Rule => Rule.unique(),
        })
    ]
})

export default sale