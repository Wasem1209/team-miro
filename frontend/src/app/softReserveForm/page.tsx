"use client";

import React, { Suspense } from "react";
import SoftReserveFormContent from "./SoftReserveFormContent";

export default function SoftReserveFormPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      }
    >
      <SoftReserveFormContent />
    </Suspense>
  );
}