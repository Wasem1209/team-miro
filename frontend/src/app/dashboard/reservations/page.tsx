"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Reservation {
  id: number;
  username: string;
  avatar: string;
  car: string;
  date: string;
  payment: string;
  status: string;
}

interface CarDetails {
  make: string;
  model: string;
  type: string;
  year: number;
  ac: string;
  seats: string;
  luggage: string;
  fuel: string;
  drive: string;
  rules: string;
  price: string;
  image: string;
}

const Reservation = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarDetails | null>(null);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [carLoading, setCarLoading] = useState<boolean>(false);
  const [carError, setCarError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservation/`);
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data: Reservation[] = await res.json();
        setReservations(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // Status colors
  const statusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-orange-500 text-white";
      case "Cancelled": return "bg-red-600 text-white";
      case "Modified": return "bg-yellow-500 text-white";
      case "Confirmed": return "bg-green-500 text-white";
      case "Completed": return "bg-emerald-600 text-white";
      default: return "bg-gray-400 text-white";
    }
  };

  // Confirm reservation
  const handleConfirm = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservation/${id}/update/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Confirmed" }),
      });
      if (!res.ok) throw new Error("Failed to confirm reservation");
      setReservations(prev =>
        prev.map(r => (r.id === id ? { ...r, status: "Confirmed" } : r))
      );
    } catch (err) {
      console.error("Failed to confirm reservation:", err);
    }
  };

  // Cancel reservation
  const handleCancel = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservation/${id}/cancel/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to cancel reservation");
      setReservations(prev =>
        prev.map(r => (r.id === id ? { ...r, status: "Cancelled" } : r))
      );
    } catch (err) {
      console.error("Failed to cancel reservation:", err);
    }
  };

  // Fetch car details dynamically
  const handleViewDetails = async (id: number) => {
    setSelectedReservationId(id);
    setCarError(null);
    setCarLoading(true);
    setSelectedCar(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservation/${id}/`);
      if (!res.ok) throw new Error("Failed to fetch reservation details");
      const data = await res.json();
      setSelectedCar(data.car_details || data); 
    } catch (err: unknown) {
      if (err instanceof Error) setCarError(err.message);
      else setCarError("Unable to load car details.");
    } finally {
      setCarLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedCar(null);
    setSelectedReservationId(null);
    setCarError(null);
  };

  if (loading)
    return <div className="flex justify-center items-center min-h-screen text-gray-600">Loading reservations...</div>;

  if (error)
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">
      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search reservations..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={() => router.push("/dashboard/reservations/create+")}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition text-sm sm:text-base"
        >
          <Plus size={18} /> Create Reservation
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">Usernames</th>
              <th className="p-4">Car Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((item) => (
              <tr key={item.id} className="border-t text-sm text-gray-700 hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <Image src={item.avatar || "/user.png"} alt={item.username} width={32} height={32} className="rounded-full" />
                  {item.username}
                </td>
                <td className="p-4">{item.car}</td>
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.payment}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right flex flex-wrap justify-end gap-2">
                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className="border border-gray-400 px-4 py-1 rounded-full text-sm hover:bg-gray-100"
                  >
                    View Details
                  </button>
                  {item.status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancel(item.id)}
                      className="border border-red-500 text-red-600 px-4 py-1 rounded-full text-sm hover:bg-red-50"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleConfirm(item.id)}
                    disabled={item.status !== "Pending" && item.status !== "Modified"}
                    className={`px-4 py-1 rounded-full text-sm transition ${
                      item.status === "Pending" || item.status === "Modified"
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The Modal */}
      {(carLoading || selectedCar || carError) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex flex-col sm:flex-row overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            {carLoading && (
              <div className="flex items-center justify-center w-full h-96 text-gray-600">
                Loading car details...
              </div>
            )}

            {carError && !carLoading && (
              <div className="flex flex-col items-center justify-center w-full h-96 text-red-600">
                <p>{carError}</p>
                <button
                  onClick={() =>
                    selectedReservationId && handleViewDetails(selectedReservationId)
                  }
                  className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Retry
                </button>
              </div>
            )}

            {selectedCar && !carLoading && !carError && (
              <>
                <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
                  <Image
                    src={selectedCar.image || "/car-placeholder.png"}
                    alt={selectedCar.model}
                    width={500}
                    height={400}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      {selectedCar.make} {selectedCar.model}
                    </h2>
                    <ul className="space-y-1 text-gray-700 text-sm sm:text-base">
                      <li><b>Type:</b> {selectedCar.type}</li>
                      <li><b>Year:</b> {selectedCar.year}</li>
                      <li><b>Air Conditioning:</b> {selectedCar.ac}</li>
                      <li><b>Seats:</b> {selectedCar.seats}</li>
                      <li><b>Luggage Capacity:</b> {selectedCar.luggage}</li>
                      <li><b>Fuel Type:</b> {selectedCar.fuel}</li>
                      <li><b>Drive:</b> {selectedCar.drive}</li>
                      <li><b>Rules:</b> {selectedCar.rules}</li>
                    </ul>
                    <p className="mt-4 font-semibold text-gray-800">Price: {selectedCar.price}</p>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={closeModal}
                      className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;