'use client'

import React, { useState } from 'react';
import { User } from '@prisma/client';
import { ProfileEditForm } from './profile-edit-form';
import ProfileOrder from './profile-order';

interface Props {
    data: User;
}

export const ProfileTabs: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  return (
    <div className="flex flex-col sm:flex-row ">
      {/* Навігація табів (вертикальна) */}
      <div className="flex my-4 sm:mt-20 flex-row sm:flex-col items-start sm:pr-5 sm:mr-5 pr-0 mr-0 min-w-[150px]">
        {(['profile', 'orders'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-1 text-center sm:text-left w-full text-base font-${activeTab === tab ? 'semibold' : 'normal'} text-${activeTab === tab ? 'gray-800' : 'gray-500'} ${activeTab === tab ? 'sm:border-r-2 sm:border-black border-b-0' : ''} mb-2`}
          >
            {tab === 'profile' ? 'Особисті дані' :
             tab === 'orders' ? 'Замовлення' : ''}
          </button>
        ))}
      </div>

      {/* Контент табів */}
      <div className="flex-1 bg-gray-50 max-w-full flex justify-center items-center min-h-[300px]">
        {activeTab === 'profile' && <ProfileEditForm data={data} />}
        {activeTab === 'orders' && <ProfileOrder />}
      </div>
    </div>
  );
};
