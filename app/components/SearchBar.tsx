'use client'

import { useState, useEffect, SetStateAction, Key } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from 'lucide-react';

interface Product {
  id: Key | null | undefined;
  description: React.ReactNode;
  name: string;
  type: string;
  image: string;
  fuel: string;
  transmission: string;
  capacity: string;
  price: string;
  oldPrice?: string;
  favorite: boolean;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    // Simulating an API call to fetch products
    const fetchProducts = async () => {
      // Replace this with your actual API call
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description && product.description.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(results)
  }, [searchTerm, products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // You can add additional search logic here if needed
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id || product.name}> {/* Ensure key is unique */}
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  )
}