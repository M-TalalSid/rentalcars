'use client';

import { FaHeart, FaRegHeart, FaCar, FaUser, FaGasPump } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@sanity/client";

// Sanity client configuration
const sanityClient = createClient({
  projectId: "wc9r8g31", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2025-02-05", // Use the latest date-based version
  useCdn: true, // Enable the Content Delivery Network (CDN)
});

interface Car {
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

const CarCardCarousel = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  // Fetch data from Sanity
  useEffect(() => {
    const fetchCars = async () => {
      const query = `
        *[_type == "car" && "popular" in tags] {
          name,
          type,
          "image": image.asset->url,
          "fuel": fuelCapacity,
          "transmission": transmission,
          "capacity": seatingCapacity,
          "price": pricePerDay,
          "oldPrice": originalPrice,
        }
      `;
      const results: Car[] = await sanityClient.fetch(query);
      setCars(results);

      // Initialize favorites based on fetched cars
      const initialFavorites = results.reduce(
        (acc, car) => ({ ...acc, [car.name]: false }),
        {}
      );
      setFavorites(initialFavorites);
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
          Popular Car
        </h2>
        <h2 className="text-base text-center text-[#3563E9] font-semibold mb-4 px-4">
          <a href="#" className="hover:underline">View All</a>
        </h2>
      </div>
      <div
        className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible px-4 scrollbar-hide"
      >
        {cars.map((car) => (
          <div
            key={car.name}
            className="bg-white w-[250px] md:w-full shadow-md rounded-lg p-4 relative flex-shrink-0 lg:flex-shrink lg:w-auto"
          >
            <button
              onClick={() => toggleFavorite(car.name)}
              className="absolute top-3 right-3 text-red-500"
            >
              {favorites[car.name] ? <FaHeart /> : <FaRegHeart />}
            </button>

            <div className="mb-2">
              <h3 className="text-lg font-medium">{car.name}</h3>
              <p className="text-gray-500 text-sm">{car.type}</p>
            </div>

            <div className="w-full h-36 mb-4 relative">
              <Image
                alt={car.name}
                src={car.image}
                layout="fill"
                objectFit="contain"
              />
            </div>

            <div className="flex sm:flex-row flex-wrap items-center gap-2 text-sm text-gray-600 mt-2">
              <div className="flex items-center gap-2">
                <FaGasPump />
                <span>{car.fuel}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCar />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{car.capacity}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">{car.price}/day</p>
                {car.oldPrice && (
                  <p className="text-gray-400 line-through">{car.oldPrice}</p>
                )}
              </div>
              <button className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded">
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCardCarousel;
