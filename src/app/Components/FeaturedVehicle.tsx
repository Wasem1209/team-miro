"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface Car {
  id: string;
  name: string;
  price: number;
  image: string;
  seats: number;
  transmission: string;
  premium: boolean;
  available: boolean;
  isFavorite?: boolean; // Optional, as it's added client-side
}

const FeaturedVehicle: React.FC = () => {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    let isMounted = true; // Flag for component mounting state

    const fetchCars = async () => {
      try {
        const res = await fetch("https://driveeasy.pythonanywhere.com/api/v1/car");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Car[] = await res.json();
        
        if (isMounted) {
          // Assuming the API returns an array directly, take the first 6
          setCars(data.slice(0, 6)); 
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching cars:", err);
          setError("Failed to load featured cars. Please check the network.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchCars();

    // Cleanup function: Set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-700">
        <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading featured cars...
      </div>
    );
  }
  
  // Show error message if fetch failed
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-red-600 p-4">
        {error} 😞
      </div>
    );
  }

  const toggleFavorite = (id: string) => {
    setCars((prev) =>
      prev.map((car) =>
        car.id === id ? { ...car, isFavorite: !car.isFavorite } : car
      )
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-4">Featured Cars</h1>
        <h2 className="text-lg text-black font-bold mb-12">
          Choose from our premium fleet of well-maintained vehicles
        </h2>

        {cars.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No featured cars available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative bg-gray-200 h-64 overflow-hidden group">
                  <Image
                    src={car.image || "/images/default-car.jpg"}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {car.available && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(car.id)}
                    className="absolute top-3 right-3 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-2 transition-colors"
                    aria-label={car.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      size={20}
                      fill={car.isFavorite ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-900">{car.name}</h2>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">${car.price}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => router.push("/soft-reserve")}
                      className="flex-1 bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 transition-colors"
                    >
                      Reserve Now
                    </button>
                    {/* Added better alt text to the button image */}
                    <Image
                      src="/images/button.png"
                      alt="Car details link" 
                      width={60}
                      height={60}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push("/cars")}
            className="border border-black rounded-full px-12 py-2 font-bold flex items-center"
          >
            See more
            <Image
              src="/icon/RightArrow.png"
              // Improved alt text
              alt="Navigate to all cars page"
              width={40}
              height={40}
              className="ml-2"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicle;