"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star, ShoppingCart, Trash2, Share2, Grid, List, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock wishlist data - in real app, this would come from state management/API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 2847,
      category: "Electronics",
      badge: "Best Seller",
      description: "High-quality wireless headphones with noise cancellation",
      inStock: true,
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: 3,
      name: "Professional Camera Lens",
      price: 899.99,
      originalPrice: 1199.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 856,
      category: "Photography",
      badge: "Limited",
      description: "Professional-grade camera lens for stunning photography",
      inStock: true,
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    },
    {
      id: 4,
      name: "Luxury Leather Wallet",
      price: 129.99,
      originalPrice: 179.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.6,
      reviews: 1245,
      category: "Accessories",
      badge: "",
      description: "Handcrafted leather wallet with RFID protection",
      inStock: false,
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      price: 449.99,
      originalPrice: 599.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 967,
      category: "Furniture",
      badge: "Popular",
      description: "Ergonomic design for maximum comfort and productivity",
      inStock: true,
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    },
  ])

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== productId))
  }

  const addToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`)
    // In real app, add to cart logic here
  }

  const shareProduct = (product: any) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} on SAVOIR`,
        url: `${window.location.origin}/products/${product.id}`,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/products/${product.id}`)
    }
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const filteredItems = wishlistItems
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "newest":
          return b.addedAt.getTime() - a.addedAt.getTime()
        case "oldest":
          return a.addedAt.getTime() - b.addedAt.getTime()
        default:
          return 0
      }
    })

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    return `${diffInDays} days ago`
  }

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
  const totalSavings = wishlistItems.reduce(
    (sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0),
    0,
  )

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              My Wishlist
            </h1>
            <p className="text-gray-600 text-lg">Save your favorite items for later</p>
          </div>

          {/* Empty State */}
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start building your wishlist by adding products you love. Click the heart icon on any product to save it
                here.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline" onClick={clearWishlist}>
                Clear All
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Wishlist Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">{wishlistItems.length}</div>
                <div className="text-gray-600">Items Saved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">${totalValue.toFixed(2)}</div>
                <div className="text-gray-600">Total Value</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">${totalSavings.toFixed(2)}</div>
                <div className="text-gray-600">Total Savings</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your wishlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={viewMode === "list" ? "flex" : ""}>
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={400}
                    height={400}
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === "list" ? "w-full h-48" : "w-full h-64"
                    }`}
                  />
                  {item.badge && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                  <Badge className="absolute top-3 right-3 bg-black/70 text-white text-xs">
                    {formatTimeAgo(item.addedAt)}
                  </Badge>
                </div>

                <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                  </h3>

                  {viewMode === "list" && <p className="text-gray-600 mb-4">{item.description}</p>}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Save ${(item.originalPrice - item.price).toFixed(2)}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Button
                      onClick={() => addToCart(item.id)}
                      disabled={!item.inStock}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareProduct(item)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {!item.inStock && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                      This item is currently out of stock. We'll notify you when it's available again.
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No items found matching "{searchTerm}"</p>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <h3 className="text-2xl font-bold mb-4">Ready to purchase?</h3>
              <p className="text-gray-600 mb-6">
                Add all in-stock items to your cart and complete your purchase in one go.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => {
                    const inStockItems = wishlistItems.filter((item) => item.inStock)
                    inStockItems.forEach((item) => addToCart(item.id))
                  }}
                >
                  Add All to Cart ({wishlistItems.filter((item) => item.inStock).length} items)
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
