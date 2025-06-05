'use client'

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

interface Props {
    content: string | null
    setContent: React.Dispatch<React.SetStateAction<string>> | any
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const AdminFooterPageContent: React.FC<Props> = ({content, setContent}) => {
    return (
        <div className="mb-4">
      <label htmlFor="contentFooterPage" className="block text-sm font-medium text-gray-700 mb-2">
        Контент сторінки
      </label>
      <div className="w-full max-w-2xl">
        <ReactQuill
          theme="snow"
          value={content || ''}
          onChange={setContent}
          className="bg-white rounded-sm"
        />
      </div>
    </div>
    )
}