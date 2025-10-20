"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CarDetails {
  id: string;
  name: string;
  model: string;
  price_per_day: number;
  photo: string;
}

const UserReserveFormComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const carId = searchParams.get("id");

  const [car, setCar] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    if (carId) {
      fetchCarDetails(carId);
    } else {
      setError("No car ID found");
      setLoading(false);
    }
  }, [carId]);

  const fetchCarDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/available-cars/${id}`);
      if (!response.ok) throw new Error("Failed to fetch car details");
      const data = await response.json();
      setCar(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching car");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      alert("Please fill in both pickup and return dates.");
      return;
    }
    router.push(`/payment?carId=${car?.id}&pickup=${pickupDate}&return=${returnDate}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-red-500">{error || "Car not found"}</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Reserve {car.name} {car.model}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Pickup Date
            </label>
                      <input
                          aria-label="date"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Return Date
            </label>
                      <input
                          aria-label="date"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <p className="text-gray-800 font-semibold">
              Price per day: ${car.price_per_day}
            </p>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserReserveFormComponent;