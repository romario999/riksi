import React from 'react';
import Link from 'next/link';
import { Button } from '@/shared/components';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <Image src="/riksi.webp" alt="Logo" width={152} height={152} />
      <h1 className="text-4xl mt-5 font-bold text-gray-800">Сторінку не знайдено</h1>
      <p className="mt-4 text-lg text-gray-600">
        На жаль, сторінка, яку ви шукаєте, не існує.
      </p>
      <Link href="/">
        <Button variant="outline" className="mt-4" size={'lg'}>
          Повернутися на головну
        </Button>
      </Link>
    </div>
  );
}
