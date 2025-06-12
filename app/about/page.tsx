import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart, Target, Zap, Shield, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "50K+", icon: Users },
    { label: "Products Sold", value: "200K+", icon: Award },
    { label: "Countries Served", value: "25+", icon: Globe },
    { label: "Years of Excellence", value: "8+", icon: Star },
  ]

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make is centered around delivering exceptional customer experiences.",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Target,
      title: "Quality Focus",
      description: "We curate only the finest products that meet our rigorous quality standards.",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly evolve our platform to provide cutting-edge shopping experiences.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your privacy and security are paramount in everything we do.",
      color: "from-green-500 to-teal-600",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Visionary leader with 15+ years in luxury retail",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Tech innovator passionate about e-commerce solutions",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Award-winning designer creating beautiful experiences",
    },
    {
      name: "David Kim",
      role: "VP of Operations",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Operations expert ensuring seamless customer journeys",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">✨ Our Story</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              About SAVOIR
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're on a mission to redefine luxury e-commerce by curating extraordinary products that embody
              innovation, quality, and timeless elegance. Every item in our collection tells a story of craftsmanship
              and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Our Journey
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2016, SAVOIR began as a vision to bridge the gap between luxury and accessibility. Our
                  founders, passionate about exceptional design and quality, noticed that truly remarkable products were
                  often hidden away in exclusive boutiques.
                </p>
                <p>
                  We set out to democratize luxury by creating a platform where discerning customers could discover and
                  acquire extraordinary products from around the world. Every item in our collection is personally
                  vetted by our team of experts.
                </p>
                <p>
                  Today, SAVOIR has grown into a global community of tastemakers, innovators, and quality enthusiasts
                  who share our passion for the exceptional. We continue to push boundaries in e-commerce, always
                  putting our customers' experience first.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/products">Explore Our Collection</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Our Story"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind SAVOIR's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              "To create a world where exceptional quality, innovative design, and sustainable practices converge to
              deliver products that not only meet but exceed our customers' highest expectations. We believe that luxury
              should be accessible, responsible, and transformative."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
