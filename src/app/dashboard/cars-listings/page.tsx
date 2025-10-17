"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Search, Plus, X } from "lucide-react";

interface CarData {
  id: number;
  name: string;
  image: string;
  available: boolean;
  price_per_day: number;
}

export default function CarsListings() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<CarData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

  // Fetch all cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/car/`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("❌ Error fetching cars:", error);
        setError("Failed to load cars.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [API_BASE]);

  // Business owner can delete car
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/v1/car/${id}/delete/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete car");

      setCars((prev) => prev.filter((car) => car.id !== id));
      alert("Car deleted successfully ");
    } catch (error) {
      console.error("❌ Error deleting car:", error);
      alert("Failed to delete car ❌");
    }
  };

  // Fetch single car data for editing
  const handleEdit = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/car/${id}/`);
      if (!res.ok) throw new Error("Failed to fetch car details");
      const data = await res.json();
      setEditingCar(data);
    } catch (error) {
      console.error("❌ Error fetching car details:", error);
      alert("Unable to fetch car details.");
    }
  };

  // Business owner can update car
  const handleSave = async () => {
    if (!editingCar) return;
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/v1/car/${editingCar.id}/update/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingCar.name,
          available: editingCar.available,
          price_per_day: editingCar.price_per_day,
          image: editingCar.image,
        }),
      });

      if (!res.ok) throw new Error("Failed to update car");

      const updated = await res.json();
      setCars((prev) =>
        prev.map((car) => (car.id === updated.id ? updated : car))
      );

      setEditingCar(null);
      alert("Car updated successfully ");
    } catch (error) {
      console.error("❌ Error updating car:", error);
      setError("Failed to update car.");
    } finally {
      setIsSaving(false);
    }
  };

  // Filter cars by name
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading cars...
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
        {/* Search + Add */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            onClick={() => alert("Add Car modal coming soon")}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900"
          >
            Add Car <Plus size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 font-semibold text-lg border-b">Cars / Listings</div>

          <div className="grid grid-cols-4 text-sm font-semibold px-4 py-2 bg-gray-50 border-b">
            <span>Image</span>
            <span>Car Name</span>
            <span>Availability</span>
            <span>Price / Actions</span>
          </div>

          {/* Cars List */}
          <div>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="grid grid-cols-4 items-center px-4 py-3 border-b hover:bg-gray-50 transition"
                >
                  {/* Car Image */}
                  <div>
                    <Image
                      src={car.image || "/placeholder-car.png"}
                      width={80}
                      height={60}
                      alt={car.name}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </div>

                  {/*Car Name */}
                  <div className="font-medium text-gray-800">{car.name}</div>

                  {/* Car Availability */}
                  <div>
                    {car.available ? (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Available
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                        Unavailable
                      </span>
                    )}
                  </div>

                  {/* Price + Actions */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">${car.price_per_day}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleEdit(car.id)}
                        className="px-4 py-1 bg-black text-white rounded-full text-sm hover:bg-gray-800"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500">No cars available.</p>
            )}
          </div>
        </div>
      </main>

      {/* A modal to edit a car */}
      {editingCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setEditingCar(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Car</h2>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">Car Name</label>
              <input
                aria-label="test"
                type="text"
                value={editingCar.name}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, name: e.target.value })
                }
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
              />

              <label className="text-sm font-medium text-gray-700">
                Price per Day
              </label>
              <input
                aria-label="Enter number"
                type="number"
                value={editingCar.price_per_day}
                onChange={(e) =>
                  setEditingCar({
                    ...editingCar,
                    price_per_day: parseFloat(e.target.value),
                  })
                }
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
              />

              <label className="text-sm font-medium text-gray-700">Image URL</label>
              <input
                aria-label="Enter text"
                type="text"
                value={editingCar.image}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, image: e.target.value })
                }
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
              />

              <label className="text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                aria-label="T/F"
                value={editingCar.available ? "true" : "false"}
                onChange={(e) =>
                  setEditingCar({
                    ...editingCar,
                    available: e.target.value === "true",
                  })
                }
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setEditingCar(null)}
                  className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`px-5 py-2 rounded-full text-white ${
                    isSaving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}