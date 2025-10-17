import React from 'react';
import ProfileWrapper from '../../userComponent/profile/ProfileWrapper';

export default function CardInformationPage() {
  return (
    <ProfileWrapper activeTab="card">
      <div className="max-w-2xl space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              CVV
            </label>
            <input
              type="text"
              placeholder="123"
              maxLength={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Expiry Date
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button className="w-full px-4 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800">
            Update Card Information
          </button>
        </div>
      </div>
    </ProfileWrapper>
  );
}