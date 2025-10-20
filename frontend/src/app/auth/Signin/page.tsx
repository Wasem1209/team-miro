"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignupPage1() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    rememberMe: false,
  });

  interface SignupFormData {
    email: string;
    username: string;
    password: string;
    rememberMe: boolean;
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: SignupFormData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full">
        {/* Left side - Car Image */}
        <div className=" lg:flex items-center justify-center">
         <Image src="/images/signup.png" alt="Car" width={500} height={800} />
        </div>

        {/* Right side - Form */}
        <div className="flex items-center justify-center bg-[#F0F0F0] p-8 rounded-lg">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Login into your Account</h2>
                <p className="text-gray-600 text-sm">Get ready to unlock a world of effortless car rentals</p>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-800 focus:border-transparent text-sm"
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="John White"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-800 focus:border-transparent text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-800 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className='inline-flex'>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-black-800 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
                </div>
                <div className="flex-grow text-right  ml-6 text-sm text-blue-600 hover:underline font-medium cursor-pointer">
                  <p>Forgot your password?</p>
                </div>
             </div>
             
              {/* Create Account Button */}
              <button
                type="submit"
                onClick={() => router.push("/home-folder")}
                className="w-full bg-black text-white font-semibold py-2.5 rounded-full hover:bg-gray-800 transition duration-200 mt-6"
              >
                Login
              </button>

              {/* Sign up Link */}
              <p className="text-center text-sm text-gray-700 mt-4">
                Don&#39;t have an account?{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}