"use client";

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
  useCdn: true, // Disable CDN for real-time updates
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
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recommended cars from Sanity
  useEffect(() => {
    const fetchCars = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
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
    <section className="max-w-[1440px] px-4 py-8 mx-auto bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-[#3563E9] font-semibold dark:text-blue-400">
          Recommended Cars
        </h2>
        <Link
          href="/category"
          className="text-[#3563E9] hover:underline dark:text-blue-400"
        >
          View All
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <article
              key={car.name}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 relative transition-transform transform hover:scale-105"
            >
              <button
                onClick={() => toggleFavorite(car.name)}
                className="absolute top-3 right-3 text-red-500 dark:text-red-400 hover:text-red-600 transition-colors"
                aria-label="Toggle favorite"
              >
                {favorites[car.name] ? <FaHeart /> : <FaRegHeart />}
              </button>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {car.type}
                </p>
              </div>
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={car.imageUrl}
                  alt={car.name}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600 dark:text-gray-300">
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
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    ${car.pricePerDay}/day
                  </p>
                  {car.originalPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      ${car.originalPrice}
                    </p>
                  )}
                </div>
                <button
                  className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                  aria-label="Rent now"
                >
                  Rent Now
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center mt-8">
        <Link
          href="/category"
          className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Show More Cars
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">
          {cars.length} Cars
        </p>
      </div>
    </section>
  );
};

export default Recomendation;