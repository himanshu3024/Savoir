import { type NextRequest, NextResponse } from "next/server"
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
  }
}
