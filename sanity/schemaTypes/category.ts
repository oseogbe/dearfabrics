import { defineField, defineType } from "sanity"
import { client as sanityClient } from "../../lib/sanity"

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
            name: 'isTopLevel',
            title: 'Is it top-level?',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'orderNo',
            title: 'Order No.',
            type: 'number',
            hidden: ({ parent }) => !parent.isTopLevel,
            // validation: Rule => Rule.custom(async (orderNo, context) => {
            //     const document = context.document
            //     if (!document) {
            //         return true // Cannot perform validation if document is not available
            //     }

            //     // Use default values or fallback in case orderNo is not provided
            //     if (orderNo === undefined) {
            //         return true
            //     }

            //     const params = {
            //         orderNo,
            //         documentId: document._id || '' // Use an empty string as fallback
            //     }

            //     const query = `*[_type == "category" && orderNo == $orderNo && _id != $documentId]`
            //     const existing = await sanityClient.fetch(query, params)

            //     if (existing.length > 0) {
            //         return 'Order No. must be unique across all categories'
            //     }

            //     return true
            // }),
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