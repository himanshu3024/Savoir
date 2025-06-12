import { type NextRequest, NextResponse } from "next/server"
<<<<<<< HEAD
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Login user
    const result = await AuthService.login(email, password)

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: result.user,
      token: result.token,
    })
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: error.message || "Login failed" }, { status: 401 })
=======

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json()

    // In a real application, you would:
    // 1. Validate the input
    // 2. Check credentials against your database
    // 3. Generate JWT tokens
    // 4. Set secure cookies

    // Mock authentication logic
    if (email === "demo@savoir.com" && password === "password123") {
      const user = {
        id: 1,
        email: email,
        firstName: "Demo",
        lastName: "User",
        role: "customer",
      }

      // In production, use proper JWT tokens and secure cookies
      const token = "mock-jwt-token"

      return NextResponse.json({
        success: true,
        user,
        token,
        message: "Login successful",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
  }
}
