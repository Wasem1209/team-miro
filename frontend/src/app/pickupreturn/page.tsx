"use client"
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

  const handleContinue = () => {
    setShowModal(false);
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {/* Background Content - Reservation Summary */}
      <div className="bg-white rounded-lg shadow-md w-full max-w-6xl p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Reservation Summary</h2>
            
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Car selected:</span> {reservationData.carSelected}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Pick-up Date:</span> {reservationData.pickupDate}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Return Date:</span> {reservationData.returnDate}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Rental Duration:</span> {reservationData.rentalDuration} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
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

            <div className="grid md:grid-cols-2">
              {/* Left Side - Reservation Summary */}
              <div className="p-8 border-r">
                <h3 className="text-xl font-bold mb-6">Reservation Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Car selected:</span> {reservationData.carSelected}
                  </p>
                  <p>
                    <span className="font-semibold">Pick-up Date:</span> {reservationData.pickupDate}
                  </p>
                  <p>
                    <span className="font-semibold">Return Date:</span> {reservationData.returnDate}
                  </p>
                  <p>
                    <span className="font-semibold">Rental Duration:</span> {reservationData.rentalDuration} days
                  </p>
                </div>
              </div>

              {/* Right Side - Pick-up and Return Details */}
              <div className="p-8 bg-gray-50">
                <h3 className="text-xl font-bold mb-6">Pick-up and Return details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Pick-up Location
                    </label>
                    <div className="flex items-start gap-2">
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      />
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Return Location
                    </label>
                    <div className="flex items-start gap-2">
                      <input
                        type="text"
                        value={returnLocation}
                        onChange={(e) => setReturnLocation(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      />
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Preferred Pick-up time
                    </label>
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Preferred Return time
                    </label>
                    <input
                      type="text"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-6"
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

export default PickupReturnDetails;