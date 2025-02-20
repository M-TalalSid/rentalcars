"use client";

import { FaHeart, FaRegHeart, FaCar, FaUser, FaGasPump } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchCars = async () => {
      try {
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
          Popular Cars
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
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible px-4 scrollbar-hide">
          {cars.map((car) => (
            <article
              key={car.name}
              className="bg-white dark:bg-gray-800 w-[250px] md:w-full shadow-lg rounded-lg p-4 relative flex-shrink-0 lg:flex-shrink lg:w-auto transition-transform transform hover:scale-105"
            >
              <button
                onClick={() => toggleFavorite(car.name)}
                className="absolute top-3 right-3 text-red-500 dark:text-red-400 hover:text-red-600 transition-colors"
                aria-label="Toggle favorite"
              >
                {favorites[car.name] ? <FaHeart /> : <FaRegHeart />}
              </button>

              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {car.type}
                </p>
              </div>

              <div className="w-full h-36 mb-4 relative">
                <Image
                  alt={car.name}
                  src={car.image}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-2">
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
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {car.price}/day
                  </p>
                  {car.oldPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      {car.oldPrice}
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
    </section>
  );
};

export default CarCardCarousel;