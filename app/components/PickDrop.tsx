import { LuArrowDownUp } from "react-icons/lu";

const PickDrop = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-6 bg-gray-50 dark:bg-gray-900">
      {/* Pick-Up Card */}
      <div className="flex flex-col w-full max-w-md md:max-w-[582px] bg-white dark:bg-gray-800 rounded-lg gap-4 p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="radio"
            name="location"
            id="pickup"
            defaultChecked
            className="text-blue-500 dark:text-blue-400"
          />
          <label
            htmlFor="pickup"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            Pick-Up
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
              Locations
            </label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-label="Pick-up location"
            >
              <option>Select Your City</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Miami">Chicago</option>
              <option value="Chicago">Houston</option>
              <option value="Paris">Phoenix</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
              Date
            </label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-label="Pick-up date"
            >
              <option>Select Your Date</option>
              <option value="2024-06-09">June 09, 2024</option>
              <option value="2024-07-10">July 10, 2024</option>
              <option value="2024-08-11">August 11, 2024</option>
              <option value="2024-09-12">September 12, 2024</option>
              <option value="2024-10-13">October 13, 2024</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
              Time
            </label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-label="Pick-up time"
            >
              <option>Select Your Time</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="11:00 PM">11:00 PM</option>
              <option value="1:00 AM">1:00 AM</option>
              <option value="4:00 AM">4:00 AM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Swap Icon */}
      <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition-colors">
        <LuArrowDownUp size={24} />
      </div>

      {/* Drop-Off Card */}
      <div className="flex flex-col w-full max-w-md md:max-w-[582px] bg-white dark:bg-gray-800 rounded-lg gap-4 p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="radio"
            name="location"
            id="dropoff"
            className="text-blue-500 dark:text-blue-400"
          />
          <label
            htmlFor="dropoff"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            Drop-Off
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
              Locations
            </label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-label="Drop-off location"
            >
              <option>Select Your City</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Miami">Chicago</option>
              <option value="Chicago">Houston</option>
              <option value="Paris">Phoenix</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
              Date
            </label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-label="Drop-off date"
            >
              <option>Select Your Date</option>
              <option value="2024-06-09">June 09, 2024</option>
              <option value="2024-07-10">July 10, 2024</option>
              <option value="2024-08-11">August 11, 2024</option>
              <option value="2024-09-12">September 12, 2024</option>
              <option value="2024-10-13">October 13, 2024</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
              Time
            </label>
            <select
              className="w-full text-sm p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-label="Drop-off time"
            >
              <option>Select Your Time</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="11:00 PM">11:00 PM</option>
              <option value="1:00 AM">1:00 AM</option>
              <option value="4:00 AM">4:00 AM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickDrop;