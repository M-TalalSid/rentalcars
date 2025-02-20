import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface Car {
  _id: string;
  name: string;
  brand: string;
  type: string;
  imageUrl: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: number;
  originalPrice?: number;
}

const Detail = ({ car }: { car: Car }) => {
  return (
    <section className="max-w-[1017px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      {/* Left Section */}
      <div className="w-full flex flex-col items-center">
        {/* Main Car Card */}
        <div className="bg-[#3563E9] dark:bg-blue-800 w-full h-[360px] text-white rounded-[10px] flex flex-col items-start justify-between p-5 relative shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex-1">
            <h1 className="mb-4 font-semibold text-[32px] leading-10 tracking-tight">
              {car.name}
            </h1>
            <p className="mb-4 text-base font-medium tracking-tight">
              {car.brand} {car.type} With The Best Design And Acceleration
            </p>
          </div>
          <div className="absolute bottom-4 left-4">
            <Image
              src={car.imageUrl || "/placeholder.svg"}
              alt={car.name}
              width={380}
              height={120}
              className="w-[380px] h-[120px] object-contain"
              priority // Prioritize loading for above-the-fold images
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-between gap-4 mt-6">
          <Image
            src={car.imageUrl || "/placeholder.svg"}
            alt={`${car.name} view 1`}
            width={148}
            height={124}
            className="w-[148px] h-[124px] rounded-[10px] object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            src={car.imageUrl || "/placeholder.svg"}
            alt={`${car.name} view 2`}
            width={148}
            height={124}
            className="w-[148px] h-[124px] rounded-[10px] object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            src={car.imageUrl || "/placeholder.svg"}
            alt={`${car.name} view 3`}
            width={148}
            height={124}
            className="w-[148px] h-[124px] rounded-[10px] object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full h-auto p-7 bg-white dark:bg-gray-800 rounded-[10px] shadow-lg hover:shadow-xl transition-shadow">
        {/* Title and Favorite Icon */}
        <div className="flex justify-between items-center">
          <h2 className="text-[32px] text-[#3563E9] dark:text-blue-400 font-bold">
            {car.name}
          </h2>
          <AiFillHeart className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition-colors" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-[4px] mt-2">
          <p className="text-yellow-500 flex items-center gap-[2px]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <CiStar />
          </p>
          <p className="text-[#596780] dark:text-gray-400">440+ Reviews</p>
        </div>

        {/* Description */}
        <p className="text-[#3e495d] dark:text-gray-300 font-normal text-xl mt-4">
          {car.brand} {car.type} With {car.transmission} Transmission And{" "}
          {car.seatingCapacity} Seating Capacity.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-xl text-[#3e495d] dark:text-gray-300">
              Type:
            </span>
            <span className="ml-2 font-semibold text-xl text-[#628dd5] dark:text-blue-400">
              {car.type}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-xl text-[#3e495d] dark:text-gray-300">
              Transmission:
            </span>
            <span className="ml-2 font-semibold text-xl text-[#628dd5] dark:text-blue-400">
              {car.transmission}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-xl text-[#3e495d] dark:text-gray-300">
              Capacity:
            </span>
            <span className="ml-2 font-semibold text-xl text-[#628dd5] dark:text-blue-400">
              {car.seatingCapacity}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-xl text-[#3e495d] dark:text-gray-300">
              Fuel Capacity:
            </span>
            <span className="ml-2 font-semibold text-xl text-[#628dd5] dark:text-blue-400">
              {car.fuelCapacity}
            </span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-black dark:text-white">
                ${car.pricePerDay}
              </span>
              <span className="text-base font-bold text-[#628dd5] dark:text-blue-400 ml-2">
                /day
              </span>
            </div>
            {car.originalPrice && car.originalPrice > car.pricePerDay && (
              <span className="text-[#628dd5] dark:text-blue-400 line-through text-base font-bold">
                ${car.originalPrice}
              </span>
            )}
          </div>
          <Link href={`/payment/${car._id}`} passHref>
            <button
              className="bg-[#3563E9] dark:bg-blue-600 w-[140px] h-[56px] text-white rounded-[4px] font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              aria-label="Rent Now"
            >
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Detail;