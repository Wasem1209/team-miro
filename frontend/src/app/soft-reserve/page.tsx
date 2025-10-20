"use client";

import React, { Suspense } from "react";
import SoftReserveContent from "./SoftReserveContent";

// Suspense wrapper to fix build error
export default function SoftReservePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">Loading car details...</div>}>
      <SoftReserveContent />
    </Suspense>
  );
}