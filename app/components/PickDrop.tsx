"use client";

import { useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";

const PickDrop = () => {
  const [pickUp, setPickUp] = useState({ city: "", date: "", time: "" });
  const [dropOff, setDropOff] = useState({ city: "", date: "", time: "" });

  const locations = ["New York", "Los Angeles", "Miami", "Chicago", "Houston", "Phoenix"];
  const dates = ["2024-06-09", "2024-07-10", "2024-08-11", "2024-09-12", "2024-10-13"];
  const times = ["6:00 AM", "08:00 AM", "11:00 PM", "1:00 AM", "4:00 AM"];

  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-8 p-6 bg-gray-50 dark:bg-gray-900 transition-all">
      {/* Pick-Up Card */}
      <div className="flex flex-col w-full max-w-md md:max-w-[580px] bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
        <fieldset>
          <legend className="text-lg font-semibold text-gray-800 dark:text-gray-100">Pick-Up</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Location</label>
              <select
                className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={pickUp.city}
                onChange={(e) => setPickUp({ ...pickUp, city: e.target.value })}
                aria-label="Pick-Up Location"
              >
                <option value="">Select Your City</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Date</label>
              <select
                className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={pickUp.date}
                onChange={(e) => setPickUp({ ...pickUp, date: e.target.value })}
                aria-label="Pick-Up Date"
              >
                <option value="">Select Your Date</option>
                {dates.map((date) => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Time</label>
              <select
                className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={pickUp.time}
                onChange={(e) => setPickUp({ ...pickUp, time: e.target.value })}
                aria-label="Pick-Up Time"
              >
                <option value="">Select Your Time</option>
                {times.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Swap Icon */}
      <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition-colors cursor-pointer">
        <LuArrowDownUp size={24} aria-label="Swap Pick-Up and Drop-Off" />
      </div>

      {/* Drop-Off Card */}
      <div className="flex flex-col w-full max-w-md md:max-w-[580px] bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
        <fieldset>
          <legend className="text-lg font-semibold text-gray-800 dark:text-gray-100">Drop-Off</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Location</label>
              <select
                className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={dropOff.city}
                onChange={(e) => setDropOff({ ...dropOff, city: e.target.value })}
                aria-label="Drop-Off Location"
              >
                <option value="">Select Your City</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Date</label>
              <select
                className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={dropOff.date}
                onChange={(e) => setDropOff({ ...dropOff, date: e.target.value })}
                aria-label="Drop-Off Date"
              >
                <option value="">Select Your Date</option>
                {dates.map((date) => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Time</label>
              <select
                className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                value={dropOff.time}
                onChange={(e) => setDropOff({ ...dropOff, time: e.target.value })}
                aria-label="Drop-Off Time"
              >
                <option value="">Select Your Time</option>
                {times.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default PickDrop;