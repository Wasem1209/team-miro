"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  
  Search,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { formatDistanceToNow } from "date-fns";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Activity {
  id: string | number;
  user_name: string;
  action: string;
  timestamp: string;
}

interface Revenue {
  month: string;
  amount: number;
}

interface CarItem {
  id: string | number;
  name: string;
  image: string;
  available: boolean;
  price_per_day: number;
}

interface Reservation {
  id: string | number;
  car_id: string | number;
  user_id: string | number;
  date: string;
}

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [carsListed, setCarsListed] = useState<number>(0);
  const [reservedCars, setReservedCars] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesRes, revenueRes, carsRes, reservationsRes] = await Promise.all([
          fetch("/api/activities"),
          fetch("/api/revenue"),
          fetch("/api/cars"),
          fetch("/api/reservations"),
        ]);

        const [activitiesData, revenueDataJson, carsData, reservationsData] = await Promise.all([
          activitiesRes.json(),
          revenueRes.json(),
          carsRes.json(),
          reservationsRes.json(),
        ]);

        setActivities(activitiesData as Activity[]);
        setRevenueData(revenueDataJson as Revenue[]);
        setCarsListed((carsData as CarItem[]).length || 0);
        setReservedCars((reservationsData as Reservation[]).length || 0);

        const total = (revenueDataJson as Revenue[]).reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );
        setTotalRevenue(total);
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: revenueData.map((d) => d.month),
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((d) => d.amount),
        borderColor: "#000000",
        backgroundColor: "rgba(0,0,0,0.1)",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:ml-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">
            Welcome Back, See how your fleets are performing
          </h1>
         
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search feature..."
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Dashboard cards */}
        <h2 className="font-semibold mb-2">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-1">Cars Listed</h3>
            <p className="text-2xl font-bold">{carsListed}</p>
            {/* Clickable Link */}
            <Link href="/dashboard/cars-listings" className="text-sm text-black underline">
              See Cars/Listings »
            </Link>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-1">Cars Currently Reserved</h3>
            <p className="text-2xl font-bold">{reservedCars}</p>
            <Link href="/reports" className="text-sm text-black underline">
              See Reports »
            </Link>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-1">Total Revenue Earned</h3>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            <Link href="/reports" className="text-sm text-black underline">
              See Reports »
            </Link>
          </div>
        </div>

        {/* ACTIVITY + REVENUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
              <Link href="/activities" className="text-sm text-black underline">
                View Details
              </Link>
            </div>

            {activities.length > 0 ? (
              <div className="divide-y">
                {activities.map((a) => (
                  <div
                    key={a.id}
                    className="flex justify-between items-center py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${a.id}`}
                        alt={a.user_name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <p className="text-sm leading-snug">
                        <span className="font-semibold">{a.user_name}</span> {a.action}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-3">
                      {formatDistanceToNow(new Date(a.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No recent activities found.</p>
            )}
          </div>

          {/* Revenue Trend */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Revenue Trend</h3>
              <Link href="/reports" className="text-sm text-black underline">
                View Details
              </Link>
            </div>
            <div className="h-64">
              {revenueData.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <p className="text-gray-500 text-sm">Loading revenue trend...</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}