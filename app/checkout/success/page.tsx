"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const [orderNumber] = useState(`ORD-${Date.now()}`)

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>

          {/* Order Details */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Order #{orderNumber}</h2>
                <p className="text-gray-600">Confirmation email sent to your inbox</p>
              </div>

              {/* Next Steps */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-1">Processing</h3>
                  <p className="text-sm text-gray-600">We're preparing your order</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-medium mb-1">Shipping</h3>
                  <p className="text-sm text-gray-600">2-3 business days</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-1">Updates</h3>
                  <p className="text-sm text-gray-600">Track via email</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/orders">View Order Status</Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You'll receive an order confirmation email shortly</li>
              <li>• We'll send you tracking information once your order ships</li>
              <li>• Your order will arrive within 2-3 business days</li>
              <li>• Contact us if you have any questions about your order</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
