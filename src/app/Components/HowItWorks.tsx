"use client"
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Step 1 */}  
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-600 mx-auto mb-4">
              <span className="text-xl font-bold text-white">1</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Search & Select</h3>
            <p className="font-medium">Browse our inventory by make, model, type, and availability dates. Filter by your preferences and budget.</p>
          </div>
          {/* Step 2 */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-600 mx-auto mb-4">
              <span className="text-xl font-bold text-white">2</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Book & Pay</h3>
            <p className="font-medium">Make a soft reservation as a guest or create an account for firm booking. Secure payment with deposit handling.</p>
          </div>
          {/* Step 3 */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-600 mx-auto mb-4">
              <span className="text-xl font-bold text-white">3</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2"> Drive & Enjoy</h3>
            <p className="font-medium"> Pick up your car and hit the road. Manage your booking, modify dates or cancel through your dashboard</p>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;