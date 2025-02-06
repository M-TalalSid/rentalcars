import { NextResponse } from "next/server"
import { client } from "@/lib/sanity"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page") || "1")
  const limit = Number(searchParams.get("limit") || "6")

  const query = `*[_type == "car"] {
    _id,
    name,
    brand,
    type,
    fuelCapacity,
    transmission,
    seatingCapacity,
    pricePerDay,
    originalPrice,
    "imageUrl": image.asset->url
  }`

  try {
    const cars = await client.fetch(query)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = cars.slice(startIndex, endIndex)
    const totalPages = Math.ceil(cars.length / limit)

    return NextResponse.json({
      results,
      currentPage: page,
      totalPages,
      totalCars: cars.length,
    })
  } catch (error) {
    console.error("Error fetching car data:", error)
    return NextResponse.json({ error: "Failed to fetch car data" }, { status: 500 })
  }
}

