import { type NextRequest, NextResponse } from "next/server"
import { ReviewService } from "@/lib/database"
import { AuthService } from "@/lib/auth"

async function getUserFromToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided")
  }

  const token = authHeader.substring(7)
  const decoded = AuthService.verifyToken(token)

  if (!decoded) {
    throw new Error("Invalid token")
  }

  return decoded
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    const body = await request.json()
    const { productId, rating, title, comment } = body

    if (!productId || !rating) {
      return NextResponse.json({ success: false, message: "Product ID and rating are required" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, message: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const review = await ReviewService.createReview({
      productId,
      userId: user.id,
      rating,
      title,
      comment,
    })

    return NextResponse.json({
      success: true,
      message: "Review created successfully",
      review,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to create review" }, { status: 401 })
  }
}
