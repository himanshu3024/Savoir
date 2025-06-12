"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, TrendingUp, Users } from "lucide-react"
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
  badge?: string
}

interface ProductRecommendationsProps {
  type: "trending" | "recommended" | "customers-also-bought"
  title?: string
  currentProductId?: number
}

export default function ProductRecommendations({ type, title, currentProductId }: ProductRecommendationsProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Mock recommendation data
    const mockProducts: Product[] = [
      {
        id: 7,
        name: "Smart Home Hub",
        price: 199.99,
        originalPrice: 249.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        reviews: 1234,
        badge: "Trending",
      },
      {
        id: 8,
        name: "Wireless Mouse",
        price: 79.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.5,
        reviews: 892,
      },
      {
        id: 9,
        name: "USB-C Hub",
        price: 149.99,
        originalPrice: 199.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        reviews: 567,
        badge: "Popular",
      },
      {
        id: 10,
        name: "Bluetooth Speaker",
        price: 129.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.4,
        reviews: 743,
      },
    ]

    // Filter out current product if provided
    const filteredProducts = currentProductId ? mockProducts.filter((p) => p.id !== currentProductId) : mockProducts

    setProducts(filteredProducts.slice(0, 4))
  }, [currentProductId])

  const getIcon = () => {
    switch (type) {
      case "trending":
        return <TrendingUp className="h-5 w-5 text-white" />
      case "customers-also-bought":
        return <Users className="h-5 w-5 text-white" />
      default:
        return <Sparkles className="h-5 w-5 text-white" />
    }
  }

  const getDefaultTitle = () => {
    switch (type) {
      case "trending":
        return "Trending Now"
      case "customers-also-bought":
        return "Customers Also Bought"
      default:
        return "Recommended for You"
    }
  }

  const getGradient = () => {
    switch (type) {
      case "trending":
        return "from-orange-500 to-red-600"
      case "customers-also-bought":
        return "from-green-500 to-teal-600"
      default:
        return "from-purple-600 to-blue-600"
    }
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${getGradient()} rounded-full flex items-center justify-center`}
            >
              {getIcon()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title || getDefaultTitle()}</h2>
              <p className="text-gray-600">
                {type === "trending" && "What's popular right now"}
                {type === "customers-also-bought" && "Frequently bought together"}
                {type === "recommended" && "Picked just for you"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
                {product.badge && (
                  <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${getGradient()} text-white`}>
                    {product.badge}
                  </Badge>
                )}
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
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  )}
                </div>
                <Button asChild size="sm" className="w-full">
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
