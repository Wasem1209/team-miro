"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type CarItem = {
  id: number;
  name: string;
  image?: string;
  available: boolean;
  price_per_day?: number;
};

export default function CreateReservation() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    driversLicense: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    pickupLocation: "",
    returnLocation: "",
    selectedCarId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Cars from backend 
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/`);
        if (!res.ok) throw new Error("Failed to load car listings");
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
        // fallback placeholder (in preview mode)
        setCars([
          { id: 1, name: "Lamborghini Huracán 2022", available: true, price_per_day: 1200 },
          { id: 2, name: "BMW M3", available: true, price_per_day: 399 },
          { id: 3, name: "Porsche 911 Turbo", available: false, price_per_day: 1000 },
          { id: 4, name: "Tesla Model S", available: true, price_per_day: 250 },
        ]);
      }
    };
    fetchCars();
  }, []);

  // Handle input changes
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Form validation
  function validateForm() {
    if (!form.email.trim()) return "Customer email is required.";
    if (!form.fullName.trim()) return "Customer's full name is required.";
    if (!form.phone.trim()) return "Customer's phone number is required.";
    if (!form.selectedCarId) return "Please select a car from your listings.";
    if (!form.pickupDate) return "Pick-up date is required.";
    if (!form.returnDate) return "Return date is required.";
    return null;
  }

  // Submit form
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const invalid = validateForm();
    if (invalid) {
      setError(invalid);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer_email: form.email,
        customer_name: form.fullName,
        phone: form.phone,
        address: form.address,
        country: form.country,
        state: form.state,
        city: form.city,
        drivers_license: form.driversLicense,
        pickup_date: form.pickupDate,
        pickup_time: form.pickupTime,
        return_date: form.returnDate,
        return_time: form.returnTime,
        pickup_location: form.pickupLocation,
        return_location: form.returnLocation,
        car_id: Number(form.selectedCarId),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservation/new/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to create reservation");
      }

      setSuccess("Reservation successfully created");
      setForm({
        email: "",
        fullName: "",
        phone: "",
        address: "",
        country: "",
        state: "",
        city: "",
        driversLicense: "",
        pickupDate: "",
        pickupTime: "",
        returnDate: "",
        returnTime: "",
        pickupLocation: "",
        returnLocation: "",
        selectedCarId: "",
      });
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <Link
                href="/dashboard/reservations"
                className="inline-flex items-center gap-2 text-gray-700 hover:underline"
              >
                <ArrowLeft size={18} /> Back to Reservations
              </Link>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h1 className="text-xl md:text-2xl font-semibold mb-4">
                Create Reservation
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <Input label="Customer's Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
                    <Input label="Customer's Phone Number" name="phone" value={form.phone} onChange={handleChange} required />
                    <Input label="Customer's Country" name="country" value={form.country} onChange={handleChange} />
                    <Input label="Customer's City" name="city" value={form.city} onChange={handleChange} />
                    <Input label="Pick-up Date" name="pickupDate" type="date" value={form.pickupDate} onChange={handleChange} required />
                    <Input label="Preferred Pick-up Time" name="pickupTime" value={form.pickupTime} onChange={handleChange} />
                    <Input label="Pick-up Location" name="pickupLocation" value={form.pickupLocation} onChange={handleChange} />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <Input label="Customer's Full Name" name="fullName" value={form.fullName} onChange={handleChange} required />
                    <Input label="Customer's Address" name="address" value={form.address} onChange={handleChange} />
                    <Input label="Customer's State" name="state" value={form.state} onChange={handleChange} />
                    <Input label="Driver's License Number" name="driversLicense" value={form.driversLicense} onChange={handleChange} />
                    <Input label="Return Date" name="returnDate" type="date" value={form.returnDate} onChange={handleChange} required />
                    <Input label="Preferred Return Time" name="returnTime" value={form.returnTime} onChange={handleChange} />
                    <Input label="Return Location" name="returnLocation" value={form.returnLocation} onChange={handleChange} />
                  </div>
                </div>

                {/* Select Car */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Car
                  </label>
                  <select
                    aria-label="Select car"
                    name="selectedCarId"
                    value={form.selectedCarId}
                    onChange={handleChange}
                    className="w-full rounded px-4 py-3 bg-white border border-gray-200 focus:outline-none"
                    required
                  >
                    <option value="">Pick a car from your listings</option>
                    {cars.map((c) => (
                      <option key={c.id} value={String(c.id)}>
                        {c.name} {c.available ? "(Available)" : "(Unavailable)"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Feedback */}
                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white py-4 rounded-full text-lg font-semibold hover:bg-gray-900 disabled:opacity-60 transition"
                  >
                    {submitting ? "Reserving..." : "Reserve"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ✅ Small reusable Input component
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        aria-label="name"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        className="w-full rounded px-4 py-3 bg-white border border-gray-200 focus:outline-none"
      />
    </div>
  );
}