"use client";

import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-[90%] mx-auto mt-4 rounded-[48px] overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-8">
        {/* Logo */}
        <h1 className="text-[32px] text-[#212121] leading-[20px] font-semibold">
          <a href="">DriveEasy</a>
        </h1>

        {/* Desktop Links (visible ≥1024px) */}
        <ul className="hidden lg:flex items-center gap-[40px] text-[#000000B2] font-medium">
          <a href="#" className="hover:text-gray-600 cursor-pointer">
            Home
          </a>
          <a href="#" className="hover:text-gray-600 cursor-pointer">
            Browse Cars
          </a>
          <a href="#" className="hover:text-gray-600 cursor-pointer">
            My Bookings
          </a>
          <a href="#" className="hover:text-gray-600 cursor-pointer">
            Contact Us
          </a>
          <a href="#" className="hover:text-gray-600 cursor-pointer">
            About Us
          </a>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-[16px]">
          <button className="border-2 border-[#212121] text-[#212121] py-[10px] px-[20px] rounded-[24px] cursor-pointer">
            Login
          </button>
          <button className="bg-[#212121] text-white py-[10px] px-[28px] rounded-[24px] cursor-pointer">
            Sign up
          </button>
        </div>

        {/* Mobile/Tablet Menu Button (<1024px) */}
        <button
          className="lg:hidden text-[#212121] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Toggle between hamburger and close icon */}
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
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
        <a href="#" className="hover:text-gray-600">
          Home
        </a>
        <a href="#" className="hover:text-gray-600">
          Browse Cars
        </a>
        <a href="#" className="hover:text-gray-600">
          My Bookings
        </a>
        <a href="#" className="hover:text-gray-600">
          Contact Us
        </a>
        <a href="#" className="hover:text-gray-600">
          About Us
        </a>
        <div className="flex gap-4 mt-2">
          <button className="border-2 border-[#212121] text-[#212121] py-[8px] px-[16px] rounded-[24px] cursor-pointer">
            <a href="#">Login</a>
          </button>
          <button className="bg-[#212121] text-white py-[8px] px-[20px] rounded-[24px] cursor-pointer">
            <a href="#">Sign up</a>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
