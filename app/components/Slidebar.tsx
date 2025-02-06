"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; // Import ShadCN Sheet
import { CiMenuBurger } from "react-icons/ci"; // Burger Menu Icon for Trigger

export default function SlideBar() {
  return (
    <div className=" bg-white">
      {/* Filter Trigger for Mobile */}
      <div className="lg:hidden flex justify-end mb-4">
        <Sheet>
          <SheetTrigger>
            <button className="flex items-center space-x-2 text-black px-4 py-2 border rounded-lg shadow hover:bg-gray-100 transition">
              <CiMenuBurger size={24} />
              <span className="text-sm font-medium"></span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-6 space-y-6 max-w-xs w-full bg-gray-50 overflow-y-auto"
          >
            <Filters />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter Panel */}
      <div className="hidden lg:block">
        <Filters />
      </div>
    </div>
  );
}

// Reusable Filters Component
function Filters() {
  return (
    <div className="space-y-6">
      {/* Filter: Type */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-700">Type</h3>
        <div className="space-y-2">
          {[
            "Sport (10)",
            "SUV (12)",
            "MPV (16)",
            "Sedan (20)",
            "Coupe (14)",
            "Hatchback (14)",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 focus:ring focus:ring-blue-300"
              />
              <span className="text-gray-600">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter: Capacity */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-700">Capacity</h3>
        <div className="space-y-2">
          {[
            "2 Person (10)",
            "4 Person (14)",
            "6 Person (12)",
            "8 or More (16)",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 focus:ring focus:ring-blue-300"
              />
              <span className="text-gray-600">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter: Price Range */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-700">Price</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="10"
            max="100"
            className="w-full accent-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <p className="text-sm text-gray-600">Max: $100.00</p>
        </div>
      </div>
    </div>
  );
}
