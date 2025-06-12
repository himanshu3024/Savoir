import { type NextRequest, NextResponse } from "next/server"
import { ProductService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const categoryId = searchParams.get("categoryId")

    let products
    if (categoryId) {
      products = await ProductService.getProductsByCategory(Number.parseInt(categoryId))
    } else {
      products = await ProductService.getAllProducts(limit, offset)
    }

    return NextResponse.json({
      success: true,
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
  }
}
