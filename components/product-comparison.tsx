"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Star, Check, Minus } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  features: string[]
  specifications: Record<string, string>
}

interface ProductComparisonProps {
  products: Product[]
  onRemoveProduct: (productId: number) => void
  onClearAll: () => void
}

export default function ProductComparison({ products, onRemoveProduct, onClearAll }: ProductComparisonProps) {
  if (products.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">No Products to Compare</h3>
          <p className="text-gray-600">Add products to your comparison list to see them here.</p>
        </CardContent>
      </Card>
    )
  }

  // Get all unique specification keys
  const allSpecs = Array.from(new Set(products.flatMap((product) => Object.keys(product.specifications))))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Comparison</h2>
        <Button variant="outline" onClick={onClearAll}>
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Product Headers */}
          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div></div>
            {products.map((product) => (
              <Card key={product.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveProduct(product.id)}
                  className="absolute top-2 right-2 z-10"
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardContent className="p-4 text-center">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-center mb-2">
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
                  <div className="text-lg font-bold">${product.price}</div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card>
            <CardContent className="p-0">
              {/* Basic Info */}
              <div className="border-b">
                <div
                  className="grid gap-4 p-4"
                  style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                >
                  <div className="font-semibold">Category</div>
                  {products.map((product) => (
                    <div key={product.id} className="text-center">
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              {allSpecs.map((spec) => (
                <div key={spec} className="border-b last:border-b-0">
                  <div
                    className="grid gap-4 p-4"
                    style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                  >
                    <div className="font-medium">{spec}</div>
                    {products.map((product) => (
                      <div key={product.id} className="text-center">
                        {product.specifications[spec] || <Minus className="h-4 w-4 text-gray-400 mx-auto" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Features Comparison */}
              <div className="border-b">
                <div className="p-4">
                  <h4 className="font-semibold mb-4">Features</h4>
                  {/* Get all unique features */}
                  {Array.from(new Set(products.flatMap((p) => p.features))).map((feature) => (
                    <div
                      key={feature}
                      className="grid gap-4 py-2"
                      style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                    >
                      <div className="text-sm">{feature}</div>
                      {products.map((product) => (
                        <div key={product.id} className="text-center">
                          {product.features.includes(feature) ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4">
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
                  <div></div>
                  {products.map((product) => (
                    <Button
                      key={product.id}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Add to Cart
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
