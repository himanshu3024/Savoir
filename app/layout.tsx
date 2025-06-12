import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import LiveChat from "@/components/live-chat"
<<<<<<< HEAD
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
=======
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd

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
<<<<<<< HEAD
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <LiveChat />
          </WishlistProvider>
        </CartProvider>
=======
        <Header />
        <main>{children}</main>
        <Footer />
        <LiveChat />
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
      </body>
    </html>
  )
}
