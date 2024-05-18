import type { Metadata } from "next"
import localFont from "next/font/local"
import { Toaster } from "sonner"

import ClientOnly from "@/components/ClientOnly"
import ComingSoon from "@/components/ComingSoon"
import Navbar from "@/components/Navbar"
import CartSidebar from "@/components/cart/CartSidebar"
import Footer from "@/components/Footer"

import "./globals.css"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const stillDeveloping = true

  return (
    <html lang="en" className={`${metropolis.variable} font-avenir`}>
      <body>
        {
          !stillDeveloping && (
            <>
              <ClientOnly>
                <Navbar />
                <CartSidebar />
                <Toaster position="top-right" richColors expand />
              </ClientOnly>
              <div className="mt-[129px]">
                {children}
              </div>
              <ClientOnly>
                <Footer />
              </ClientOnly>
            </>
          )}

        {
          stillDeveloping && (
            <ClientOnly>
              <Toaster position="bottom-center" richColors expand />
              <div className="relative h-screen bg-black">
                <ComingSoon />
              </div>
            </ClientOnly>
          )
        }
      </body>
    </html>
  )
}
