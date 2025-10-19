import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Car {
  id: string;
  name: string;
  model: string;
  year: string;
  colour: string;
  car_type: 'suv' | 'sedan' | 'hatchback' | 'sports' | 'luxury';
  price_per_day: number;
  pickup_location: string;
  status: 'available' | 'unavailable';
  rules: string;
  seating_capacity: number;
  luggage_capacity: number;
  wheel_drive: '2-wheel' | '4-wheel';
  fuel_type: 'petrol' | 'diesel' | 'electric';
  transmission: 'manual' | 'automatic';
  photo: string;
  isFavorite?: boolean;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Car[];
}

const FeaturedVehicle: React.FC = () => {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/available-cars', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const data: ApiResponse = await response.json();
      
      // Filter out cars with invalid photos and add isFavorite property
      const validCars = data.results.filter(car => car.photo && car.photo.trim() !== '');
      
      // Add isFavorite property to each car and limit to 6 featured cars
      const carsWithFavorites = validCars.slice(0, 6).map(car => ({
        ...car,
        isFavorite: false,
      }));
      
      setCars(carsWithFavorites);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setCars(cars.map(car =>
      car.id === id ? { ...car, isFavorite: !car.isFavorite } : car
    ));
  };

  const formatCarDisplay = (car: Car) => {
    // Combine name and model for display
    const displayName = car.model ? `${car.name} ${car.model}` : car.name;
    return displayName;
  };

  const isPremium = (car: Car) => {
    // Consider sports and luxury car types as premium, or cars above a certain price
    return car.car_type === 'sports' || car.car_type === 'luxury' || car.price_per_day > 500;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-gray-600" />
          <p className="text-gray-600 text-lg">Loading featured vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-4 bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error loading vehicles: {error}</p>
          <button
            onClick={fetchCars}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-4">Featured Cars</h1>
        <h2 className="text-lg text-black font-bold mb-12">Choose from our premium fleet of well-maintained vehicles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image Container */}
              <div className="relative bg-gray-200 h-64 overflow-hidden group">
                {car.photo && car.photo.trim() !== '' ? (
                  <Image
                    src={car.photo}
                    alt={formatCarDisplay(car)}
                    unoptimized
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                    <div className="text-center text-gray-600">
                      <svg className="w-20 h-20 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium">No Image Available</p>
                    </div>
                  </div>
                )}
                
                {/* Available Badge */}
                {car.status === 'available' && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                )}

                {car.status === 'unavailable' && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Unavailable
                    </span>
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="absolute top-3 right-3 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-2 transition-colors"
                  aria-label="Toggle favorite"
                >
                  <Heart
                    size={20}
                    fill={car.isFavorite ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title and Price */}
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-900">{formatCarDisplay(car)}</h2>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ${car.price_per_day}
                    </p>
                    <p className="text-sm text-gray-600">per day</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>
                      <Image src={"/icon/Seats.png"} alt="seats" width={16} height={16}/>
                    </span>
                    <span>{car.seating_capacity} seats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>
                      <Image src={"/icon/Transmission.png"} alt="transmission" width={16} height={16}/>
                    </span>
                    <span className="capitalize">{car.transmission}</span>
                  </div>
                  {isPremium(car) && (
                    <div className="flex items-center gap-1">
                      <span>
                        <Image src={"/icon/Premium.png"} alt="star" width={16} height={16}/>
                      </span>
                      <span>Premium</span>
                    </div>
                  )}
                </div>

                {/* Reserve Button */}
                <div className='flex gap-2 items-center'>
                  <button
                    onClick={() => router.push(`/userReserve?id=${car.id}`)}
                    disabled={car.status !== 'available'}
                    className={`flex-1 font-semibold py-3 rounded transition-colors ${
                      car.status === 'available'
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {car.status === 'available' ? 'Reserve Now' : 'Not Available'}
                  </button>
                  <div className='flex-shrink-0'>
                    <Image src={"/images/button.png"} alt="button" width={60} height={60}/>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => router.push("/cars")}
        className='border border-black rounded-full px-12 py-2 mt-6 items-center font-bold'
      >
        See more <Image src={"/icon/RightArrow.png"} alt="right-arrow" width={40} height={40} className='inline-block ml-2' />
      </button>
    </div>
  );
};

export default FeaturedVehicle;