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
            validation: Rule => Rule.custom((startDate, context) => {
                const currentDate = new Date()

                const existingStartDate = (context.document as { startDate?: string }).startDate

                // If the startDate is being updated and it's in the past, allow it
                if (existingStartDate && startDate && startDate !== existingStartDate && new Date(startDate) < currentDate) {
                    return 'Start date cannot be in the past unless it\'s not being updated'
                }

                // If there's no existing startDate (on initial creation), it must be at least the current date
                if (!existingStartDate && startDate && new Date(startDate) < currentDate) {
                    return 'Start date must be in the future'
                }

                return true
            })
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