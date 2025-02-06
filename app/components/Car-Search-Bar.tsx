"use client"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Car } from "lucide-react";
import useDebounce from "../hooks/use-debounce";
import Link from "next/link";
import type React from "react"; // Added import for React

interface Car {
  _id: string
  name: string
  brand: string
  type: string
  fuelCapacity: number
  transmission: string
  seatingCapacity: number
  pricePerDay: number
  originalPrice: number
  imageUrl: string
}

interface SearchResult {
  cars: Car[]
}

function CarSearchBar({ cars }: { cars: Car[] }) {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const debouncedQuery = useDebounce(query, 200)

  useEffect(() => {
    if (!isFocused) {
      setResult(null)
      return
    }

    if (!debouncedQuery) {
      setResult(null) // Show first 5 cars when no query
      return
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim()
    const filteredCars = cars.filter((car) => {
      const searchableText = `${car.name} ${car.brand} ${car.type}`.toLowerCase()
      return searchableText.includes(normalizedQuery)
    })

    setResult({ cars: filteredCars.slice(0, 5) }) // Limit to 5 results
  }, [debouncedQuery, isFocused, cars])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: {
          duration: 0.4,
        },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  }

  const handleFocus = () => {
    setSelectedCar(null)
    setIsFocused(true)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative flex flex-col justify-start items-center min-h-[300px]">
        <div className="w-full max-w-sm sticky top-0 bg-background z-10 pt-4 pb-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block" htmlFor="search">
            Search Cars
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for a car..."
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg focus-visible:ring-offset-0"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
              <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <AnimatePresence>
            {isFocused && result && !selectedCar && (
              <motion.div
                className="w-full border rounded-md shadow-sm overflow-hidden dark:border-gray-800 bg-white dark:bg-black mt-1"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.ul>
                  {result.cars.map((car) => (
                    <motion.li
                      key={car._id}
                      className="px-3 py-2 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer rounded-md"
                      variants={item}
                      layout
                    >
                      <Link href={`/car/${car._id}`} className="flex items-center gap-2 justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{car.name}</span>
                          <span className="text-xs text-gray-400">{car.brand}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{car.type}</span>
                          <span className="text-xs font-semibold text-green-500">${car.pricePerDay}/day</span>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
                {result.cars.length === 0 && <div className="px-3 py-2 text-sm text-gray-500">No cars found</div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CarSearchBar

