import { defineType, defineField, defineArrayMember } from 'sanity'
import { BasketIcon, ControlsIcon, TagIcon } from '@sanity/icons'
import { GenerateVariants } from '../components/GenerateVariants'
import ColorPickerInput from '../../components/ColorPickerInput'

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
        {
            name: 'related',
            title: 'Related Products',
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
            name: 'slug',
            title: 'Slug',
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
            type: 'text',
            group: 'product',
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
            group: 'product',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'oldPrice',
            title: 'Old Price (Optional)',
            description: 'Old Price should be in naira',
            type: 'number',
            group: 'product',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            description: 'Price should be in naira',
            type: 'number',
            group: 'product',
        }),
        defineField({
            name: 'inStock',
            title: 'In Stock or Dropshipped?',
            type: 'boolean',
            description: 'Indicate whether the product is in stock (on) or dropshipped (off)',
            options: {
                layout: 'switch', // Optional: 'switch' is another option for boolean
            },
            initialValue: false, // Set the default value
            group: 'product',
        }),
        defineField({
            name: 'delivery',
            title: 'Delivery',
            type: 'string',
            description: 'ex. item ships within 8 days',
            hidden: ({ parent }) => parent.inStock === true,
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
        // defineField({
        //     name: 'color',
        //     title: 'Colours',
        //     type: 'array',
        //     of: [
        //         defineArrayMember({
        //             name: 'value',
        //             title: 'Value',
        //             type: 'string',
        //             components: {
        //                 input: ColorPickerInput
        //             }
        //         }),
        //     ],
        //     group: 'inventory',
        // }),
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
                            description: 'sizes, colors, etc.',
                            title: 'Option Name',
                            type: 'string',
                        }),
                        defineField({
                            name: 'values',
                            title: 'Option Values',
                            type: 'array',
                            of: [{ type: 'string' }],
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
            type: 'array',
            group: 'inventory',
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
        defineField({
            name: 'relatedProducts',
            title: 'Related Products',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'product' } }],
            description: 'Select related products for this product',
            group: 'related'
        }),
    ],
})

export default product
