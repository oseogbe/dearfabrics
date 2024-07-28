import { defineType, defineField, defineArrayMember } from 'sanity'
import { BasketIcon, ControlsIcon, TagIcon } from '@sanity/icons'
import { GenerateVariants } from '../components/GenerateVariants'

// tieing color to product image

const product = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: BasketIcon,
    groups: [
        {
            name: 'product',
            title: 'Product Information',
        },
        {
            name: 'media',
            title: 'Media',
        },
        {
            name: 'inventory',
            title: 'Inventory',
        },
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            group: 'product',
        }),
        defineField({
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            group: 'product',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'supplierCode',
            title: 'Supplier Code',
            type: 'string',
            group: 'product',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            group: 'product',
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
            group: 'product',
        }),
        defineField({
            name: 'oldPrice',
            title: 'Old Price (Optional)',
            type: 'number',
            group: 'product',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            group: 'product',
        }),
        defineField({
            name: 'priceId',
            title: 'Stripe Product Price Id',
            type: 'string',
            group: 'product',
        }),
        // defineField({
        //     name: 'quantity',
        //     title: 'Quantity',
        //     type: 'number',
        //     group: 'product',
        // }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            group: 'media',
        }),
        defineField({
            name: 'options',
            title: 'Options',
            type: 'array',
            group: 'inventory',
            of: [
                defineArrayMember({
                    name: 'option',
                    title: 'Option',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            description: 'Size, color, etc.',
                            title: 'Option Name',
                            type: 'string',
                        }),
                        defineField({
                            name: 'values',
                            title: 'Option Values',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    name: 'value',
                                    title: 'Value',
                                    type: 'string',
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'values',
                        },
                        prepare(selection) {
                            const { title, subtitle } = selection
                            const valuesString = Array.isArray(subtitle) ? subtitle.join(', ') : ''
                            return {
                                title: title,
                                subtitle: valuesString,
                                icon: ControlsIcon,
                            }
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'variants',
            title: 'Variants',
            group: 'inventory',
            type: 'array',
            components: { input: GenerateVariants },
            of: [
                defineArrayMember({
                    name: 'variant',
                    title: 'Variant',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'variantName',
                            title: 'Variant Name',
                            type: 'string',
                        }),
                        defineField({
                            name: 'options',
                            title: 'Variant Options',
                            description:
                                'Avoid editing these directly. They are generated from the product options. If you need to change them, edit the product options instead and generate a new set.',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    name: 'option',
                                    title: 'Option',
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'name',
                                            title: 'Name',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'value',
                                            title: 'Value',
                                            type: 'string',
                                        }),
                                    ],
                                    preview: {
                                        select: {
                                            title: 'name',
                                            subtitle: 'value',
                                        },
                                        prepare(selection) {
                                            const { title, subtitle } = selection
                                            return {
                                                title: `${title}: ${subtitle}`,
                                                icon: ControlsIcon,
                                            }
                                        },
                                    },
                                }),
                            ],
                        }),
                        defineField({
                            name: 'quantity',
                            title: 'Stock',
                            description: 'Set the quantity of available stock for this variant',
                            type: 'number',
                            initialValue: 0,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'variantName',
                            subtitle: 'quantity',
                        },
                        prepare(selection) {
                            const { title, subtitle } = selection
                            return {
                                title: title,
                                subtitle: subtitle !== null ? `Stock: ${subtitle}` : 'No stock info',
                                icon: TagIcon,
                            }
                        },
                    },
                }),
            ],
        }),
    ],
})

export default product
