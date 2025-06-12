import { type NextRequest, NextResponse } from "next/server"
import { ProductService, ReviewService } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)

    const product = await ProductService.getProductById(productId)
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    // Get reviews and rating
    const reviews = await ReviewService.getProductReviews(productId)
    const ratingData = await ReviewService.getAverageRating(productId)

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        reviews,
        averageRating: ratingData.averagerating || 0,
        totalReviews: ratingData.totalreviews || 0,
      },
    })
  } catch (error: any) {
    console.error("Product fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch product" }, { status: 500 })
  }
}
