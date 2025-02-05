import { unstable_noStore as noStore } from "next/cache"

import { createClient, SanityDocument } from "next-sanity"
import ImageURLBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { OrderData, Sale } from "@/typings"
import { v4 as uuidv4 } from 'uuid'

export const client = createClient({
  projectId: "4e9k5q7y",
  dataset: "production",
  apiVersion: "v1",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false, // Disable CDN for write operations
})

const imgBuilder = ImageURLBuilder(client)

function urlFor(source: SanityImageSource) {
  return imgBuilder.image(source)
}

async function fetchHeroSlides() {
  try {
    const query = `*[_type == "hero"] {
      _id,
      text,
      subtext,
      category,
      image,
      mobileImage,
      link
    }`
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch hero slides.')
  }
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

async function fetchSubcategories(slug: string) {
  try {
    const query = `*[_type == "category" && slug.current == $slug][0] {
      subCategories[]->{
        _id,
        name,
        slug
      }
    }`

    const result = await client.fetch(query, { slug })
    return result?.subCategories
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch subcategories.')
  }

}

async function fetchProductsByCategory(category: string, subcategory: string, page: number, pageSize: number, minPrice?: number, maxPrice?: number) {
  noStore()

  const skip = (page - 1) * pageSize

  try {
    const priceFilter = minPrice !== undefined && maxPrice !== undefined ? `&& variants[price >= ${minPrice} && price <= ${maxPrice}]` : ''
    const productsQuery = `*[_type == "product" && references(*[_type == "category" && isTopLevel == true && 
    slug.current == '${category}']._id) && references(*[_type == "category" && slug.current == '${subcategory}']._id) ${priceFilter}] 
    | order(_created_at desc) [${skip}...${skip + pageSize}] {
      "id": _id,
      name,
      description,
      "slug": slug.current,
      "categories": categories[]->slug.current,
      "images": images[].asset->url,
      "currency": "NGN",
      inStock,
      "sizes": options[name=='sizes'].values[],
      "colors": options[name=='colors'].values[],
      variants[] {
        "name": variantName,
        price,
        quantity,
        options[] {
          name,
          value
        }
      }
    }`
    const products = await client.fetch(productsQuery)

    const countQuery = `count(*[_type == "product" && references(*[_type == "category" && isTopLevel == true && 
    slug.current == '${category}']._id) && references(*[_type == "category" && slug.current == '${subcategory}']._id) ${priceFilter}])`
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
    const query = `*[_type == 'product' && slug.current == $productSlug][0] {
      "id": _id,
      name,
      "slug": slug.current,
      description,
      "images": images[].asset->url,
      "currency": "NGN",
      "categories": categories[]->slug.current,
      inStock,
      "sizes": options[name=='sizes'].values[],
      "colors": options[name=='colors'].values[],
      variants[] {
        "name": variantName,
        price,
        quantity,
        options[] {
          name,
          value
        }
      },
      relatedProducts[]->{
        _id,
        name,
        "slug": slug.current,
        "categories": categories[]->slug.current,
        "images": images[].asset->url,
        "sizes": options[name=='sizes'].values[],
        "colors": options[name=='colors'].values[],
        variants[] {
          "name": variantName,
          oldPrice,
          price,
          quantity
        },
      }
    }`
    const data = await client.fetch(query, { productSlug })
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch product.')
  }
}

async function searchProducts(term: string, page: number = 1, limit: number = 12) {
  noStore()

  const offset = (page - 1) * limit

  try {
    const query = `*[_type == "product" && name match $term] | order(name asc) [$offset...$offset+$limit] {
      "id": _id,
      name,
      description,
      "slug": slug.current,
      "categories": categories[]->slug.current,
      "images": images[].asset->url,
      "currency": "NGN",
      inStock,
      "sizes": options[name=='sizes'].values[],
      "colors": options[name=='colors'].values[],
      variants[] {
        "name": variantName,
        price,
        quantity,
        options[] {
          name,
          value
        }
      }
    }`
    const params = { term: `*${term}*`, offset, limit }
    const products = await client.fetch(query, params)

    const countQuery = `count(*[_type == "product" && name match $term] | order(name asc))`
    const total = await client.fetch(countQuery, params)

    return {
      products,
      total
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch products.')
  }
}

async function fetchSales(): Promise<Sale[]> {
  noStore()

  try {
    const currentDate = new Date().toISOString()
    const query = `*[_type == 'sale' && startDate <= $currentDate && endDate >= $currentDate] {
      "id": _id,
      name,
      startDate,
      endDate,
      "products": products[]->{
        "id": _id,
        name,
        "slug": slug.current,
        description,
        "images": images[].asset->url,
        "currency": "NGN",
        "categories": categories[]->slug.current,
        inStock,
        "sizes": options[name=='sizes'].values[],
        "colors": options[name=='colors'].values[],
        variants[] {
          "name": variantName,
          oldPrice,
          price,
          quantity
        },
      }
    }`
    const data = await client.fetch(query, { currentDate })
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch sales data.')
  }
}

async function fetchRates(selectedState: string) {
  try {
    const query = `*[_type == 'rate'] {
      locations,
      shippingRate,
      taxRate,
      transitTime
    }`
    const rates = await client.fetch(query)
    const data = rates.find((rate: SanityDocument) => rate.locations.includes(selectedState))
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch rate data.')
  }
}

async function getOrder(orderId: string) {
  try {
    const query = `*[_type == "order" && id == $orderId][0] {
      ...,
      items[]{
        ...,
        product->{
          'id': _id,
          name,
          slug,
          price,
          oldPrice,
          description,
          images
        }
      }
    }`
    const order = await client.fetch(query, { orderId })
    return order
  } catch (error) {
    console.error('Error retrieving order:', error)
    throw error
  }
}

async function createOrder(orderData: OrderData) {
  try {
    const order = {
      _type: 'order',
      id: orderData.id,
      customerName: orderData.customerName,
      email: orderData.email,
      billingAddress: orderData.billingAddress,
      shippingAddress: orderData.shippingAddress,
      phone: orderData.phone,
      items: orderData.items.map(item => ({
        _type: 'orderItem',
        _key: uuidv4(),
        product: {
          _type: 'reference',
          _ref: item.productId,
        },
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      discount: orderData.discount,
      total: orderData.total,
      status: 'pending',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    }

    const result = await client.create(order)
    return result
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

async function updateOrderStatus(orderId: string, paymentRef: string, newStatus: string) {
  try {
    const currentTime = new Date().toISOString()

    const order = await client.fetch(`*[_type == "order" && id == $orderId][0]`, { orderId })

    if (!order) {
      throw new Error(`Order with id ${orderId} not found`)
    }

    const result = await client.patch(order._id).set({
      paymentId: paymentRef,
      status: newStatus,
      updated: currentTime
    }).commit()
    return result
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

export {
  urlFor,
  fetchHeroSlides,
  fetchCategories,
  fetchSubcategories,
  fetchProductsByCategory,
  fetchSingleProduct,
  searchProducts,
  fetchSales,
  fetchRates,
  getOrder,
  createOrder,
  updateOrderStatus
}