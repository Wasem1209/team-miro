"use client"
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <div className='w-full py-12 '>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <form className="sm:flex sm:max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent mb-4 sm:mb-0 sm:mr-4"
          />
          <button
            type="submit"
            className="w-full px-5 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Newsletter;