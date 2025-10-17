"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart} from 'lucide-react';
import { useRouter } from 'next/navigation';


interface Car {
  id: string;
  name: string;
  price: number;
  image: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  premium: boolean;
  available: boolean;
  isFavorite?: boolean;
}

const FeaturedVehicle: React.FC = () => {
  const Router = useRouter();
  const [cars, setCars] = useState<Car[]>([
    {
      id: '1',
      name: 'Toyota Camry',
      price: 59,
      image: '/images/Car1.png',
      seats: 5,
      transmission: 'Automatic',
      premium: true,
      available: true,
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Lamborghini',
      price: 1200,
      image: '/images/Car2.png',
      seats: 2,
      transmission: 'Automatic',
      premium: true,
      available: true,
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Porsche',
      price: 1000,
      image: '/images/Car3.png',
      seats: 5,
      transmission: 'Automatic',
      premium: true,
      available: true,
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Ferrari',
      price: 1500,
      image: '/images/Car4.png',
      seats: 5,
      transmission: 'Automatic',
      premium: true,
      available: true,
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Mercedes Benz GL 2013',
      price: 300,
      image: '/images/Car5.png',
      seats: 5,
      transmission: 'Automatic',
      premium: true,
      available: true,
      isFavorite: false,
    },
    {
      id: '6',
      name: 'BMW M3',
      price: 399,
      image: '/images/Car5.png',
      seats: 5,
      transmission: 'Automatic',
      premium: true,
      available: true,
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (id: string) => {
    setCars(cars.map(car =>
      car.id === id ? { ...car, isFavorite: !car.isFavorite } : car
    ));
  };


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
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Available Badge */}
                {car.available && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="absolute top-3 right-3 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-2 transition-colors"
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
                  <h2 className="text-xl font-bold text-gray-900">{car.name}</h2>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ${car.price}
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
                    <span>{car.seats} seats </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>
                      <Image src={"/icon/Transmission.png"} alt="transmission" width={16} height={16}/>
                    </span>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>
                      <Image src={"/icon/Premium.png"} alt="star" width={16} height={16}/>
                    </span>
                    <span>Premium</span>
                  </div>
                </div>

                {/* Reserve Button */}
                <div className='flex gap-2  items-center'>
                <button
                  onClick={() => Router.push("/soft-reserve")}
                  className="flex-1 bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 transition-colors"
                >
                  Reserve Now
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
        onClick={() => Router.push("/cars")}
        className='border border-black rounded-full px-12 py-2 mt-6  items-center font-bold' >See more <Image src={"/icon/RightArrow.png"} alt="right-arrow" width={40} height={40} className='inline-block ml-2' /></button>
    </div>
  );
};

export default FeaturedVehicle;