import { type NextRequest, NextResponse } from "next/server"
import { OrderService } from "@/lib/database"
import { AuthService } from "@/lib/auth"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_your_stripe_secret_key_here", {
  apiVersion: "2024-06-20",
})

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
    const orders = await OrderService.getUserOrders(user.id)

    return NextResponse.json({
      success: true,
      orders,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch orders" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    const body = await request.json()
    const { items, shippingAddress, billingAddress, paymentMethodId } = body

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
    const total = subtotal + tax + shipping

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders/confirmation`,
    })

    // Create order in database
    const order = await OrderService.createOrder({
      userId: user.id,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddressId: shippingAddress.id,
      billingAddressId: billingAddress.id,
      paymentMethod: "stripe",
    })

    // Add order items
    await OrderService.addOrderItems(
      order.id,
      items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
    )

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      order,
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
      },
    })
  } catch (error: any) {
    console.error("Order creation error:", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to create order" }, { status: 500 })
  }
}
