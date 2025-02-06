import React from "react";
import Cat_Recomendation from "../components/Cat-Recomend";
import { client } from "@/lib/sanity" // Assuming you have a Sanity client setup
import CarSearchBar from "../components/Car-Search-Bar";

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

export default async function AllCars() {
  const cars = await getCarData();

  return (
    <div>
      <main className="-mb-24">
      <CarSearchBar cars={cars}/>
      </main>
      
      <main className="flex bg-[#F6F7F9]">
        <Cat_Recomendation />
      </main>
    </div>
  );
}