import { unstable_noStore as noStore } from "next/cache"

import { createClient } from "next-sanity"
import ImageURLBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const client = createClient({
  projectId: "4e9k5q7y",
  dataset: "production",
  apiVersion: "v1",
  useCdn: true
})

const imgBuilder = ImageURLBuilder(client)

function urlFor(source: SanityImageSource) {
  return imgBuilder.image(source)
}

async function fetchCategories() {
  try {
    const query = `*[_type == "category" && isTopLevel] | order(orderNo) {
      _id,
      name,
      "slug": slug.current,
      "categories": subCategories[]->{
        name,
        "slug": slug.current
      }
    }`
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch categories.')
  }
}

// async function fetchProductsByCategory(categorySlug: string) {
//   // Add noStore() here prevent the response from being cached.
//   // This is equivalent to in fetch(..., {cache: 'no-store'}).

//   noStore()

//   try {
//     const query = `*[_type == 'product' && references(*[_type == 'category' && slug.current == '${categorySlug}']._id)] {
//       name,
//       "slug": slug.current,
//       "images": images[].asset->url,
//       oldPrice,
//       price,
//       inStock,
//       "sizes": options[name=='sizes'].values[],
//       "colors": options[name=='colors'].values[]
//     }`
//     const data = await client.fetch(query)
//     return data
//   } catch (error) {
//     console.error('Database Error:', error)
//     throw new Error('Failed to fetch products.')
//   }
// }


async function fetchProductsByCategory(categorySlug: string, page: number, pageSize: number) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore()

  const skip = (page - 1) * pageSize

  try {
    const productsQuery = `*[_type == 'product' && references(*[_type == 'category' && slug.current == '${categorySlug}']._id)] 
    | order(_created_at desc) [${skip}...${skip + pageSize}] {
      _id,
      name,
      "slug": slug.current,
      "images": images[].asset->url,
      oldPrice,
      price,
      inStock,
      "sizes": options[name=='sizes'].values[],
      "colors": options[name=='colors'].values[]
    }`
    const products = await client.fetch(productsQuery)

    const countQuery = `count(*[_type == 'product' && references(*[_type == 'category' && slug.current == '${categorySlug}']._id)])`
    const total = await client.fetch(countQuery)

    return {
      products,
      total
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch products.')
  }
}

async function fetchSingleProduct(productSlug: string) {
  noStore()

  try {
    const query = `*[_type == 'product' && slug.current == '${productSlug}'][0] {
      _id,
      name,
      "slug": slug.current,
      description,
      "images": images[].asset->url,
      oldPrice,
      price,
      price_id,
      "slug": slug.current,
      "categories": categories[]->{
        name,
        "slug": slug.current
      },
      inStock,
      delivery,
      "sizes": options[name=='Size'].values[],
      "colors": options[name=='Colour'].values[],
      relatedProducts[]->{
        _id,
        name,
        "slug": slug.current,
        oldPrice,
        price,
        images,
        "sizes": options[name=='Size'].values[],
        "colors": options[name=='Colour'].values[]
      }
    }`
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch product.')
  }
}

async function fetchSaleData(sale: string) {
  noStore()

  try {
    const query = `*[_type == 'sale' && name == '${sale}'][0] {
      _id,
      name,
      startDate,
      endDate,
      "products": products[]->{
        name,
        "slug": slug.current,
        "images": images[].asset->url,
        oldPrice,
        price,
        inStock,
        "sizes": options[name=='sizes'].values[],
        "colors": options[name=='colors'].values[]
      }
    }`
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch sale data.')
  }
}

export {
  urlFor,
  fetchCategories,
  fetchProductsByCategory,
  fetchSingleProduct,
  fetchSaleData
}