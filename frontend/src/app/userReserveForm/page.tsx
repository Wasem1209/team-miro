import React, { Suspense } from "react";
import UserReserveFormComponent from "./UserReserveFormComponent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading reservation form...</div>}>
      <UserReserveFormComponent />
    </Suspense>
  );
}