import React from "react";
import Image from "next/image";


interface SoftReservePageProps {
  Make: string;
  Model: string;
  Type: string;
  Year: number;
  AirConditioning: string;
  Seats: number;
  LuggageCapacity: number;
  FuelType: string;
  WheelDrive: string;
  Rules: string;
  Price: number;
  image?: string;
}

const SoftReservePage: React.FC<SoftReservePageProps> = ({
  Make = "Lamborghini",
  Model = "Huracán",
  Type = "Exotic",
  Year = 2022,
  AirConditioning = "Dual-Zone Automatic Climate Control",
  Seats = 2,
  LuggageCapacity = 100,
  FuelType = "Petrol (Gasoline)",
  WheelDrive = "All-Wheel Drive (AWD)",
  Rules = "No rules attached",
  Price = 1300,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Image */}
          <div className="bg-gray-100 flex items-center justify-center p-8">
            <Image
              src= '/images/Car1.png'
              alt="Car Image"
              width={400}
              height={300}
              className="w-full h-auto object-contain"
            />  
          </div>
          
          {/* Right side - Details */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Make:</span> {Make}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Model:</span> {Model}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Type:</span> {Type}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Year:</span> {Year}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Air Conditioning (A/C):</span> {AirConditioning}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Seat Capacity:</span> {Seats} seats
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Luggage Capacity (Boot Space):</span> {LuggageCapacity} liters (small front trunk)
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Fuel Type:</span> {FuelType}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Wheel Drive:</span> {WheelDrive}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Rules:</span> {Rules}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-lg font-bold text-gray-900">
                Price: ${Price} per day
              </p>

              <button
                onClick={() =>("/softReserveForm/page")}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo with default values
export default function App() {
  return (
    <SoftReservePage
      Make="Lamborghini"
      Model="Huracán"
      Type="Exotic"
      Year={2022}
      AirConditioning="Dual-Zone Automatic Climate Control"
      Seats={2}
      LuggageCapacity={100}
      FuelType="Petrol (Gasoline)"
      WheelDrive="All-Wheel Drive (AWD)"
      Rules="No rules attached"
      Price={1300}
    />
  );
}