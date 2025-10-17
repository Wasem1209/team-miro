"use client";
import React from 'react';
import Link from 'next/link';

interface ProfileTabsProps {
  activeTab: 'personal' | 'license' | 'card';
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab }) => {
  const tabs = [
    { 
      name: 'Personal Information', 
      value: 'personal' as const, 
      href: '/profile/personal-information' 
    },
    { 
      name: "Driver's License Information", 
      value: 'license' as const, 
      href: '/profile/drivers-license' 
    },
    { 
      name: 'Card Information', 
      value: 'card' as const, 
      href: '/profile/card-information' 
    }
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.href}
            className={`pb-3 text-sm border-b-2 -mb-px whitespace-nowrap ${
              activeTab === tab.value
                ? 'border-black text-black font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;