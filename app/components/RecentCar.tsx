'use client';

import { FaHeart, FaRegHeart, FaCar, FaUser, FaGasPump } from "react-icons/fa";
import { useState } from "react";
import Image from 'next/image';

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

const cars: Car[] = [
  {
    name: "Koenigsegg",
    type: "Sport",
    image: "/popular-1.png",
    fuel: "90L",
    transmission: "Manual",
    capacity: "2 People",
    price: "$99.00",
    favorite: true,
  },
  {
    name: "Nissan GT-R",
    type: "Sport",
    image: "/popular-2.png",
    fuel: "80L",
    transmission: "Manual",
    capacity: "2 People",
    price: "$80.00",
    oldPrice: "$100.00",
    favorite: false,
  },
  {
    name: "Rolls-Royce",
    type: "Sedan",
    image: "/popular-3.png",
    fuel: "70L",
    transmission: "Manual",
    capacity: "4 People",
    price: "$96.00",
    favorite: true,
  },
];

const RecentCar = () => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>(
    cars.reduce((acc, car) => ({ ...acc, [car.name]: car.favorite }), {})
  );

  const toggleFavorite = (carName: string) => {
    setFavorites((prev) => ({
      ...prev,
      [carName]: !prev[carName],
    }));
  };

  return (
    <div className="max-w-[1440px] px-4 py-8 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-base text-center text-[#90A3BF] font-semibold mb-4 px-4">
          Recent Car
        </h2>
        <h2 className="text-base text-center text-[#3563E9] font-semibold mb-4 px-4">
          View All
        </h2>
      </div>
      {/* Carousel Container */}
      <div className="relative">
        {/* Scrollable Area */}
        <div
          className="flex gap-6 overflow-x-scroll scrollbar-hide px-4"
        >
          {cars.map((car) => (
            <div
              key={car.name}
              className="bg-white w-[250px] shadow-md rounded-lg p-4 relative flex-shrink-0"
            >
              <button
                onClick={() => toggleFavorite(car.name)}
                className="absolute top-3 right-3 text-red-500"
              >
                {favorites[car.name] ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* Car Name and Type */}
              <div className="mb-2">
                <h3 className="text-lg font-medium">{car.name}</h3>
                <p className="text-gray-500 text-sm">{car.type}</p>
              </div>

              {/* Car Image */}
              <div className="w-full h-36 mb-4 relative">
                <Image
                  alt={car.name}
                  src={car.image}
                  layout="fill"
                  objectFit="contain"
                  className="object-contain"
                />
              </div>

              {/* Car Details */}
              <div
                className="flex sm:flex-row flex-wrap items-center gap-2 text-sm text-gray-600 mt-2"
              >
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

              {/* Pricing and Button */}
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
    </div>
  );
};

export default RecentCar;
