"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Smartphone, Headphones, Camera, Watch, Gamepad2, Laptop } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest gadgets and electronic devices",
      productCount: 156,
      image: "/placeholder.svg?height=400&width=600",
      icon: Smartphone,
      color: "from-blue-500 to-purple-600",
      featured: true,
    },
    {
      id: 2,
      name: "Audio & Headphones",
      description: "Premium sound experience",
      productCount: 89,
      image: "/placeholder.svg?height=400&width=600",
      icon: Headphones,
      color: "from-purple-500 to-pink-600",
      featured: true,
    },
    {
      id: 3,
      name: "Photography",
      description: "Professional cameras and accessories",
      productCount: 67,
      image: "/placeholder.svg?height=400&width=600",
      icon: Camera,
      color: "from-green-500 to-teal-600",
      featured: false,
    },
    {
      id: 4,
      name: "Wearables",
      description: "Smart watches and fitness trackers",
      productCount: 45,
      image: "/placeholder.svg?height=400&width=600",
      icon: Watch,
      color: "from-orange-500 to-red-600",
      featured: true,
    },
    {
      id: 5,
      name: "Gaming",
      description: "Gaming accessories and peripherals",
      productCount: 78,
      image: "/placeholder.svg?height=400&width=600",
      icon: Gamepad2,
      color: "from-indigo-500 to-blue-600",
      featured: false,
    },
    {
      id: 6,
      name: "Computers",
      description: "Laptops, desktops and accessories",
      productCount: 123,
      image: "/placeholder.svg?height=400&width=600",
      icon: Laptop,
      color: "from-gray-600 to-gray-800",
      featured: false,
    },
  ]

  const featuredCategories = categories.filter((cat) => cat.featured)
  const allCategories = categories

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Explore Categories
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products across various categories
          </p>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Categories
            </h2>
            <p className="text-xl text-gray-600">Our most popular product categories</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="relative overflow-hidden h-64">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute top-4 left-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                      {category.productCount} Products
                    </Badge>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/90 mb-4">{category.description}</p>
                      <Button
                        asChild
                        variant="secondary"
                        className={`transition-all duration-300 ${
                          hoveredCategory === category.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}
                      >
                        <Link href={`/products?category=${category.name.toLowerCase()}`}>
                          Explore <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              All Categories
            </h2>
            <p className="text-xl text-gray-600">Browse our complete range of product categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {allCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`} className="group">
                  <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">{category.productCount} items</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Why Shop by Category?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Targeted Shopping</h3>
                <p className="text-gray-600">Find exactly what you're looking for with our organized categories</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Discovery</h3>
                <p className="text-gray-600">Discover new products and brands within your favorite categories</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Curation</h3>
                <p className="text-gray-600">Each category is carefully curated by our product experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
