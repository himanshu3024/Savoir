"use client"

<<<<<<< HEAD
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/contexts/wishlist-context"

interface WishlistButtonProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    category: string
    badge?: string
    description: string
    inStock: boolean
  }
=======
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  productId: number
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
  className?: string
  size?: "sm" | "default" | "lg"
}

<<<<<<< HEAD
export default function WishlistButton({ product, className, size = "default" }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
=======
export default function WishlistButton({ productId, className, size = "default" }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleWishlist = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsWishlisted(!isWishlisted)
    setIsLoading(false)
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleWishlist}
<<<<<<< HEAD
=======
      disabled={isLoading}
>>>>>>> 28b0df6d36395144296a081afcac291179282bdd
      className={cn(
        "transition-all duration-300",
        isWishlisted ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500",
        className,
      )}
    >
      <Heart className={cn("h-5 w-5 transition-all duration-300", isWishlisted ? "fill-current scale-110" : "")} />
    </Button>
  )
}
