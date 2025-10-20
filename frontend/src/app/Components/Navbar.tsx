"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/Signin"); 
  };

  const handleSignUp = () => {
    router.push("/auth/Signup"); 
  };

  return (
    <nav className="bg-white shadow-md w-[90%] mx-auto mt-4 rounded-[48px] overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-8">
        {/* Logo */}
        <h1 className="text-[32px] text-[#212121] leading-[20px] font-semibold">
          <Link href="/">DriveEasy</Link>
        </h1>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-[40px] text-[#000000B2] font-medium">
          <Link href="#" className="hover:text-gray-600 cursor-pointer">Home</Link>
          <Link href="#" className="hover:text-gray-600 cursor-pointer">Browse Cars</Link>
          <Link href="#" className="hover:text-gray-600 cursor-pointer">My Bookings</Link>
          <Link href="#" className="hover:text-gray-600 cursor-pointer">Contact Us</Link>
          <Link href="#" className="hover:text-gray-600 cursor-pointer">About Us</Link>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-[16px]">
          <button
            onClick={handleLogin}
            className="border-2 border-[#212121] text-[#212121] py-[10px] px-[20px] rounded-[24px] cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="bg-[#212121] text-white py-[10px] px-[28px] rounded-[24px] cursor-pointer"
          >
            Sign up
          </button>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <button
          className="lg:hidden text-[#212121] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0"
        } overflow-hidden flex flex-col items-center space-y-4 text-[#000000B2]`}
      >
        <Link href="#" className="hover:text-gray-600">Home</Link>
        <Link href="#" className="hover:text-gray-600">Browse Cars</Link>
        <Link href="#" className="hover:text-gray-600">My Bookings</Link>
        <Link href="#" className="hover:text-gray-600">Contact Us</Link>
        <Link href="#" className="hover:text-gray-600">About Us</Link>

        <div className="flex gap-4 mt-2">
          <button
            onClick={handleLogin}
            className="border-2 border-[#212121] text-[#212121] py-[8px] px-[16px] rounded-[24px] cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="bg-[#212121] text-white py-[8px] px-[20px] rounded-[24px] cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;