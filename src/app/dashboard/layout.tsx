"use client";

import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar  />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        

        {/* Page content */}
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}