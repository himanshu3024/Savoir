import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // In a real application, you would:
    // 1. Validate the input
    // 2. Check if user already exists
    // 3. Hash the password
    // 4. Save to database
    // 5. Send verification email

    // Mock validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 },
      )
    }

    // Mock user creation
    const user = {
      id: Date.now(), // In production, use proper ID generation
      firstName,
      lastName,
      email,
      role: "customer",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      user,
      message: "Account created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
