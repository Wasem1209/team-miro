"use client";

import React, { useState, ChangeEvent, FormEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

export default function AddCarPage(): JSX.Element {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    model: "",
    car_type: "",
    year: "",
    seating_capacity: "",
    fuel_type: "",
    air_condition: "",
    luggage_capacity: "",
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

  // Validate required fields
  function validate() {
    if (!form.name.trim()) return "Please enter the car name.";
    if (!form.model.trim()) return "Please enter the car model.";
    if (!form.price_per_day || Number.isNaN(Number(form.price_per_day)))
      return "Please enter a valid price per day.";
    if (!form.year) return "Please select the year.";
    if (!form.car_type) return "Please enter the car type.";
    return null;
  }

  // Submit to backend
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

      // use "photo" if backend expects that for image uploads
      if (imageFile) {
        payload.append("photo", imageFile);
      }

      const res = await fetch(`${API_BASE}/api/v1/car/new/`
        , {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add car");
      }

      setSuccessMsg("Car added successfully!");
      setTimeout(() => router.push("/app/dashboard/cars-listings"), 1500);
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
              href="/app/dashboard/cars-listings"
              className="inline-flex items-center gap-2 text-gray-700 hover:underline"
            >
              <ArrowLeft size={18} /> Back to Cars/Listings
            </Link>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h1 className="text-xl md:text-2xl font-semibold mb-4">Add Car</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT COLUMN */}
                <div className="space-y-4">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="photo"
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
                        id="photo"
                        name="photo"
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

                  {/* Model */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model
                    </label>
                    <input
                      name="model"
                      value={form.model}
                      onChange={handleInputChange}
                      placeholder="e.g. Camry"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      aria-label="year"
                      name="year"
                      value={form.year}
                      onChange={handleInputChange}
                      className="w-full rounded px-4 py-3 bg-white border border-gray-200 focus:outline-none"
                    >
                      <option value="">Select year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
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
                      placeholder="e.g. Petrol"
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
                      placeholder="e.g. 100"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Car Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Toyota Corolla"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Car Type
                    </label>
                    <input
                      name="car_type"
                      value={form.car_type}
                      onChange={handleInputChange}
                      placeholder="e.g. Sedan"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Seats */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seating Capacity
                    </label>
                    <input
                      name="seating_capacity"
                      value={form.seating_capacity}
                      onChange={handleInputChange}
                      placeholder="e.g. 4"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Luggage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Luggage Capacity
                    </label>
                    <input
                      name="luggage_capacity"
                      value={form.luggage_capacity}
                      onChange={handleInputChange}
                      placeholder="e.g. 100 liters"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>

                  {/* Wheel Drive */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wheel Drive
                    </label>
                    <input
                      name="wheel_drive"
                      value={form.wheel_drive}
                      onChange={handleInputChange}
                      placeholder="e.g. AWD"
                      className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Rules
                </label>
                <textarea
                  name="rules"
                  value={form.rules}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Add specific car usage rules here"
                  className="w-full rounded px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none"
                />
              </div>

              {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
              {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

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