import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  // if (!value) return ''
  // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

export function percentageDiscount(price: number, discountPrice: number) {
  if (discountPrice) {
    return Math.round((price - discountPrice) / price * 100)
  }
  return 0
}