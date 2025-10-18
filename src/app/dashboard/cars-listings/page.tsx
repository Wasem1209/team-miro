"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import Image from "next/image";

// Define Car interface
interface Car {
  id: number;
  name: string;
  image: string;
  available: boolean;
  pricePerDay: number;
}

export default function CarsListingsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch cars from backend
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("/api/v1/car/");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data: Car[] = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    }

    fetchCars();
  }, []);

  // Search filter
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  }, [searchQuery, cars]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        {/* Search bar */}
        <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>

        {/* Add Car Button */}
        <Link
          href="/dashboard/cars-listings/add"
          className="flex items-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          <Plus size={18} className="mr-1" /> Add Cars
        </Link>
      </div>

      {/* Table Header */}
      <div className="bg-white rounded-t-lg shadow p-3 flex justify-between items-center font-semibold text-gray-600">
        <div className="w-1/4">Image</div>
        <div className="w-1/4">Car Name</div>
        <div className="w-1/4">Availability</div>
        <div className="w-1/4 text-right">Price per day</div>
      </div>

      {/* Cars List */}
      <div className="bg-white shadow rounded-b-lg divide-y divide-gray-200">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car.id}
              className="flex flex-col sm:flex-row items-center justify-between p-3"
            >
              {/* Car Image */}
              <div className="w-full sm:w-1/4 flex justify-center">
                <Image
                  src={car.image || "/placeholder-car.png"}
                  alt={car.name}
                  height={0}
                  width={0}
                  className="w-24 h-16 object-cover rounded"
                />
              </div>

              {/* Car Name */}
              <div className="w-full sm:w-1/4 text-center font-medium">
                {car.name || "Unknown"}
              </div>

              {/* Availability */}
              <div className="w-full sm:w-1/4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    car.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {car.available ? "Available" : "Unavailable"}
                </span>
              </div>

              {/* Price and Actions */}
              <div className="w-full sm:w-1/4 flex flex-col sm:flex-row justify-end gap-3 items-center mt-2 sm:mt-0">
                <span className="font-semibold">${car.pricePerDay}</span>

                <div className="flex gap-2">
                  <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">No cars found.</div>
        )}
      </div>
    </div>
  );
}