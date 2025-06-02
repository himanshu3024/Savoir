"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProductRecommendations from "@/components/product-recommendations"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: Number.parseInt(params.id),
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 2847,
    badge: "Best Seller",
    description:
      "Experience unparalleled audio quality with our premium wireless headphones. Featuring advanced noise cancellation technology, premium materials, and exceptional comfort for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Premium leather ear cushions",
      "Bluetooth 5.0 connectivity",
      "Quick charge: 15 min = 3 hours playback",
      "Foldable design for portability",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "40 hours playback",
    },
    inStock: true,
    stockCount: 15,
  }

  const relatedProducts = [
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Luxury Leather Wallet",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely amazing sound quality! The noise cancellation is incredible and the battery life exceeds expectations.",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Great headphones overall. Very comfortable for long listening sessions. The build quality is excellent.",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      date: "2024-01-05",
      comment: "Best purchase I've made this year! The sound is crystal clear and the design is beautiful.",
      verified: true,
    },
  ]

  const handleAddToCart = () => {
    // In real app, add to cart logic here
    console.log(`Added ${quantity} of product ${product.id} to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-purple-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? "border-purple-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <Badge className="bg-green-100 text-green-800">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`font-medium ${product.inStock ? "text-green-700" : "text-red-700"}`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={() => setIsWishlisted(!isWishlisted)} className="p-6">
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" className="p-6">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over $100</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">2 Year Warranty</p>
                <p className="text-xs text-gray-600">Full coverage</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-xs text-gray-600">No questions asked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-200 last:border-b-0">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-gray-900 mb-4">${product.price}</p>
                  <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customers Also Bought */}
        <ProductRecommendations type="customers-also-bought" currentProductId={product.id} />
      </div>
    </div>
  )
}
