import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { formatCurrency } from "@/lib/utils";
import type React from "react"; // Added import for React

interface Car {
  _id: string;
  name: string;
  brand: string;
  imageUrl: string;
  pricePerDay: number;
}

interface RentalSummaryProps {
  car: Car;
  rentalDays: number;
}

const RentalSummary: React.FC<RentalSummaryProps> = ({ car, rentalDays }) => {
  const subtotal = car.pricePerDay * rentalDays;
  const tax = subtotal * 0.1; // 10% tax
  const insuranceFee = 25 * rentalDays; // $25 per day for insurance
  const total = subtotal + tax + insuranceFee;

  return (
    <div className="sticky top-6">
      <section className="p-6 border rounded-lg bg-white dark:bg-gray-800 space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Rental Summary
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Prices may change depending on the length of the rental and the price
          of your rental car.
        </p>

        {/* Car Image and Details */}
        <div className="flex items-center space-x-4">
          <Image
            src={car.imageUrl || "/placeholder.svg"}
            alt={car.name}
            width={132}
            height={108}
            className="rounded-lg object-cover"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {car.name}
            </h3>
            <div className="flex items-center gap-1">
              <div className="text-yellow-500 flex">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <CiStar />
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                (440+ Reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Rental Details */}
        <div className="border-t pt-4 dark:border-gray-700">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Rental Duration</span>
              <span>
                {rentalDays} {rentalDays === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Price Per Day</span>
              <span>{formatCurrency(car.pricePerDay)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Insurance Fee</span>
              <span>{formatCurrency(insuranceFee)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="border-t pt-4 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Add promo code"
              className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">
              Apply
            </button>
          </div>
        </div>

        {/* Total Price Section */}
        <div className="border-t pt-4 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Total Rental Price
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Overall price includes rental discount
              </p>
            </div>
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalSummary;