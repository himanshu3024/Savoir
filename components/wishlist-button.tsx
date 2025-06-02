"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  productId: number
  className?: string
  size?: "sm" | "default" | "lg"
}

export default function WishlistButton({ productId, className, size = "default" }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleWishlist = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsWishlisted(!isWishlisted)
    setIsLoading(false)
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleWishlist}
      disabled={isLoading}
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
