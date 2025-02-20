import CarSearchBar from "./components/Car-Search-Bar";
import HeroSection from "./components/Hero";
import PickDrop from "./components/PickDrop";
import CarCardCarousel from "./components/Popular";
import Recomendation from "./components/Recomendation";
import { client } from "@/lib/sanity"

async function getCarData() {
  const query = `*[_type == "car"]{
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
  return await client.fetch(query)
}

export default async function Home() {
  const cars = await getCarData()

  return (
    <div>
      <main className="-mb-24">
      <CarSearchBar cars={cars}/>
      </main>
      <HeroSection />
      <PickDrop />
      <CarCardCarousel />
      <Recomendation />
    </div>
  );
}