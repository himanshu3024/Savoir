import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Register user
    const result = await AuthService.register({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
    })

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: result.user,
      token: result.token,
    })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: error.message || "Registration failed" }, { status: 400 })
  }
}
