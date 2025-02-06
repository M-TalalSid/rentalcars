"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { mockItems } from "@/data/mockItems"

const categories = ["SUV", "Sports", "Sedan", "Coupe", "Convertible", "Hatchback", "Wagon"]

const brands = ["Audi", "Lamborghini", "Rolls-Royce", "Koenigsegg", "Mercedes", "Ferrari"]

export default function CategoryFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [items, setItems] = useState<typeof mockItems>([])
  const [filteredItems, setFilteredItems] = useState<typeof mockItems>([])
  const [priceRange, setPriceRange] = useState([0, 60000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setItems(mockItems)
      setFilteredItems(mockItems)
      setLoading(false)
    }
    fetchData()
  }, [])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const applyFilters = () => {
    const filtered = items.filter(
      (item) =>
        (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1] &&
        (selectedBrands.length === 0 || selectedBrands.includes(item.brand)),
    )
    setFilteredItems(filtered)
  }

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      applyFilters()
    }, 300)
    return () => clearTimeout(debounceTimeout)
  }, [selectedCategories, priceRange, selectedBrands])

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 60000])
    setSelectedBrands([])
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine Your Car Search</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Categories</h3>
              <div className="flex flex-wrap gap-2 font-medium">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Price Range</h3>
              <Slider
                min={0}
                max={60000}
                step={1000}
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Brands</h3>
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2 space-y-1.5">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label
                    htmlFor={brand}
                    className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={clearFilters} className="w-full font-semibold">
              Clear Filters
            </Button>
          </CardFooter>
        </Card>
        <div>
        <h2 className="mb-2 text-xl font-semibold">Available Cars</h2>
{loading ? (
  <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-2">
    {[...Array(6)].map((_, index) => (
      <Card key={index}>
        <CardHeader>
          <Skeleton className="h-48 w-full" /> 
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-2/3 mb-0.5" /> 
          <Skeleton className="h-4 w-1/2 mb-0.5" /> 
          <Skeleton className="h-4 w-1/3" />
        </CardContent>
      </Card>
    ))}
  </div>
) : filteredItems.length > 0 ? (
  <div className="grid gap-0.2 sm:grid-cols-2 lg:grid-cols-2">
    {filteredItems.map((item) => (
      <Card key={item.id}>
        <CardHeader>
          <Image
            src={item.image.src || "/placeholder.svg"}
            alt={item.image.alt}
            width={500}
            height={160}
            className="w-full h-48 object-cover rounded-t-lg"
          />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                    <p className="text-2xl font-bold mt-2">${item.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No Cars Available For The Selected Filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}

