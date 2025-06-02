import { type NextRequest, NextResponse } from "next/server"

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
    inStock: true,
    stockCount: 15,
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
    inStock: true,
    stockCount: 8,
  },
  // Add more products as needed
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy")

    let filteredProducts = [...products]

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by search term
    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          filteredProducts.sort((a, b) => b.id - a.id)
          break
      }
    }

    return NextResponse.json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 },
    )
  }
}
