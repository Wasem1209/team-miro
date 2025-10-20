"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

type FilterType = "Day" | "Week" | "Month";

interface CarData {
  id: number;
  image: string;
  name: string;
  pricePerDay: string;
  days: number;
  rentalCharges: string;
  deposit: string;
  total: string;
}

export default function Revenue() {
  const [filter, setFilter] = useState<FilterType>("Day");
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // 🧾 Mock revenue data for each filter
  const revenueDataByFilter: Record<FilterType, CarData[]> = {
    Day: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1600718379412-6b7fa63c8f7a?auto=format&fit=crop&w=800&q=80",
        name: "Lamborghini Huracán 2022",
        pricePerDay: "$1200",
        days: 1,
        rentalCharges: "$1200",
        deposit: "$500",
        total: "$1700",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1617814076905-9b3e7d24c45b?auto=format&fit=crop&w=800&q=80",
        name: "BMW M4",
        pricePerDay: "$399",
        days: 1,
        rentalCharges: "$399",
        deposit: "$33",
        total: "$432",
      },
    ],
    Week: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1600718379412-6b7fa63c8f7a?auto=format&fit=crop&w=800&q=80",
        name: "Lamborghini Huracán 2022",
        pricePerDay: "$1200",
        days: 7,
        rentalCharges: "$8400",
        deposit: "$500",
        total: "$8900",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1617814076905-9b3e7d24c45b?auto=format&fit=crop&w=800&q=80",
        name: "BMW M4",
        pricePerDay: "$399",
        days: 7,
        rentalCharges: "$2793",
        deposit: "$33",
        total: "$2826",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1600718379412-6b7fa63c8f7a?auto=format&fit=crop&w=800&q=80",
        name: "Porsche 911",
        pricePerDay: "$1000",
        days: 7,
        rentalCharges: "$7000",
        deposit: "$80",
        total: "$7080",
      },
    ],
    Month: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1600718379412-6b7fa63c8f7a?auto=format&fit=crop&w=800&q=80",
        name: "Lamborghini Huracán 2022",
        pricePerDay: "$1200",
        days: 30,
        rentalCharges: "$36000",
        deposit: "$500",
        total: "$36500",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1617814076905-9b3e7d24c45b?auto=format&fit=crop&w=800&q=80",
        name: "BMW M4",
        pricePerDay: "$399",
        days: 30,
        rentalCharges: "$11970",
        deposit: "$33",
        total: "$12003",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1600718379412-6b7fa63c8f7a?auto=format&fit=crop&w=800&q=80",
        name: "Porsche 911",
        pricePerDay: "$1000",
        days: 30,
        rentalCharges: "$30000",
        deposit: "$80",
        total: "$30080",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1617814076905-9b3e7d24c45b?auto=format&fit=crop&w=800&q=80",
        name: "Range Rover Sport",
        pricePerDay: "$800",
        days: 30,
        rentalCharges: "$24000",
        deposit: "$100",
        total: "$24100",
      },
    ],
  };

  const currentData = revenueDataByFilter[filter];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-50 p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Revenue
        </h2>

        {/* Filter Dropdown */}
        <div className="relative">
          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white text-gray-700 hover:border-blue-500 transition-all sm:hidden"
          >
            <Filter className="w-4 h-4 text-gray-600" />
            Per: {filter}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden z-10 sm:hidden"
              >
                {(["Day", "Week", "Month"] as FilterType[]).map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setFilter(option);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                      filter === option ? "bg-blue-100 font-medium" : ""
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Desktop Select */}
          <div className="hidden sm:flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <label
              htmlFor="filter"
              className="text-sm text-gray-600 font-medium"
            >
              Per:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer bg-white"
            >
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* 🖥 Table for Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Image</th>
                  <th className="px-4 py-3 font-medium">Car Name</th>
                  <th className="px-4 py-3 font-medium">Price per day</th>
                  <th className="px-4 py-3 font-medium">Days</th>
                  <th className="px-4 py-3 font-medium">Rental Charges</th>
                  <th className="px-4 py-3 font-medium">Deposit</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((car, index) => (
                  <motion.tr
                    key={car.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="border-b hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-16 sm:w-20 h-12 sm:h-14 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {car.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {car.pricePerDay}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{car.days}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {car.rentalCharges}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{car.deposit}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {car.total}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 Card Layout for Mobile */}
          <div className="sm:hidden space-y-3">
            {currentData.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div
                  onClick={() =>
                    setExpandedCard(expandedCard === car.id ? null : car.id)
                  }
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-14 h-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {car.name}
                      </p>
                      <p className="text-gray-500 text-xs">{car.total}</p>
                    </div>
                  </div>
                  {expandedCard === car.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                <AnimatePresence>
                  {expandedCard === car.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-3 text-sm text-gray-700 space-y-1 border-t"
                    >
                      <p>
                        <span className="font-medium">Price per day:</span>{" "}
                        {car.pricePerDay}
                      </p>
                      <p>
                        <span className="font-medium">Days:</span> {car.days}
                      </p>
                      <p>
                        <span className="font-medium">Rental Charges:</span>{" "}
                        {car.rentalCharges}
                      </p>
                      <p>
                        <span className="font-medium">Deposit:</span>{" "}
                        {car.deposit}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-900">
                          Total: {car.total}
                        </span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}