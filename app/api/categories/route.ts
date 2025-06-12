import { type NextRequest, NextResponse } from "next/server"
import { CategoryService } from "@/lib/database"

export async function GET() {
  try {
    const categories = await CategoryService.getAllCategories()

    return NextResponse.json({
      success: true,
      categories,
    })
  } catch (error: any) {
    console.error("Categories fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, message: "Name and slug are required" }, { status: 400 })
    }

    const category = await CategoryService.createCategory(body)

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      category,
    })
  } catch (error: any) {
    console.error("Category creation error:", error)
    return NextResponse.json({ success: false, message: "Failed to create category" }, { status: 500 })
  }
}
