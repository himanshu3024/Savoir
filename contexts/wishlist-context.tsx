"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

interface WishlistItem {
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
  addedAt: Date
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: Omit<WishlistItem, "addedAt"> }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

const WishlistContext = createContext<{
  state: WishlistState
  dispatch: React.Dispatch<WishlistAction>
  addToWishlist: (item: Omit<WishlistItem, "addedAt">) => void
  removeFromWishlist: (id: number) => void
  clearWishlist: () => void
  isInWishlist: (id: number) => boolean
} | null>(null)

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state // Item already in wishlist
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, addedAt: new Date() }],
      }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "CLEAR_WISHLIST":
      return {
        items: [],
      }

    case "LOAD_WISHLIST":
      return {
        items: action.payload,
      }

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("savoir-wishlist")
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist).map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }))
        dispatch({ type: "LOAD_WISHLIST", payload: wishlistItems })
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savoir-wishlist", JSON.stringify(state.items))
  }, [state.items])

  const addToWishlist = (item: Omit<WishlistItem, "addedAt">) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeFromWishlist = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (id: number) => {
    return state.items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        state,
        dispatch,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
