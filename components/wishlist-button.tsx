"use client"

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
  className?: string
  size?: "sm" | "default" | "lg"
}

export default function WishlistButton({ product, className, size = "default" }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleWishlist}
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
