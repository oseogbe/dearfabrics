import { defineField, defineType } from "sanity"
import { NumberIcon } from '@sanity/icons'

const rate = defineType({
    name: 'rate',
    title: 'Rates',
    type: 'document',
    icon: NumberIcon,
    fields: [
        defineField({
            name: 'locations',
            title: 'Locations',
            description: 'Locations for the shipping rate',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Abia', value: 'Abia' },
                    { title: 'Adamawa', value: 'Adamawa' },
                    { title: 'Akwa Ibom', value: 'Akwa Ibom' },
                    { title: 'Anambra', value: 'Anambra' },
                    { title: 'Bauchi', value: 'Bauchi' },
                    { title: 'Bayelsa', value: 'Bayelsa' },
                    { title: 'Benue', value: 'Benue' },
                    { title: 'Borno', value: 'Borno' },
                    { title: 'Cross River', value: 'Cross River' },
                    { title: 'Delta', value: 'Delta' },
                    { title: 'Ebonyi', value: 'Ebonyi' },
                    { title: 'Edo', value: 'Edo' },
                    { title: 'Ekiti', value: 'Ekiti' },
                    { title: 'Enugu', value: 'Enugu' },
                    { title: 'Gombe', value: 'Gombe' },
                    { title: 'Imo', value: 'Imo' },
                    { title: 'Jigawa', value: 'Jigawa' },
                    { title: 'Kaduna', value: 'Kaduna' },
                    { title: 'Kano', value: 'Kano' },
                    { title: 'Katsina', value: 'Katsina' },
                    { title: 'Kebbi', value: 'Kebbi' },
                    { title: 'Kogi', value: 'Kogi' },
                    { title: 'Kwara', value: 'Kwara' },
                    { title: 'Lagos', value: 'Lagos' },
                    { title: 'Nasarawa', value: 'Nasarawa' },
                    { title: 'Niger', value: 'Niger' },
                    { title: 'Ogun', value: 'Ogun' },
                    { title: 'Ondo', value: 'Ondo' },
                    { title: 'Osun', value: 'Osun' },
                    { title: 'Oyo', value: 'Oyo' },
                    { title: 'Plateau', value: 'Plateau' },
                    { title: 'Rivers', value: 'Rivers' },
                    { title: 'Sokoto', value: 'Sokoto' },
                    { title: 'Taraba', value: 'Taraba' },
                    { title: 'Yobe', value: 'Yobe' },
                    { title: 'Zamfara', value: 'Zamfara' },
                    { title: 'Abuja Federal Capital Territory', value: 'Abuja Federal Capital Territory' }
                ]
            }
        }),
        defineField({
            name: 'shippingRate',
            title: 'Shipping Rate',
            type: 'number',
            description: 'Shipping charge for the selected locations'
        }),
        defineField({
            name: 'taxRate',
            title: 'Tax Rate',
            type: 'number',
            description: 'Tax percentage value'
        }),
        defineField({
            name: 'transitTime',
            title: 'Transit Time',
            type: 'string',
            description: 'Transit time (working days)'
        })
    ],
    preview: {
        select: {
            title: 'locations',
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: title.join(', '),
            }
        },
    }
})

export default rate
