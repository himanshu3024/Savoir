"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones, ShoppingBag, HelpCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Contact form submitted:", formData)
    setIsSubmitting(false)

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    })
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our customer service team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      contact: "support@savoir.com",
      availability: "Response within 24 hours",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our team",
      contact: "Available on website",
      availability: "Mon-Fri, 9AM-9PM EST",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: MapPin,
      title: "Visit Our Store",
      description: "Experience products in person",
      contact: "123 Luxury Avenue, NYC",
      availability: "Mon-Sat, 10AM-8PM",
      color: "from-purple-500 to-pink-600",
    },
  ]

  const faqCategories = [
    {
      icon: ShoppingBag,
      title: "Orders & Shipping",
      description: "Track orders, shipping info, delivery",
      count: "15 articles",
    },
    {
      icon: HelpCircle,
      title: "Returns & Exchanges",
      description: "Return policy, exchange process",
      count: "8 articles",
    },
    {
      icon: Headphones,
      title: "Product Support",
      description: "Product guides, troubleshooting",
      count: "12 articles",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">💬 Get in Touch</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're here to help! Reach out to our team for any questions, support, or feedback
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              How Can We Help?
            </h2>
            <p className="text-xl text-gray-600">Choose the best way to reach us</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-3">{method.description}</p>
                    <p className="font-medium text-gray-900 mb-2">{method.contact}</p>
                    <p className="text-sm text-gray-500">{method.availability}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Product Support</SelectItem>
                        <SelectItem value="orders">Orders & Shipping</SelectItem>
                        <SelectItem value="returns">Returns & Exchanges</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Info */}
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <MapPin className="mr-3 h-6 w-6 text-purple-600" />
                    Visit Our Headquarters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div>
                    <p className="font-medium text-gray-900">SAVOIR Headquarters</p>
                    <p className="text-gray-600">123 Luxury Avenue</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Monday - Saturday: 10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Sunday: 12:00 PM - 6:00 PM</span>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Categories */}
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-bold">Quick Help</CardTitle>
                  <p className="text-gray-600">Find answers to common questions</p>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {faqCategories.map((category, index) => {
                    const IconComponent = category.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{category.title}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            For urgent matters or time-sensitive issues, our priority support team is available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call Priority Support
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
