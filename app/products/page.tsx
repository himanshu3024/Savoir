"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Star, Search, Filter, Grid, List, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import QuickViewModal from "@/components/quick-view-modal"
import WishlistButton from "@/components/wishlist-button"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string>("")

  const products = [
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
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249.99,
      originalPrice: 329.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 1923,
      category: "Electronics",
      badge: "New",
      description: "Advanced fitness tracking with heart rate monitoring",
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
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.5,
      reviews: 1567,
      category: "Electronics",
      badge: "",
      description: "Fast wireless charging for all compatible devices",
    },
  ]

  const categories = ["Electronics", "Photography", "Accessories", "Furniture"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
        const matchesPrice =
          !priceRange ||
          (priceRange === "under-100" && product.price < 100) ||
          (priceRange === "100-300" && product.price >= 100 && product.price <= 300) ||
          (priceRange === "300-500" && product.price >= 300 && product.price <= 500) ||
          (priceRange === "over-500" && product.price > 500)

        return matchesSearch && matchesCategory && matchesPrice
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "newest":
            return b.id - a.id
          default:
            return 0
        }
      })
  }, [searchTerm, selectedCategories, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg">Discover our curated collection of premium products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Categories</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={category} className="text-sm font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-100">Under $100</SelectItem>
                    <SelectItem value="100-300">$100 - $300</SelectItem>
                    <SelectItem value="300-500">$300 - $500</SelectItem>
                    <SelectItem value="over-500">Over $500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
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

            {/* Products */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={viewMode === "list" ? "flex" : ""}>
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-full h-48" : "w-full h-64"
                        }`}
                      />
                      {product.badge && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                          {product.badge}
                        </Badge>
                      )}
                    </div>

                    <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex items-center mb-2">
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
                        <span className="text-sm text-gray-600 ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>

                      {viewMode === "list" && <p className="text-gray-600 mb-4">{product.description}</p>}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        {product.originalPrice > product.price && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Save ${(product.originalPrice - product.price).toFixed(2)}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Button
                          asChild
                          className="flex-1 mr-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          <Link href={`/products/${product.id}`}>View Details</Link>
                        </Button>
                        <QuickViewModal
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.image,
                            rating: product.rating,
                            reviews: product.reviews,
                            description: product.description,
                            badge: product.badge,
                            inStock: true,
                          }}
                        >
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </QuickViewModal>
                        <WishlistButton productId={product.id} />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategories([])
                    setPriceRange("")
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
