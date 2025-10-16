'use client';

import React from 'react';
import { useState } from 'react';
import { User, Settings, HelpCircle, BookOpen, LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  id: 'profile' | 'reservations' | 'settings' | 'help';
}

interface Tab {
  name: string;
  value: 'pending' | 'confirmed' | 'modified' | 'active' | 'completed' | 'cancelled' | 'noshow' | 'dispute';
  count: number;
}

interface Reservation {
  id: number;
  car: string;
  price: number;
  duration: number;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  status: 'Pending' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';
  seats: number;
  transmission: 'Automatic' | 'Manual';
  premium: boolean;
}

export default function ReservationsPage(){
  const [activePage, setActivePage] = useState<'profile' | 'reservations' | 'settings' | 'help'>('reservations');

  const navItems: NavItem[] = [
    { icon: User, label: 'Profile', id: 'profile' },
    { icon: BookOpen, label: 'Reservations', id: 'reservations' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: HelpCircle, label: 'Help Center', id: 'help' },
  ];

  const tabs: Tab[] = [
    { name: 'Pending', value: 'pending', count: 1 },
    { name: 'Confirmed', value: 'confirmed', count: 0 },
    { name: 'Modified', value: 'modified', count: 0 },
    { name: 'Active', value: 'active', count: 0 },
    { name: 'Completed', value: 'completed', count: 0 },
    { name: 'Cancelled', value: 'cancelled', count: 0 },
    { name: 'No show', value: 'noshow', count: 0 },
    { name: 'Dispute', value: 'dispute', count: 0 },
  ];

  const reservations: Reservation[] = [
    {
      id: 1,
      car: 'Lamborghini Huracán 2022',
      price: 1200,
      duration: 2,
      pickupDate: 'Mon, Nov 3rd, 2025',
      pickupTime: '8am',
      returnDate: 'Wed, Nov 5th, 2025',
      returnTime: '8am',
      status: 'Pending',
      seats: 2,
      transmission: 'Automatic',
      premium: true,
    },
  ];

  const navLinks: string[] = ['Home', 'Browse Cars', 'My Bookings', 'Contact us', 'About us'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">DriveEasy</h1>
          <nav className="flex items-center space-x-8">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-gray-700 hover:text-gray-900 font-medium"
              >
                {item}
              </a>
            ))}
            <button className="flex items-center space-x-2 text-sm text-gray-700">
              <User size={16} />
              <span>Welcome John</span>
              <span className="text-gray-400">▼</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 p-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  activePage === item.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Reservations Content */}
        <div className="flex-1 p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Reservations</h2>

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`px-1 py-3 text-sm font-medium border-b-2 transition ${
                  tab.value === 'pending'
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </div>

          {/* Reservation Card */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex space-x-6 flex-1">
                {/* Car Image */}
                <div className="w-40 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-6xl">🏎️</span>
                </div>

                {/* Car Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {reservations[0].car}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Price per day: <span className="font-semibold text-gray-900">${reservations[0].price}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Rental Duration: {reservations[0].duration} days
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    Pick up Date and Time: {reservations[0].pickupDate}, {reservations[0].pickupTime}
                    <br />
                    Return Date and Time: {reservations[0].returnDate}, {reservations[0].returnTime}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    <span>👥 {reservations[0].seats} seats</span>
                    <span className="text-gray-300">•</span>
                    <span>⚙️ {reservations[0].transmission}</span>
                    {reservations[0].premium && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span>👑 Premium</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end space-y-3 flex-shrink-0">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {reservations[0].status}
                </span>
                <button className="px-6 py-2 border border-gray-400 rounded-lg text-gray-900 text-sm font-medium hover:bg-gray-50 transition">
                  Modify/Cancel Reservation
                </button>
                <button className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition">
                  View More Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}