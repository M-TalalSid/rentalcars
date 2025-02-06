'use client';

import { FaHeart, FaRegHeart, FaCar, FaUser, FaGasPump } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@sanity/client";

// Sanity client configuration
const sanityClient = createClient({
  projectId: "wc9r8g31", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2025-02-05", // Use the latest date-based version
  useCdn: true,
});

// Car interface
interface Car {
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
  originalPrice?: string;
  imageUrl: string;
  favorite?: boolean;
}

const Recomendation = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  // Fetch recommended cars from Sanity
  useEffect(() => {
    const fetchCars = async () => {
      const query = `*[_type == "car" && "recommended" in tags] {
        name,
        brand,
        type,
        fuelCapacity,
        transmission,
        seatingCapacity,
        pricePerDay,
        originalPrice,
        "imageUrl": image.asset->url
      }`;
      const data = await sanityClient.fetch(query);
      setCars(data);
      setFavorites(
        data.reduce((acc: { [key: string]: boolean }, car: Car) => {
          acc[car.name] = car.favorite || false;
          return acc;
        }, {})
      );
    };
    fetchCars();
  }, []);

  const toggleFavorite = (carName: string) => {
    setFavorites((prev) => ({
      ...prev,
      [carName]: !prev[carName],
    }));
  };

  return (
    <div className="max-w-[1440px] px-4 py-8 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-base text-center text-[#3563E9] font-semibold mb-4 px-4">
          Recommended Cars
        </h2>
        <h2 className="text-base text-center text-[#3563E9] font-semibold mb-4 px-4">
          <a href="#" className="hover:underline">
            View All
          </a>
        </h2>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 
          overflow-x-auto lg:overflow-x-hidden px-4"
      >
        {cars.map((car) => (
          <div
            key={car.name}
            className="bg-white w-full shadow-md rounded-lg p-4 relative flex-shrink-0"
          >
            <button
              onClick={() => toggleFavorite(car.name)}
              className="absolute top-3 right-3 text-red-500"
            >
              {favorites[car.name] ? <FaHeart /> : <FaRegHeart />}
            </button>
            <div className=" sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-medium">{car.name}</h3>
              <p className="text-gray-500 text-sm">{car.type}</p>
            </div>

            <Image
              alt={car.name}
              src={car.imageUrl}
              width={300}
              height={200}
              className="w-full h-36 object-contain mb-4"
            />

            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-end 
                gap-2 text-sm text-gray-600 mt-2"
            >
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
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">${car.pricePerDay}/day</p>
                {car.originalPrice && (
                  <p className="text-gray-400 line-through">
                    ${car.originalPrice}
                  </p>
                )}
              </div>
              <button className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded">
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-5">
        <Link href="/category">
          <button className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded w-[156px] h-11">
            Show More Car
          </button>
        </Link>
        <div className="font-medium text-sm text-[#90A3BF] ml-4">
          {cars.length} Cars
        </div>
      </div>
    </div>
  );
};

export default Recomendation;