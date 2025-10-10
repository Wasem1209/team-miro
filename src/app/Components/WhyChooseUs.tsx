import React, { useState } from 'react';
import Image from 'next/image'; 

interface Why {
  title: string;
  description: string;
  icon: string;
}

const WhyChooseUs: React.FC = () => {
  const [why] = useState<Why[]>([
    {
      title: 'Instant Booking',
      description: 'Reserve cars instantly with guest checkout or create an account for firm reservations.',
      icon: '/icon/Clock.png',
    },
    {
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with Stripe integration and saved payment methods.',
      icon: '/icon/Payment.png',
    },
    {
      title: 'Smart Notifications',
      description: 'Get instant updates via email, SMS, or push notifications for all your bookings.',
      icon: '/icon/Notification.png',
    },
    {
      title: '24/7 Customer Support',
      description: 'Round-the-clock customer support to help you with any questions or issues.',
      icon: '/icon/Support.png',
    },
  ]);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
      <h1 className='text-4xl font-bold mb-4'>Why Choose DriveEasy?</h1>
      <h2 className='text-lg font-bold mb-12'>Experience hassle-free car rentals with our premium features</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 rounded-full'>
        {why.map((item, index) => (
          <div key={index}
            className='bg-white p-6 rounded-lg shadow-xl overflow-hidden  text-center'>
            <Image src={item.icon} alt={item.title} width={40} height={40} className='mx-auto mb-4'/>
            <h3 className='font-bold mb-2'>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs
