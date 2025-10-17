import React from 'react';
import Sidebar from './Sidebar';
import ProfileTabs from './ProfileTabs';

interface ProfileWrapperProps {
  children: React.ReactNode;
  activeTab: 'personal' | 'license' | 'card';
}

const ProfileWrapper: React.FC<ProfileWrapperProps> = ({ children, activeTab }) => {
  return (
    <div className="flex gap-6 max-w-7xl mx-auto p-6">
      <Sidebar />
      
      <main className="flex-1">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Profile</h2>
            
            <ProfileTabs activeTab={activeTab} />
            
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileWrapper;