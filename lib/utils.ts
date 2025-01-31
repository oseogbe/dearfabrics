import { ProductType } from "@/typings"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "use-shopping-cart/core"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)

  // Get day, month, year, and weekday
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  const weekday = date.toLocaleString('en-US', { weekday: 'short' })

  // Add ordinal suffix to the day
  const ordinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  return `${weekday}, ${day}${ordinalSuffix(day)} ${month}, ${year}`
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0, // Don't display kobo (decimals)
    useGrouping: true,
  }).format(amount)
}

export function getProductPrices(product: ProductType) {
  const minOldPrice = Math.min(...(product.variants.map(v => v.oldPrice || 0)))
  const maxOldPrice = Math.max(...(product.variants.map(v => v.oldPrice || 0)))
  const minPrice = Math.min(...(product.variants.map(v => v.price)))
  const maxPrice = Math.max(...(product.variants.map(v => v.price)))

  return { minOldPrice, maxOldPrice, minPrice, maxPrice }
}

export function percentageDiscount(oldPrice: number, price: number) {
  if (price) {
    return Math.round((oldPrice - price) / oldPrice * 100)
  }
  return 0
}

export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let randomString = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString.toLowerCase()
}

export function setCartItem(product: Product, selectedColor: string | undefined, selectedSize: string | undefined, quantity: number) {
  return {
    item: {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      currency: "NGN",
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      categories: product.categories,
      inStock: product.inStock,
      shipsIn: product.shipsIn,
    },
    count: quantity,
  }
}

export function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase() // Base36 encoding of timestamp
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase() // Random 6-character string
  return `DFNG-${timestamp}-${randomString}` // Example: DFNG-2PT7D1-A1B2C3
}