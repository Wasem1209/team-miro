"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const router = useRouter();

  // Use states for real-time car search here!
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState<string[]>([]);
  const [notFound, setNotFound] = useState(false);

  // The available cars
  const cars = [
    "Lamborghini Huracán",
    "Mercedes Benz GLE",
    "Audi R8",
    "Tesla Model S",
    "Ferrari Roma",
    "Range Rover Sport",
    "Porsche 911",
    "Toyota Supra",
    "BMW X6",
  ];

  // Part for a live search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredCars([]);
      setNotFound(false);
      return;
    }

    const results = cars.filter((car) =>
      car.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCars(results);
    setNotFound(results.length === 0);
  };

  // Navigation to a reserve page
  const handleReserveClick = (e: React.FormEvent) => {
    e.preventDefault();
    const carSlug = searchTerm.toLowerCase().replace(/\s+/g, "_");
    router.push(`/cars/${carSlug}`);
  };

  return (
    <section className="w-full bg-gray-50 overflow-hidden">
      {/* HERO TOP SECTION */}
      <div className="flex flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-10 gap-6 md:gap-12">
        {/* The text & Search box to the left */}
        <div className="flex flex-col justify-center w-1/2 text-left space-y-5 relative">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Find Your Perfect Ride
          </h1>

          <p className="text-gray-600 text-xs sm:text-base md:text-lg max-w-md">
            Premium vehicles available for rent with instant booking.
          </p>

          {/* A Search Box with live filter */}
          <div className="relative w-full max-w-md">
            <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 mt-3 sm:mt-5">
              <input
                type="text"
                placeholder="Search for a car..."
                value={searchTerm}
                onChange={handleSearch}
                className="flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-l-full text-gray-700 focus:outline-none text-sm sm:text-base"
              />

              {/* A Search Button */}
              <button
                onClick={() => {
                  if (searchTerm.trim() === "") return;

                  const carSlug = searchTerm.toLowerCase().replace(/\s+/g, "_");

                  // Availability of a car in the array
                  const isAvailable = cars.some(
                    (car) => car.toLowerCase() === searchTerm.toLowerCase()
                  );

                  if (isAvailable) {
                    router.push(`/cars/${carSlug}`);
                  } else {
                    alert("Car not available at the moment");
                  }
                }}
                className="bg-gray-900 text-white rounded-r-full px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-center hover:bg-gray-800 transition-all duration-200"
              >
                <Search size={18} />
              </button>
            </div>

            {/* To filter Car Results */}
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-56 overflow-y-auto z-10">
                {filteredCars.length > 0 ? (
                  filteredCars.map((car, index) => (
                    <p
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      onClick={() => {
                        setSearchTerm(car);
                        setFilteredCars([]);
                      }}
                    >
                      {car}
                    </p>
                  ))
                ) : notFound ? (
                  <p className="px-4 py-2 text-gray-500 italic">
                    Car not available, Please check later.
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* The hero-section image to the right */}
        <div className="w-1/2 flex justify-center">
          <Image
            src="/images/team-m.png"
            alt="Car"
            width={800}
            height={600}
            className="object-contain w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto"
            priority
          />
        </div>
      </div>

      {/* RESERVATION SECTION */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 pb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Reserve a Car Now!
          </h2>

          {/* Reservation Form */}
          <form
            onSubmit={handleReserveClick}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4"
          >
            {/* All the Dropdowns */}
            <select
              aria-label="Select Car Brand"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:outline-none text-sm md:text-base"
            >
              <option>Lamborghini</option>
              <option>Mercedes</option>
              <option>Audi</option>
              <option>Tesla</option>
            </select>

            <select
              aria-label="Select Car Model"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:outline-none text-sm md:text-base"
            >
              <option>Huracán</option>
              <option>GLE</option>
              <option>Model S</option>
            </select>

            <select
              aria-label="Select Car Type"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:outline-none text-sm md:text-base"
            >
              <option>Exotic</option>
              <option>Luxury</option>
              <option>SUV</option>
            </select>

            <select
              aria-label="Select Car Year"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:outline-none text-sm md:text-base"
            >
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
            </select>

            <select
              aria-label="Select Price Range"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:outline-none text-sm md:text-base"
            >
              <option>$1200–$1500</option>
              <option>$1500–$2000</option>
              <option>$2000–$2500</option>
            </select>

            {/* The date for picking */}
            <input
              aria-label="Pick Start Date"
              type="date"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:outline-none text-sm md:text-base"
            />
            <input
              aria-label="Pick End Date"
              type="date"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:outline-none text-sm md:text-base"
            />

            {/*A Reserve Button */}
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-all duration-200 font-semibold col-span-2 md:col-span-4 lg:col-span-1"
            >
              Reserve now →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
