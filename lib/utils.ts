import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "use-shopping-cart/core"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0, // Don't display kobo (decimals)
    useGrouping: true,
  }).format(amount)
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

export function setCartItem(product: Product, selectedColor: string, selectedSize: string | undefined, quantity: number) {
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
  };
}