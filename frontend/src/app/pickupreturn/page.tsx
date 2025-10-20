"use client";

import React, { useState } from "react";

interface ReservationData {
  carSelected: string;
  pickupDate: string;
  returnDate: string;
  rentalDuration: number;
}

interface PickupReturnDetailsProps {
  reservationData?: ReservationData;
  onContinue?: () => void;
}

const PickupReturnDetails: React.FC<PickupReturnDetailsProps> = ({
  reservationData = {
    carSelected: "Lamborghini Huracán 2022",
    pickupDate: "Mon, Nov 3rd, 2025",
    returnDate: "Wed, Nov 5th, 2025",
    rentalDuration: 2,
  },
  onContinue,
}) => {
  const [showModal, setShowModal] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(
    "250 Greenfield Avenue, Brooklyn, NY 11211, United States"
  );
  const [returnLocation, setReturnLocation] = useState(
    "250 Greenfield Avenue, Brooklyn, NY 11211, United States"
  );
  const [pickupTime, setPickupTime] = useState("8am");
  const [returnTime, setReturnTime] = useState("8am");

  const handleContinue = (): void => {
    setShowModal(false);
    onContinue?.();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-6xl p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Reservation Summary</h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Car selected:</span>{" "}
                {reservationData.carSelected}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Pick-up Date:</span>{" "}
                {reservationData.pickupDate}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Return Date:</span>{" "}
                {reservationData.returnDate}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Rental Duration:</span>{" "}
                {reservationData.rentalDuration} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl relative p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              aria-label="Close"
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

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-r pr-6">
                <h3 className="text-xl font-bold mb-4">Reservation Summary</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Car selected:</strong> {reservationData.carSelected}
                  </p>
                  <p>
                    <strong>Pick-up Date:</strong> {reservationData.pickupDate}
                  </p>
                  <p>
                    <strong>Return Date:</strong> {reservationData.returnDate}
                  </p>
                  <p>
                    <strong>Rental Duration:</strong>{" "}
                    {reservationData.rentalDuration} days
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">
                  Pick-up and Return Details
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <label className="block font-semibold mb-1">
                      Pick-up Location
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        aria-label="Text"
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                      />
                      <span className="text-gray-400">📍</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Return Location
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        aria-label="Text"
                        type="text"
                        value={returnLocation}
                        onChange={(e) => setReturnLocation(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                      />
                      <span className="text-gray-400">📍</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Preferred Pick-up Time
                    </label>
                    <input
                      aria-label="Text"
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Preferred Return Time
                    </label>
                    <input
                      aria-label="Text"
                      type="text"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-4"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PickupReturnPage: React.FC = () => {
  return <PickupReturnDetails />;
};

export default PickupReturnPage;