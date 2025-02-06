import { notFound } from "next/navigation"
import Detail from "@/app/components/Detail"
import { client } from "@/lib/sanity"

async function getCar(id: string) {
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
    const car = await client.fetch(query, { id })
    return car
  } catch (error) {
    console.error("Error fetching car:", error)
    return null
  }
}

export default async function CarPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  if (!car) {
    notFound()
  }

  return <Detail car={car} />
}

