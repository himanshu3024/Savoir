import { NextResponse } from "next/server"
import { ProductService } from "@/lib/database"

export async function GET() {
  try {
    const products = await ProductService.getFeaturedProducts()

    return NextResponse.json({
      success: true,
      products,
    })
  } catch (error: any) {
    console.error("Featured products fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch featured products" }, { status: 500 })
  }
}
