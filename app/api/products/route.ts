import { type NextRequest, NextResponse } from "next/server"
<<<<<<< HEAD
import { ProductService } from "@/lib/database"
=======

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
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
<<<<<<< HEAD
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const categoryId = searchParams.get("categoryId")

    let products
    if (categoryId) {
      products = await ProductService.getProductsByCategory(Number.parseInt(categoryId))
    } else {
      products = await ProductService.getAllProducts(limit, offset)
=======
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
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
    }

    return NextResponse.json({
      success: true,
<<<<<<< HEAD
      products,
    })
  } catch (error: any) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.price) {
      return NextResponse.json({ success: false, message: "Name and price are required" }, { status: 400 })
    }

    const product = await ProductService.createProduct(body)

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      product,
    })
  } catch (error: any) {
    console.error("Product creation error:", error)
    return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 })
=======
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
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
  }
}
