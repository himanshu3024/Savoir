"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, ShoppingCart, Plus, Minus } from "lucide-react"
import Image from "next/image"
import WishlistButton from "./wishlist-button"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  description: string
  badge?: string
  inStock: boolean
}

interface QuickViewModalProps {
  product: Product
  children: React.ReactNode
}

export default function QuickViewModal({ product, children }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const images = [product.image, product.image, product.image]

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of product ${product.id} to cart`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Quick View - {product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-80 object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded border-2 transition-all ${
                    selectedImage === index ? "border-purple-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    <Badge className="bg-green-100 text-green-800">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`font-medium ${product.inStock ? "text-green-700" : "text-red-700"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <WishlistButton productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
