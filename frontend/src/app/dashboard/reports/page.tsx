"use client";

import React, { useState } from "react";
import CarsCurrentlyReserved from "./Components/CarsCurrentlyReserved";
import Revenue from "./Components/Revenue";
import ActiveUsers from "./Components/ActiveUsers";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<
    "reserved" | "revenue" | "activeUsers"
  >("reserved");

  return (
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-[90rem] mx-auto">
        {/* Page Title */}
        <h1 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
          Reports
        </h1>
        <hr className="border-gray-300 mb-6" />

        {/* Tabs */}
        <div className="bg-white rounded-t-xl border border-b-0">
          <div className="flex items-center gap-8 px-6 pt-4">
            <button
              onClick={() => setActiveTab("reserved")}
              className={`pb-3 text-sm md:text-base font-medium transition-all relative
                ${
                  activeTab === "reserved"
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
                    : "text-gray-500 hover:text-black"
                }`}
            >
              Cars Currently Reserved
            </button>

            <button
              onClick={() => setActiveTab("revenue")}
              className={`pb-3 text-sm md:text-base font-medium transition-all relative
                ${
                  activeTab === "revenue"
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
                    : "text-gray-500 hover:text-black"
                }`}
            >
              Revenue
            </button>

            <button
              onClick={() => setActiveTab("activeUsers")}
              className={`pb-3 text-sm md:text-base font-medium transition-all relative
                ${
                  activeTab === "activeUsers"
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
                    : "text-gray-500 hover:text-black"
                }`}
            >
              Active Users
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-xl shadow-sm border border-t-0 mt-0 p-6">
          {activeTab === "reserved" ? (
            <CarsCurrentlyReserved />
          ) : activeTab === "revenue" ? (
            <Revenue />
          ) : (
            <ActiveUsers />
          )}
        </div>
      </div>
    </main>
  );
}