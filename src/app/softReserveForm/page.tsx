import React, { useState } from "react";

interface FormData {
  emailAddress: string;
  firstName: string;
  phoneNumber: string;
  address: string;
  country: string;
  city: string;
  state: string;
  driversLicense: string;
  pickupDate: string;
  returnDate: string;
}

const SoftReserveForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    emailAddress: "",
    firstName: "",
    phoneNumber: "",
    address: "",
    country: "United States",
    city: "",
    state: "",
    driversLicense: "",
    pickupDate: "",
    returnDate: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-gray-100 rounded-lg shadow-md w-full max-w-4xl p-8">
        <h1 className="text-2xl font-bold mb-6">Fill the form below to continue</h1>

        <div className="space-y-6">
          {/* Row 1: Email and First Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                placeholder="johnwhite@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name and Last Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="johnwhite@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Row 2: Phone and Address */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 (202) 555-0173"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="2456 Park Avenue, New York, United States"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Row 3: Country, City, State */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="NY"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Row 4: Driver's License, Pickup Date, Return Date */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Driver License Number
              </label>
              <input
                type="text"
                name="driversLicense"
                value={formData.driversLicense}
                onChange={handleInputChange}
                placeholder="A1234567"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pick-up Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-12 max-w-lg w-full relative">
            <button
              onClick={() => setShowSuccessModal(false)}
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
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center mb-6">
                <svg
                  className="w-24 h-24 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Successful!
              </h3>
              <p className="text-base font-semibold text-gray-900 mb-2">
                This is a soft reservation
              </p>
              <p className="text-sm text-gray-600 mb-8">
                You have an hour to sign up to make a firm reservation, firm reservations override soft reservations
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Sign up now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftReserveForm;