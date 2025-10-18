"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const weeklyData = [
  { day: "Mon", users: 120 },
  { day: "Tue", users: 200 },
  { day: "Wed", users: 150 },
  { day: "Thu", users: 220 },
  { day: "Fri", users: 180 },
  { day: "Sat", users: 250 },
  { day: "Sun", users: 300 },
];

const monthlyData = [
  { week: "Week 1", users: 800 },
  { week: "Week 2", users: 1200 },
  { week: "Week 3", users: 950 },
  { week: "Week 4", users: 1500 },
];

const ActiveUser = () => {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  const data = view === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
          Active Users ({view === "weekly" ? "Weekly" : "Monthly"})
        </h2>

        {/* Toggle Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("weekly")}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
              view === "weekly"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
              view === "monthly"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Animated Chart */}
      <div className="w-full h-64 sm:h-72 md:h-80 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={view} // unique key triggers animation on view change
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey={view === "weekly" ? "day" : "week"}
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    color: "#fff",
                    border: "none",
                  }}
                  labelStyle={{ color: "#a3e635" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2, fill: "#60a5fa" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActiveUser;