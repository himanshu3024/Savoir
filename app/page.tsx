"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Truck, Shield, Headphones, Play, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import RecentlyViewed from "@/components/recently-viewed"
import ProductRecommendations from "@/components/product-recommendations"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    countries: 0,
    satisfaction: 0,
  })

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 2847,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249.99,
      originalPrice: 329.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 1923,
      badge: "New",
    },
    {
      id: 3,
      name: "Professional Camera Lens",
      price: 899.99,
      originalPrice: 1199.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 856,
      badge: "Limited",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Designer",
      content: "SAVOIR has completely transformed my shopping experience. The quality and service are unmatched!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      content: "The curated selection and attention to detail make SAVOIR my go-to for premium products.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Interior Designer",
      content: "Every purchase from SAVOIR exceeds my expectations. Truly exceptional quality and service.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const floatingProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$299",
      image: "/placeholder.svg?height=100&width=100",
      position: "top-20 left-10",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$249",
      image: "/placeholder.svg?height=100&width=100",
      position: "top-40 right-20",
    },
    {
      id: 3,
      name: "Camera Lens",
      price: "$899",
      image: "/placeholder.svg?height=100&width=100",
      position: "bottom-32 left-20",
    },
  ]

  // Animate statistics on mount
  useEffect(() => {
    const animateStats = () => {
      const targets = { customers: 50000, products: 200000, countries: 25, satisfaction: 98 }
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setStats({
          customers: Math.floor(targets.customers * progress),
          products: Math.floor(targets.products * progress),
          countries: Math.floor(targets.countries * progress),
          satisfaction: Math.floor(targets.satisfaction * progress),
        })

        if (step >= steps) {
          clearInterval(timer)
        }
      }, stepDuration)
    }

    animateStats()
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Product Cards */}
        {floatingProducts.map((product, index) => (
          <div
            key={product.id}
            className={`absolute ${product.position} hidden lg:block animate-bounce`}
            style={{ animationDelay: `${index * 0.5}s`, animationDuration: "3s" }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3 hover:scale-110 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div className="text-white">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-purple-200">{product.price}</p>
                </div>
              </div>
            </Card>
          </div>
        ))}

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm animate-pulse">
              ✨ New Collection Available
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-fade-in">
              SAVOIR
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Discover extraordinary products that define luxury, innovation, and timeless elegance
            </p>

            {/* Interactive Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stats.customers.toLocaleString()}+
                </div>
                <div className="text-purple-200 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.products.toLocaleString()}+</div>
                <div className="text-purple-200 text-sm">Products Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.countries}+</div>
                <div className="text-purple-200 text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.satisfaction}%</div>
                <div className="text-purple-200 text-sm">Satisfaction</div>
              </div>
            </div>

            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/products">
                  Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white/10 text-white hover:bg-white hover:text-black backdrop-blur-sm text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
              >
                <Link href="#featured">View Featured</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Story
              </Button>
            </div>

            {/* Customer Testimonial Carousel */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                    }
                    className="text-white hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentTestimonial ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="text-white hover:bg-white/10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-4 italic">"{testimonials[currentTestimonial].content}"</p>
                  <div className="flex items-center justify-center space-x-3">
                    <Image
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="text-left">
                      <p className="text-white font-medium">{testimonials[currentTestimonial].name}</p>
                      <p className="text-purple-200 text-sm">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-500" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse delay-1500" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free worldwide shipping on orders over $100</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe and secure</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selections that represent the pinnacle of design and functionality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    {product.badge}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    asChild
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg"
            >
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Trending Products */}
      <ProductRecommendations type="trending" />
    </div>
  )
}
