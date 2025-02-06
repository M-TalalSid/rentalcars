"use client"

import { useState, useEffect } from "react"
import { FaHeart, FaRegHeart, FaCar, FaUser, FaGasPump } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import PickDrop from "./PickDrop"

interface Car {
  _id: string
  name: string
  brand: string
  type: string
  imageUrl: string
  fuelCapacity: string
  transmission: string
  seatingCapacity: string
  pricePerDay: number
  originalPrice?: number
}

const Cat_Recomendation = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCars, setTotalCars] = useState(0)
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    fetchCars()
  }, )

  const fetchCars = async () => {
    try {
      const response = await fetch(`/api/cars?page=${currentPage}&limit=6`)
      const data = await response.json()
      setCars(data.results)
      setTotalPages(data.totalPages)
      setTotalCars(data.totalCars)
      setFavorites(
        data.results.reduce((acc: { [key: string]: boolean }, car: Car) => {
          acc[car._id] = false
          return acc
        }, {}),
      )
    } catch (error) {
      console.error("Error fetching cars:", error)
    }
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="max-w-[1015px] mx-auto p-4">
      <div className="text-center mb-6">
        <PickDrop />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car._id} className="bg-white shadow-lg rounded-lg p-4 relative">
            <button
              onClick={() => toggleFavorite(car._id)}
              aria-label={`Mark ${car.name} as favorite`}
              className="absolute top-3 right-3 text-red-500"
            >
              {favorites[car._id] ? <FaHeart /> : <FaRegHeart />}
            </button>
            <div className="mb-4">
              <h3 className="text-lg font-medium">{car.name}</h3>
              <p className="text-gray-500 text-sm">
                {car.brand} - {car.type}
              </p>
            </div>
            <div className="w-full h-36 relative mb-4">
              <Image
                alt={`${car.name} car`}
                src={car.imageUrl || "/placeholder.svg"}
                layout="fill"
                objectFit="contain"
                className="object-contain"
              />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <FaGasPump />
                <span>{car.fuelCapacity}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCar />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{car.seatingCapacity}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">${car.pricePerDay}/day</p>
                {car.originalPrice && car.originalPrice > car.pricePerDay && (
                  <p className="text-gray-400 line-through">${car.originalPrice}/day</p>
                )}
              </div>
              <Link href={`/cars/${car._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium disabled:bg-gray-300"
        >
          Previous
        </button>
        <p className="text-gray-500 text-sm">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      <p className="text-gray-500 text-sm text-center mt-4">Total Cars: {totalCars}</p>
    </div>
  )
}

export default Cat_Recomendation

