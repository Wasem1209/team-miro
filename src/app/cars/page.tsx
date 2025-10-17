"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Car } from "lucide-react";

interface CarItem {
  id: number;
  name: string;
  price: number;
  seats: number;
  transmission: string;
  category: string;
  image: string;
  available: boolean;
}

export default function SoftReservePage() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch paginated cars from API
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/cars?model=huracan&page=${page}&limit=9, {
          cache: "no-store",
        }`);

        if (!res.ok) throw new Error("Failed to fetch cars");

        const data: { cars: CarItem[]; totalPages: number } = await res.json();

        setCars(data.cars);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page]);

  // Handle pagination change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">
      {/* Header */}
      <div className="text-left mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Lamborghini Huracán{" "}
          <span className="text-gray-500">
            ({cars.length} cars found)
          </span>
        </h1>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {["Lamborghini", "Huracán", "Exotic", "2022", "$1200-1500", "Mon, Nov 3rd, 2025"].map(
          (filter, i) => (
            <button
              key={i}
              className="px-4 py-2 bg-white text-gray-700 text-sm rounded-md shadow-sm border hover:bg-gray-100 transition"
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-20 text-gray-600 text-lg">
          Loading cars...
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex justify-center items-center py-20 text-red-600 text-lg">
          Error: {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && cars.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No cars available.
        </div>
      )}

      {/* Car grid */}
      {!loading && !error && cars.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border"
            >
              <div className="relative">
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={250}
                  className="w-full h-56 object-contain p-4"
                />
                <div
                  className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full text-white ${
                    car.available ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {car.available ? "Available" : "Unavailable"}
                </div>
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-5 pb-5">
                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                  {car.name}
                </h3>
                <p className="text-gray-700 font-medium">
                  ${car.price}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    per day
                  </span>
                </p>

                <div className="flex items-center justify-start text-gray-500 text-sm mt-2 space-x-2">
                  <Car size={14} />
                  <span>{car.seats} seats</span>•<span>{car.transmission}</span>•
                  <span>{car.category}</span>
                </div>

                <button
                  disabled={!car.available}
                  className={`w-full mt-4 text-sm font-medium py-2.5 rounded-md transition ${
                    car.available
                      ? "bg-black text-white hover:bg-gray-900"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {car.available ? "Reserve Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={page === 1}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-2 border rounded-md ${
                page === i + 1
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={page === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}