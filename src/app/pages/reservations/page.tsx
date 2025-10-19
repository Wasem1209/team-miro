'use client';
import React from 'react';
import Sidebar from '../../userComponent/profile/Sidebar';

export default function ReservationsPage() {
  return (
    <div className="flex gap-6 max-w-7xl mx-auto p-6">
      <Sidebar />
      
      <main className="flex-1">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Reservations</h2>
            <p className="text-gray-600">Reservations content will go here...</p>
          </div>
        </div>
      </main>
    </div>
  );
}