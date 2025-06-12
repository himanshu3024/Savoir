"use client"

<<<<<<< HEAD
=======
import { useState } from "react"
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
<<<<<<< HEAD
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

export default function CartPage() {
  const { state: cartState, updateQuantity, removeFromCart, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

=======

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 1,
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249.99,
      originalPrice: 329.99,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 2,
      inStock: true,
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 1,
      inStock: false,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10")
      setPromoCode("")
    }
  }

<<<<<<< HEAD
  const subtotal = cartState.total
  const savings = cartState.items.reduce(
    (sum, item) => sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0),
    0,
  )
=======
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = (subtotal - promoDiscount) * 0.08
  const total = subtotal - promoDiscount + shipping + tax

<<<<<<< HEAD
  if (cartState.items.length === 0) {
=======
  if (cartItems.length === 0) {
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
<<<<<<< HEAD
            <p className="text-gray-600">{cartState.items.length} items in your cart</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
=======
            <p className="text-gray-600">{cartItems.length} items in your cart</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
<<<<<<< HEAD
            {cartState.items.map((item) => (
=======
            {cartItems.map((item) => (
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          <Link href={`/products/${item.id}`} className="hover:text-purple-600 transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-gray-900">${item.price}</span>
<<<<<<< HEAD
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                          )}
                          {item.originalPrice && item.originalPrice > item.price && (
=======
                          {item.originalPrice > item.price && (
                            <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                          )}
                          {item.originalPrice > item.price && (
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
                            <Badge className="bg-green-100 text-green-800">
                              Save ${(item.originalPrice - item.price).toFixed(2)}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={!item.inStock}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="text-xl font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
<<<<<<< HEAD
                            onClick={() => removeFromCart(item.id)}
=======
                            onClick={() => removeItem(item.id)}
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {!item.inStock && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-700 text-sm">
                            This item is currently out of stock. Remove it from your cart or save it for later.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button onClick={applyPromoCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-green-700">Code "{appliedPromo}" applied</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedPromo(null)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount (10%)</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-700 text-sm">Add ${(100 - subtotal).toFixed(2)} more for free shipping!</p>
                  </div>
                )}

                <Button
<<<<<<< HEAD
                  asChild
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg"
                  disabled={cartState.items.some((item) => !item.inStock)}
                >
                  <Link href="/checkout">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Link>
=======
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg"
                  disabled={cartItems.some((item) => !item.inStock)}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Secure checkout powered by Stripe</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
