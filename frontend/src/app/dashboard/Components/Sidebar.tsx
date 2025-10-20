"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  ClipboardList,
  BarChart,
  Settings,
  LogOut,
  Users,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/cars-listings", icon: Car, label: "Cars / Listing" },
    { href: "/dashboard/reservations", icon: ClipboardList, label: "Reservations" },
    { href: "/dashboard/reports", icon: BarChart, label: "Reports" },
    { href: "/dashboard/users", icon: Users, label: "Users" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/*  Mobile menu toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white w-64 border-r transition-transform duration-300 z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
      >
        <div className="p-4 text-lg font-semibold border-b">
          Business Owner Dashboard
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-black text-white font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setIsSidebarOpen(false)} 
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t">
          <button className="flex items-center gap-2 text-red-600 hover:text-red-800">
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      {/* overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}