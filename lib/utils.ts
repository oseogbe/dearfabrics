import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  // if (!value) return ''
  // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
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