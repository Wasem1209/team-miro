"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";

// Backend schema-based interface
interface Reservation {
  id: string;
  guest_email: string;
  reservation_type: string;
  status: string;
  pickup_location: string;
  dropoff_location: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  car: string;
}

// Local display interface
interface CarDisplay {
  id: string;
  guestEmail: string;
  reservationType: string;
  status: string;
  pickup: string;
  dropoff: string;
  startDate: string;
  endDate: string;
  image: string;
}

export default function CarsListings() {
  const [cars, setCars] = useState<CarDisplay[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

  // Fetch reservations from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/car/, { cache: "no-store" }`);
        if (!res.ok) throw new Error("Failed to fetch reservations");

        const data = await res.json();

        // Map backend results to frontend-friendly format
        const formatted: CarDisplay[] = data.results.map((item: Reservation) => ({
          id: item.id,
          guestEmail: item.guest_email,
          reservationType: item.reservation_type,
          status: item.status,
          pickup: item.pickup_location,
          dropoff: item.dropoff_location,
          startDate: item.start_date,
          endDate: item.end_date,
          image: "/placeholder-car.png", // Default image until backend provides one
        }));

        setCars(formatted);
      } catch (err) {
        console.error("❌ Error fetching cars:", err);
        setError("Failed to load car reservations.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [API_BASE]);

  // Filter by guest email or status
  const filteredCars = cars.filter(
    (car) =>
      car.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading reservations...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by guest email or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            onClick={() => alert("Add reservation modal coming soon")}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900"
          >
            Add Reservation <Plus size={16} />
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 font-semibold text-lg border-b">
            Cars / Reservations
          </div>

          {/* Desktop Table */}
          <div className="hidden md:grid grid-cols-7 text-sm font-semibold px-4 py-2 bg-gray-50 border-b">
            <span>Image</span>
            <span>Guest Email</span>
            <span>Reservation Type</span>
            <span>Status</span>
            <span>Pickup Location</span>
            <span>Dropoff Location</span>
            <span>Dates</span>
          </div>

          {/* Table Rows */}
          <div>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="hidden md:grid grid-cols-7 items-center px-4 py-3 border-b hover:bg-gray-50 transition"
                >
                  {/* Car Image */}
                  <div>
                    <Image
                      src={car.image}
                      width={80}
                      height={60}
                      alt="Car"
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                  </div>

                  <div className="text-gray-800 font-medium truncate">
                    {car.guestEmail}
                  </div>

                  <div className="capitalize text-gray-700">
                    {car.reservationType}
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        car.status === "active" || car.status === "firm"
                          ? "bg-green-100 text-green-700"
                          : car.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {car.status}
                    </span>
                  </div>

                  <div className="text-gray-700">{car.pickup}</div>
                  <div className="text-gray-700">{car.dropoff}</div>
                  <div className="text-gray-700">
                    {car.startDate} → {car.endDate}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500">
                No reservations available.
              </p>
            )}
          </div>

          {/* Mobile Layout (Dropdown cards instead of table) */}
          <div className="md:hidden">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="border-b py-4 px-3 flex flex-col gap-2 bg-white shadow-sm rounded-lg mb-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={car.image}
                    width={60}
                    height={40}
                    alt="Car"
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {car.guestEmail}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.reservationType}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-sm mt-1">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      car.status === "active" || car.status === "firm"
                        ? "bg-green-100 text-green-700"
                        : car.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <p>
                    <strong>Pickup:</strong> {car.pickup}
                  </p>
                  <p>
                    <strong>Dropoff:</strong> {car.dropoff}
                  </p>
                  <p>
                    <strong>Dates:</strong> {car.startDate} → {car.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}