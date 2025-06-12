import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { UserService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = AuthService.verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const user = await UserService.getUserById(decoded.id)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error: any) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 401 })
  }
}
