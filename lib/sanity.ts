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
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  noStore();

  try {
    const query = `*[_type == 'category'] {
      _id,
      name,
      "slug": slug.current,
      subCategories[]->{
        _id,
        name,
        "slug": slug.current,
      }
    }`
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

async function fetchProductsByCategory(categorySlug: string) {
  noStore();

  try {
    const query = `*[_type == 'product' && references(*[_type == 'category' && slug.current == ${categorySlug}]._id)] {
      _id,
      name,
      "images": images[].asset->url,
      oldPrice,
      price,
      "slug": slug.current,
      inStock,
    }`
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

async function fetchSingleProduct(productSlug: string) {
  noStore();

  try {
    const query = `*[_type == 'product' && slug.current == ${productSlug}][0] {
      _id,
      name,
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
      options,
      variants[]{
          variantName,
          quantity,
          options[]{
            name,
            value
          }
      },
      relatedProducts[]->{
        _id,
        name,
        images,
        "slug": slug.current,
      }
    }`
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export {
  urlFor,
  fetchCategories,
  fetchProductsByCategory,
  fetchSingleProduct
}