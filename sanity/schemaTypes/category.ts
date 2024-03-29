import { defineField, defineType } from "sanity"

const category = defineType({
    name: 'category',
    title: 'Categories',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
            },
        }),
        defineField({
            name: 'subCategories',
            title: 'Sub-Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: Rule => Rule.unique(),
        })
    ]
})

export default category