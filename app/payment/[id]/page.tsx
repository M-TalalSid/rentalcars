import RentalForm from "../../components/RentalForm"
import { client } from "@/lib/sanity"

async function getCar(id: string) {
  return client.fetch(`*[_type == "car" && _id == $id][0]`, { id })
}

export default async function RentalPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  if (!car) {
    return <div>Car not found</div>
  }

  return <RentalForm id={params.id} car={car} />
}

