"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye } from "lucide-react";
import Image from "next/image";
import Reservation from "../reservations/page";

// Backend-safe interface
interface Car {
  id: string;
  name: string;
  model: string;
  year: string;
  colour: string;
  car_type: string;
  price_per_day: number;
  pickup_location: string;
  status: string; // from reservation
  rules: string;
  seating_capacity: number;
  luggage_capacity: number;
  wheel_drive: string;
  fuel_type: string;
  transmission: string;
  photo: string;
  plate_number: string;
  created_at: string;
  updated_at: string;
}

export default function CarsListings() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showModal, setShowModal] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

  // Fetch reservations and normalize cars
  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const res = await fetch(`https://driveeasy.pythonanywhere.com/api/v1/car/`);
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data = await res.json();

        const reservations = Array.isArray(data.results) ? data.results : [];

        // Fetch full car details for each reservation
       const normalizedCars = await Promise.all(
  (reservations as Reservation[]).map(async (reservation) => {
    try {
      const carRes = await fetch(`https://driveeasy.pythonanywhere.com/api/v1/car/{id}${reservation.car}/`);
      if (!carRes.ok) throw new Error("Failed to fetch car");
      const carData = await carRes.json();
      return {
        ...carData,
        status: reservation.status, // use reservation status
      };
    } catch (err) {
      console.error(`Error fetching car ${reservation.car}:`, err);
      return null;
    }
  })
);

        const validCars = normalizedCars.filter((c) => c !== null);
        setCars(validCars);
        setFilteredCars(validCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [API_BASE]);

  //Modal view
  async function handleView(id: string) {
    try {
      const res = await fetch(`https://driveeasy.pythonanywhere.com/api/v1/car/{id}`);
      if (!res.ok) throw new Error("Failed to fetch car details");
      const data = await res.json();
      setSelectedCar(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching single car:", error);
    }
  }

  // Delete car
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await fetch(`https://driveeasy.pythonanywhere.com/api/v1/car/${id}/delete/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete car");

      setCars((prev) => prev.filter((car) => car.id !== id));
      setFilteredCars((prev) => prev.filter((car) => car.id !== id));
      alert("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("An error occurred while deleting the car.");
    }
  }

  // Toggle availability
  async function handleToggleAvailability(car: Car) {
    try {
      const newStatus = car.status === "available" ? "unavailable" : "available";

      const res = await fetch(`https://driveeasy.pythonanywhere.com/api/v1/car/${car.id}/update/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update car status");

      const updatedCars = cars.map((c) =>
        c.id === car.id ? { ...c, status: newStatus } : c
      );
      setCars(updatedCars);
      setFilteredCars(updatedCars);
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Error updating car status.");
    }
  }

  //  Search filter
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) =>
        car.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  }, [searchQuery, cars]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>

        <Link
          href="/dashboard/cars-listings/add"
          className="flex items-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          <Plus size={18} className="mr-1" /> Add Car
        </Link>
      </div>

      {/* Table Header */}
      <div className="bg-white rounded-t-lg shadow p-3 flex justify-between items-center font-semibold text-gray-600">
        <div className="w-1/4">Image</div>
        <div className="w-1/4">Car Name</div>
        <div className="w-1/4">Availability</div>
        <div className="w-1/4 text-right">Price per Day</div>
      </div>

      {/* Cars List */}
      <div className="bg-white shadow rounded-b-lg divide-y divide-gray-200">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading cars...</div>
        ) : filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car.id}
              className="flex flex-col sm:flex-row items-center justify-between p-3"
            >
              {/* Image */}
              <div className="w-full sm:w-1/4 flex justify-center">
                <Image
                  src={car.photo || "/placeholder-car.png"}
                  alt={car.name}
                  height={64}
                  width={96}
                  className="w-24 h-16 object-cover rounded"
                />
              </div>

              {/* Car Name */}
              <div className="w-full sm:w-1/4 text-center font-medium">
                {car.name || "Unnamed"}{" "}
                <span className="text-gray-500 text-sm">({car.model})</span>
              </div>

              {/* Availability */}
              <div className="w-full sm:w-1/4 text-center">
                <button
                  onClick={() => handleToggleAvailability(car)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    car.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {car.status === "available" ? "Available" : "Unavailable"}
                </button>
              </div>

              {/* Price + Actions */}
              <div className="w-full sm:w-1/4 flex flex-col sm:flex-row justify-end gap-3 items-center mt-2 sm:mt-0">
                <span className="font-semibold">${car.price_per_day || 0}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(car.id)}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition flex items-center gap-1"
                  >
                    <Eye size={14} /> View
                  </button>

                  <Link
                    href={`/dashboard/cars-listings/${car.id}/update`}
                    className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(car.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
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

      {/* Car Details Modal */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {selectedCar.name} ({selectedCar.model})
            </h2>

            <Image
              src={selectedCar.photo || "/placeholder-car.png"}
              alt={selectedCar.name}
              height={160}
              width={240}
              className="w-full h-40 object-cover rounded mb-4"
            />

            <p>
              <strong>Year:</strong> {selectedCar.year}
            </p>
            <p>
              <strong>Type:</strong> {selectedCar.car_type}
            </p>
            <p>
              <strong>Fuel:</strong> {selectedCar.fuel_type}
            </p>
            <p>
              <strong>Wheel Drive:</strong> {selectedCar.wheel_drive}
            </p>
            <p>
              <strong>Rules:</strong> {selectedCar.rules || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}