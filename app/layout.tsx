import type { Metadata } from "next"
import localFont from "next/font/local"

import MyCartProvider from "@/providers/MyCartProvider"

import Navbar from "@/components/Navbar"
import CartSidebar from "@/components/cart/CartSidebar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

import { fetchCategories } from "@/lib/sanity"

export const metadata: Metadata = {
  title: "DearFabrics.ng",
  description: "...your fabrics and jewelry brand",
}

const metropolis = localFont({
  src: [
    {
      path: '../fonts/Metropolis/Metropolis-Thin.otf',
      weight: '100'
    },
    {
      path: '../fonts/Metropolis/Metropolis-ExtraLight.otf',
      weight: '200'
    },
    {
      path: '../fonts/Metropolis/Metropolis-Light.otf',
      weight: '300'
    },
    {
      path: '../fonts/Metropolis/Metropolis-Regular.otf',
      weight: '400'
    },
    {
      path: '../fonts/Metropolis/Metropolis-Medium.otf',
      weight: '500'
    },
    {
      path: '../fonts/Metropolis/Metropolis-SemiBold.otf',
      weight: '600'
    },
    {
      path: '../fonts/Metropolis/Metropolis-Bold.otf',
      weight: '700'
    },
    {
      path: '../fonts/Metropolis/Metropolis-ExtraBold.otf',
      weight: '800'
    },
    {
      path: '../fonts/Metropolis/Metropolis-Black.otf',
      weight: '900'
    },
  ],
  variable: '--font-metropolis'
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const navItems = await fetchCategories()

  return (
    <html lang="en" className={`${metropolis.variable} font-avenir`}>
      <head>
        <link rel="icon" href="/img/dfng-favicon.png" />
      </head>
      <body>
        <MyCartProvider>
          <Navbar menuItems={navItems} />
          <CartSidebar />
          {/* <Toaster position="top-right" richColors expand /> */}
          <Toaster />
          <div className="mt-[129px]">
            {children}
          </div>
          <Footer />
        </MyCartProvider>
      </body>
    </html>
  )
}
