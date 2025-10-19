"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";

interface CarDetails {
  id: string;
  name: string;
  model: string;
  price_per_day: number;
  photo: string;
}

interface ReservationFormData {
  car: string;
  pickup_date: string;
  return_date: string;
  pickup_location: string;
  additional_notes?: string;
}

const UserReserveForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const carId = searchParams.get("id");

  const [car, setCar] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ReservationFormData>({
    car: carId || "",
    pickup_date: "",
    return_date: "",
    pickup_location: "",
    additional_notes: "",
  });

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
      if (!response.ok) throw new Error("Failed to fetch car details");
      const data = await response.json();
      setCar(data);
      setFormData((prev) => ({ ...prev, car: id }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching car details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotalDays = () => {
    if (formData.pickup_date && formData.return_date) {
      const pickup = new Date(formData.pickup_date);
      const returnDate = new Date(formData.return_date);
      const diffTime = Math.abs(returnDate.getTime() - pickup.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return days > 0 && car ? days * car.price_per_day : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.pickup_date ||
      !formData.return_date ||
      !formData.pickup_location
    ) {
      setError("Please fill in all required fields");
      return;
    }

    const pickup = new Date(formData.pickup_date);
    const returnDate = new Date(formData.return_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (pickup < today) {
      setError("Pickup date cannot be in the past");
      return;
    }

    if (returnDate <= pickup) {
      setError("Return date must be after pickup date");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const reservationData = {
        ...formData,
        carDetails: car,
        totalDays: calculateTotalDays(),
        totalPrice: calculateTotalPrice(),
        timestamp: new Date().toISOString(),
      };

      // Store in sessionStorage for after signup/login
      sessionStorage.setItem("pendingReservation", JSON.stringify(reservationData));

      // Simulate API success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Soft reservation created:", formData);
      setSuccess(true);

      // Background send
      fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).catch((err) =>
        console.error("Background submission failed:", err)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit reservation");
      console.error("Error submitting reservation:", err);
    } finally {
      setSubmitting(false);
    }
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

  if (!car && error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">{error}</p>
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

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center relative">
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your reservation has been recorded.
            <br />
            Go to your profile to view your reservations.
          </p>

          <button
            onClick={() => router.push("/pages/profile/page")}
            className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-3"
          >
            Go to profile
          </button>

          <button
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Continue browsing
          </button>
        </div>
      </div>
    );
  }

  const totalDays = calculateTotalDays();
  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Complete Your Reservation
        </h1>

        {/* Car Summary */}
        {car && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded overflow-hidden">
                {car.photo ? (
                  <Image
                    src={car.photo}
                    width={96}
                    height={96}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2
                        l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6
                        20h12a2 2 0 002-2V6a2 2 0
                        00-2-2H6a2 2 0 00-2 2v12a2 2
                        0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {car.name} {car.model}
                </h3>
                <p className="text-gray-600">${car.price_per_day} per day</p>
              </div>
              {totalDays > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {totalDays} day{totalDays > 1 ? "s" : ""}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalPrice}
                  </p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reservation Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Reservation Details
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pickup_date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pickup Date *
              </label>
              <input
                type="date"
                id="pickup_date"
                name="pickup_date"
                value={formData.pickup_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="return_date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Return Date *
              </label>
              <input
                type="date"
                id="return_date"
                name="return_date"
                value={formData.return_date}
                onChange={handleInputChange}
                min={formData.pickup_date || new Date().toISOString().split("T")[0]}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="pickup_location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pickup Location *
              </label>
              <input
                type="text"
                id="pickup_location"
                name="pickup_location"
                value={formData.pickup_location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="123 Main Street, City"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="additional_notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                placeholder="Any special requests or requirements..."
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReserveForm;
