import { defineField, defineType } from "sanity"
import { ImagesIcon } from '@sanity/icons'

const hero = defineType({
    name: 'hero',
    title: 'Hero Slides',
    type: 'document',
    icon: ImagesIcon,
    fields: [
        defineField({
            name: 'text',
            title: 'Text',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subtext',
            title: 'Subtext',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'mobileImage',
            title: 'Mobile Image',
            type: 'image',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
    ]
})

export default hero