"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CarDetails {
  id: string;
  name: string;
  model: string;
  year: string;
  colour: string;
  car_type: string;
  price_per_day: number;
  pickup_location: string;
  status: string;
  rules: string;
  seating_capacity: number;
  luggage_capacity: number;
  wheel_drive: string;
  fuel_type: string;
  transmission: string;
  photo: string;
}

const SoftReserveContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const carId = searchParams.get("id");

  const [car, setCar] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (carId) {
      fetchCarDetails(carId);
    } else {
      setError("No car ID provided");
      setLoading(false);
    }
  }, [carId]);

  const fetchCarDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/available-cars/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch car details");
      }

      const data = await response.json();
      setCar(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching car details:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCarType = (type: string) => type.charAt(0).toUpperCase() + type.slice(1);
  const formatWheelDrive = (drive: string) => {
    const driveMap: { [key: string]: string } = {
      "2-wheel": "2-Wheel Drive",
      "4-wheel": "All-Wheel Drive (AWD)",
    };
    return driveMap[drive] || drive;
  };
  const formatFuelType = (fuel: string) => {
    const fuelMap: { [key: string]: string } = {
      petrol: "Petrol (Gasoline)",
      diesel: "Diesel",
      electric: "Electric",
      hybrid: "Hybrid",
    };
    return fuelMap[fuel] || fuel;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-gray-600" />
          <p className="text-gray-600 text-lg">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || "Car not found"}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Image */}
          <div className="bg-gray-100 flex items-center justify-center p-8">
            {car.photo && car.photo.trim() !== "" ? (
              <Image
                src={car.photo}
                alt={`${car.name} ${car.model}`}
                width={400}
                height={300}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 rounded">
                <div className="text-center text-gray-600">
                  <svg
                    className="w-20 h-20 mx-auto mb-2 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-medium">No Image Available</p>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Details */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Make:</span> {car.name}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Model:</span> {car.model}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Type:</span> {formatCarType(car.car_type)}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Year:</span> {car.year}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Color:</span> {car.colour}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Transmission:</span>{" "}
                {car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Seat Capacity:</span> {car.seating_capacity} seats
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Luggage Capacity:</span> {car.luggage_capacity} liters
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Fuel Type:</span> {formatFuelType(car.fuel_type)}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Wheel Drive:</span> {formatWheelDrive(car.wheel_drive)}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Rules:</span> {car.rules || "No rules attached"}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-lg font-bold text-gray-900">
                Price: ${car.price_per_day} per day
              </p>

              <button
                onClick={() => router.push(`/softReserveForm?id=${car.id}`)}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftReserveContent;