"use client"
import React from 'react';
import ProfileWrapper from '../../userComponent/profile/ProfileWrapper';

export default function PersonalInformationPage() {
  return (
    <ProfileWrapper activeTab="personal">
      <div className="flex gap-8">
        {/* Profile Image Section */}
        <div className="flex-shrink-0">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center mb-3">
            <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex justify-center mb-2">
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-sm font-medium mb-1">John White</p>
          <p className="text-center text-xs text-red-600 underline cursor-pointer">
            Uploading Information
          </p>
        </div>

        {/* Form Section */}
        <div className="flex-1 space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="johnwhite@gmail.com"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                First Name and Last Name
              </label>
              <input
                type="text"
                defaultValue="johnwhite@gmail.com"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1(202) 555-0174"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Country
              </label>
              <input
                type="text"
                defaultValue="United States"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                State
              </label>
              <input
                type="text"
                defaultValue="NY"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                City
              </label>
              <input
                type="text"
                defaultValue="New York"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Address
              </label>
              <input
                type="text"
                defaultValue="2464 Park Avenue, New York, United States"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <div className="pt-2">
            <button className="w-full px-4 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800">
              Update Personal Information
            </button>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
}