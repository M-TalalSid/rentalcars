"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FaHeart } from "react-icons/fa"
import { toast } from "react-hot-toast"

type WishlistButtonProps = {
  itemId: string
  itemName: string
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ itemId, itemName }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsWishlisted(wishlist.includes(itemId))
  }, [itemId])

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    if (isWishlisted) {
      const newWishlist = wishlist.filter((id: string) => id !== itemId)
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      setIsWishlisted(false)
      toast.success(`${itemName} removed from wishlist!`)
    } else {
      wishlist.push(itemId)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setIsWishlisted(true)
      toast.success(`${itemName} added to wishlist!`)
    }
  }

  return (
    <button onClick={toggleWishlist} className="focus:outline-none">
      <FaHeart className={`w-6 h-6 ${isWishlisted ? "text-red-500" : "text-gray-400"}`} />
    </button>
  )
}

export default WishlistButton

