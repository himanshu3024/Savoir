"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  viewedAt: Date
}

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([])

  useEffect(() => {
    // Mock recently viewed products
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        originalPrice: 399.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        reviews: 2847,
        viewedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: 3,
        name: "Professional Camera Lens",
        price: 899.99,
        originalPrice: 1199.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        reviews: 856,
        viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: 5,
        name: "Ergonomic Office Chair",
        price: 449.99,
        originalPrice: 599.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        reviews: 967,
        viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
    ]
    setRecentProducts(mockProducts)
  }, [])

  if (recentProducts.length === 0) {
    return null
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
              <p className="text-gray-600">Continue where you left off</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/recently-viewed">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-black/70 text-white text-xs">
                  {formatTimeAgo(product.viewedAt)}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                </div>
                <h3 className="font-semibold mb-2 text-sm group-hover:text-purple-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/products/${product.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
