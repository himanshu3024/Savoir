import { type NextRequest, NextResponse } from "next/server"

// Mock cart storage (in production, use database)
let cartItems: any[] = []

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cart",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1 } = await request.json()

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((item) => item.productId === productId)

    if (existingItemIndex > -1) {
      // Update quantity
      cartItems[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      cartItems.push({
        id: Date.now(),
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Item added to cart",
      items: cartItems,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add item to cart",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json()

    const itemIndex = cartItems.findIndex((item) => item.productId === productId)

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cartItems.splice(itemIndex, 1)
      } else {
        cartItems[itemIndex].quantity = quantity
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cart updated",
      items: cartItems,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update cart",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (productId) {
      cartItems = cartItems.filter((item) => item.productId !== Number.parseInt(productId))
    } else {
      cartItems = []
    }

    return NextResponse.json({
      success: true,
      message: "Item removed from cart",
      items: cartItems,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove item from cart",
      },
      { status: 500 },
    )
  }
}
