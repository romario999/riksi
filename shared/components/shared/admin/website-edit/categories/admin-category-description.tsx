// components/AdminCategoryDescription.tsx

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
}

export const AdminCategoryDescription: React.FC<Props> = ({ description, setDescription, label }) => {
  return (
    <div className="mb-4">
      <label htmlFor="descrCategory" className="block text-sm font-medium text-gray-700 mb-2">
        {label || 'Опис категорії'}
      </label>
      <div className="w-full max-w-2xl">
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className="bg-white rounded-sm"
        />
      </div>
    </div>
  );
};
