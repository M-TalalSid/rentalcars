"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Hero Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 dark:from-gray-900 dark:to-gray-800 p-8 sm:p-12 shadow-lg">
          <div className="relative z-10 mb-12">
            <h1 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
              The Best Platform
              <br />
              for Car Rental
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl">
              Rent cars easily and safely at the lowest prices.
            </p>
            <Link
              href="/rental"
              className="mt-6 inline-block bg-white dark:bg-gray-700 dark:text-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition"
              aria-label="Rent a Car"
            >
              Rent a Car
            </Link>
          </div>
          <Image
            src="/car-1.png"
            alt="Luxury white sports car for rental"
            width={900}
            height={640}
            className="absolute bottom-0 right-0 sm:right-12 w-3/4 sm:w-auto"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute bottom-0 right-0 sm:right-12 w-3/4 sm:w-auto h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          )}
        </div>

        {/* Second Hero Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 dark:from-gray-800 dark:to-gray-700 p-8 sm:p-12 shadow-lg">
          <div className="relative z-10 mb-12">
            <h1 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
              Easy Car Rentals
              <br />
              at Affordable Prices
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl">
              Experience secure and comfortable car rentals.
            </p>
            <Link
              href="/rental"
              className="mt-6 inline-block bg-white dark:bg-gray-700 dark:text-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition"
              aria-label="Rent a Car"
            >
              Rent a Car
            </Link>
          </div>
          <Image
            src="/image-8.png"
            alt="Luxury grey sports car available for rent"
            width={560}
            height={540}
            className="absolute bottom-0 right-0 sm:right-12 w-3/4 sm:w-auto"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute bottom-0 right-0 sm:right-12 w-3/4 sm:w-auto h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;