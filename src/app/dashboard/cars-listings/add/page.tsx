"use client";

import React, { useState, ChangeEvent, FormEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const softReserveOptions = [
  "15 mins",
  "30 mins",
  "1 hr",
  "2 hrs",
  "4 hrs",
  "8 hrs",
  "24 hrs",
];

const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

export default function AddCarPage(): JSX.Element {
  const router = useRouter();

  // For the base api
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    make: "",
    model: "",
    type: "",
    year: "",
    seat_capacity: "",
    fuel_type: "",
    ac: "",
    luggage: "",
    wheel_drive: "",
    price_per_day: "",
    available_start: "",
    available_end: "",
    soft_reserve_limit: "",
    rules: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Handle input change
  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle file selection + preview
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setErrorMsg(null);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(String(reader.result));
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  // Simple validation
  function validate() {
    if (!form.make.trim()) return "Please enter the car make.";
    if (!form.model.trim()) return "Please enter the car model.";
    if (!form.price_per_day || Number.isNaN(Number(form.price_per_day)))
      return "Please enter a valid price per day.";
    if (!form.available_start) return "Please choose availability start date.";
    if (!form.available_end) return "Please choose availability end date.";
    return null;
  }

  // Submition to the backend
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const invalid = validate();
    if (invalid) {
      setErrorMsg(invalid);
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));

      if (imageFile) {
        payload.append("image", imageFile);
      }

      // Post to the backend
      const res = await fetch(`${API_BASE}/api/v1/car/new/`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add car");
      }

      setSuccessMsg(" Car added successfully!");
      setTimeout(() => router.push("/dashboard/cars-listings"), 1000);
    } catch (err) {
      if (err instanceof Error)
        setErrorMsg(err.message || "An error occurred while adding the car");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <div className="mb-4">
            <Link
              href="/dashboard/cars-listings"
              className="inline-flex items-center gap-2 text-gray-700 hover:underline"
            >
              <ArrowLeft size={18} /> Back to Cars/Listings
            </Link>
          </div>

          {/* Form */}
          <div className="bg-white border rounded-lg p-6">
            <h1 className="text-xl md:text-2xl font-semibold mb-4">Add Car</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-4">
                  {/* Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="image"
                        className="flex-1 cursor-pointer bg-gray-50 border border-gray-200 rounded px-4 py-3 flex items-center justify-between"
                      >
                        <span
                          className={imageFile ? "text-gray-900" : "text-gray-400"}
                        >
                          {imageFile ? imageFile.name : "Select a picture"}
                        </span>
                        <span className="text-gray-500">📷</span>
                      </label>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </div>

                    {imagePreview && (
                      <div className="mt-3">
                        <div className="w-48 h-32 relative rounded overflow-hidden border">
                          <Image
                            src={imagePreview}
                            alt="preview"
                            width={192}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* A Model */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model
                    </label>
                    <input
                      name="model"
                      value={form.model}
                      onChange={handleInputChange}
                      placeholder="Eg. Camry"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      aria-label="Select year"
                      name="year"
                      value={form.year}
                      onChange={handleInputChange}
                      className="w-full rounded px-4 py-3 bg-white border border-gray-200 focus:outline-none"
                    >
                      <option value="">Eg. 2021</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Seat Capacity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seat Capacity
                    </label>
                    <input
                      name="seat_capacity"
                      value={form.seat_capacity}
                      onChange={handleInputChange}
                      placeholder="Eg. 2"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuel Type
                    </label>
                    <input
                      name="fuel_type"
                      value={form.fuel_type}
                      onChange={handleInputChange}
                      placeholder="Eg. Petrol"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Price per day */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per day
                    </label>
                    <input
                      name="price_per_day"
                      value={form.price_per_day}
                      onChange={handleInputChange}
                      placeholder="Eg. $1000"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Availability End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability End Date
                    </label>
                    <input
                      aria-label="Date"
                      type="date"
                      name="available_end"
                      value={form.available_end}
                      onChange={handleInputChange}
                      className="w-full rounded px-4 py-3 bg-white border border-gray-200 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Make
                    </label>
                    <input
                      name="make"
                      value={form.make}
                      onChange={handleInputChange}
                      placeholder="Eg. Toyota"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <input
                      name="type"
                      value={form.type}
                      onChange={handleInputChange}
                      placeholder="Eg. Sedan"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Air Conditioning (A/C)
                    </label>
                    <input
                      name="ac"
                      value={form.ac}
                      onChange={handleInputChange}
                      placeholder="Eg. Dual-Zone Automatic"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Luggage Capacity
                    </label>
                    <input
                      name="luggage"
                      value={form.luggage}
                      onChange={handleInputChange}
                      placeholder="Eg. 100 liters"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wheel Drive
                    </label>
                    <input
                      name="wheel_drive"
                      value={form.wheel_drive}
                      onChange={handleInputChange}
                      placeholder="Eg. AWD"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability Start Date
                    </label>
                    <input
                      aria-label="Dtae"
                      type="date"
                      name="available_start"
                      value={form.available_start}
                      onChange={handleInputChange}
                      className="w-full rounded px-4 py-3 bg-white border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soft Reserve Time Limit
                    </label>
                    <select
                      aria-label="Softreserve limit"
                      name="soft_reserve_limit"
                      value={form.soft_reserve_limit}
                      onChange={handleInputChange}
                      className="w-full rounded px-4 py-3 bg-white border border-gray-200 focus:outline-none"
                    >
                      <option value="">Select time limit</option>
                      {softReserveOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Rules here
                </label>
                <textarea
                  name="rules"
                  value={form.rules}
                  onChange={handleInputChange}
                  placeholder="Add Rules here"
                  rows={6}
                  className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                />
              </div>

              {/* Status messages */}
              {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
              {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-full text-lg font-semibold hover:bg-gray-900 disabled:opacity-60"
                >
                  {loading ? "Adding..." : "Add Car"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}