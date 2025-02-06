import { NextResponse } from "next/server"
import { client } from "@/lib/sanity"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const query = `*[_type == "car" && _id == $id][0] {
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
    const car = await client.fetch(query, { id: params.id })

    if (!car) {
      return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(car)
  } catch (error) {
    console.error("Error fetching car data:", error)
    return NextResponse.json({ error: "Failed to fetch car data" }, { status: 500 })
  }
}