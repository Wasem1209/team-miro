"use client";

import React, { useState } from "react";

export default function CarsCurrentlyReserved() {
  const reservedCars = [
    {
      id: 1,
      name: "Toyota Corolla",
      image:
        "https://images.unsplash.com/photo-1571607389386-4e86d61a82b2?auto=format&fit=crop&w=600&q=80",
      plateNumber: "ABC-123",
      status: "Active",
      pickupDate: "2025-10-10",
      returnDate: "2025-10-17",
    },
    {
      id: 2,
      name: "Honda Civic",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
      plateNumber: "XYZ-456",
      status: "Active",
      pickupDate: "2025-10-12",
      returnDate: "2025-10-18",
    },
    {
      id: 3,
      name: "Mercedes-Benz GLA",
      image:
        "https://images.unsplash.com/photo-1617469165789-02144f0aaf7c?auto=format&fit=crop&w=600&q=80",
      plateNumber: "BEN-789",
      status: "Active",
      pickupDate: "2025-10-13",
      returnDate: "2025-10-19",
    },
  ];

  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Cars Currently Reserved
        </h2>
        <span className="text-sm text-gray-500">
          Total Reserved: {reservedCars.length}
        </span>
      </div>

      {/* Desktop / Tablet View */}
      <div className="hidden sm:block bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Car</th>
              <th className="px-4 py-3">Plate Number</th>
              <th className="px-4 py-3">Pickup Date</th>
              <th className="px-4 py-3">Return Date</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservedCars.map((car) => (
              <tr
                key={car.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 flex items-center gap-3 min-w-[200px]">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
                  />
                  <span className="font-medium text-gray-800">{car.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{car.plateNumber}</td>
                <td className="px-4 py-3 text-gray-700">{car.pickupDate}</td>
                <td className="px-4 py-3 text-gray-700">{car.returnDate}</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    {car.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex flex-col gap-3">
        {reservedCars.map((car) => (
          <div
            key={car.id}
            className="border rounded-xl bg-white shadow-sm transition hover:shadow-md"
          >
            <button
              onClick={() => setOpenId(openId === car.id ? null : car.id)}
              className="w-full flex justify-between items-center p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{car.name}</p>
                  <p className="text-xs text-gray-500">{car.plateNumber}</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium">
                {openId === car.id ? "▲" : "▼"}
              </span>
            </button>

            {openId === car.id && (
              <div className="px-4 pb-3 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Pickup:</span>{" "}
                  {car.pickupDate}
                </p>
                <p>
                  <span className="font-medium">Return:</span>{" "}
                  {car.returnDate}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    {car.status}
                  </span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}