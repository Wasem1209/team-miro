// app/after-signup/page.tsx
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ReservationData {
  carSelected: string;
  pickupDate: string;
  returnDate: string;
  rentalDuration: number;
  pickupLocation: string;
  returnLocation: string;
  preferredPickupTime: string;
  preferredReturnTime: string;
}

export default function AfterSignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reservationData] = useState<ReservationData>({
    carSelected: 'Lamborghini Huracán 2022',
    pickupDate: 'Mon, Nov 3rd, 2025',
    returnDate: 'Wed, Nov 5th, 2025',
    rentalDuration: 2,
    pickupLocation: '250 Greenfield Avenue, Brooklyn, NY 11211, United St...',
    returnLocation: '250 Greenfield Avenue, Brooklyn, NY 11211, United St...',
    preferredPickupTime: '8am',
    preferredReturnTime: '8am',
  });

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        console.log('Reservation created successfully');
      } else {
        console.error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white">
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Reservation Summary
            </h1>
          </div>
        </div>

        {/* Left Column - Reservation Summary */}
        <div className="mb-12">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-900 font-semibold">
                Car selected:
              </span>
              <span className="text-gray-900">
                {reservationData.carSelected}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-900 font-semibold">Pick-up Date:</span>
              <span className="text-gray-900">{reservationData.pickupDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-900 font-semibold">Return Date:</span>
              <span className="text-gray-900">
                {reservationData.returnDate}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-900 font-semibold">
                Rental Duration:
              </span>
              <span className="text-gray-900">
                {reservationData.rentalDuration} days
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Modal */}
        <div className="bg-gray-50 rounded-lg p-8 max-w-md ml-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Pick-up and Return details
            </h2>
            <button className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          {/* Pick-up Location */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Pick-up location
            </label>
            <p className="text-sm text-gray-600 mb-1">
              {reservationData.pickupLocation}
            </p>
            <button className="text-xs text-gray-500 underline">
              Change
            </button>
          </div>

          {/* Return Location */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Return Location
            </label>
            <p className="text-sm text-gray-600 mb-1">
              {reservationData.returnLocation}
            </p>
            <button className="text-xs text-gray-500 underline">
              Change
            </button>
          </div>

          {/* Preferred Pick-up Time */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Preferred Pick-up time
            </label>
            <input
              type="text"
              value={reservationData.preferredPickupTime}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 text-sm"
            />
          </div>

          {/* Preferred Return Time */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Preferred Return time
            </label>
            <input
              type="text"
              value={reservationData.preferredReturnTime}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 text-sm"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full bg-black hover:bg-gray-900 disabled:opacity-50 text-white font-semibold py-3 rounded transition-colors"
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}