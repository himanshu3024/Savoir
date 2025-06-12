import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import LiveChat from "@/components/live-chat"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SAVOIR - Luxury E-commerce Platform",
  description: "Discover extraordinary products that define luxury, innovation, and timeless elegance",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <LiveChat />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
