"use client";
import React, { useState } from "react";

type PaymentScreen = {
  carSelected?: string;
  pricePerDay?: number;
  rentalDuration?: number;
  onPaymentSuccess?: () => void;
};

export default function PaymentScreen({
  carSelected = "Lamborghini Huracán 2022",
  pricePerDay = 1200,
  rentalDuration = 2,
  onPaymentSuccess,
}: PaymentScreen) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const rentalCharges = pricePerDay * rentalDuration;
  const deposit = 500;
  const total = rentalCharges + deposit;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
      onPaymentSuccess?.();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-6xl p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Payment Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            <div className="space-y-3 mb-6">
              <p className="text-sm">
                <span className="font-semibold">Car selected:</span> {carSelected}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Price per day:</span> ${pricePerDay}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Rental Duration:</span> {rentalDuration} days
              </p>
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Rental Charges:</span>
                <span>${rentalCharges}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Deposit:</span>
                <span>${deposit}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Card Payment Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Pay Securely with Your Card</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Cardholder Name"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 mt-6"
              >
                {isProcessing ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Processing Payment...</p>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-12 max-w-lg w-full relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Payment Successful!
              </h3>
              <p className="text-base font-semibold text-gray-900 mb-1">
                You have made a firm reservation
              </p>
              <p className="text-sm text-gray-600 mb-8">
                {"You'll receive an email with your reservation details shortly"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-white text-black border-2 border-black py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Browse more cars
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  View my reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
