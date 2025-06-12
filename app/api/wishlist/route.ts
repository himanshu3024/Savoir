import { type NextRequest, NextResponse } from "next/server"
import { WishlistService } from "@/lib/database"
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

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    const wishlist = await WishlistService.getUserWishlist(user.id)

    return NextResponse.json({
      success: true,
      wishlist,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch wishlist" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 })
    }

    const result = await WishlistService.addToWishlist(user.id, productId)

    if (!result) {
      return NextResponse.json({ success: false, message: "Product already in wishlist" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Product added to wishlist",
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to add to wishlist" }, { status: 401 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 })
    }

    await WishlistService.removeFromWishlist(user.id, Number.parseInt(productId))

    return NextResponse.json({
      success: true,
      message: "Product removed from wishlist",
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to remove from wishlist" },
      { status: 401 },
    )
  }
}
