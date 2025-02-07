'use client';

import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface Props {
    id: number;
    name: string;
    price: number;
    url: string;
    discountPrice?: number | null;
    imageUrl: string[];
    className?: string;
    children?: React.ReactNode;
}

export const MiniProductCard: React.FC<Props> = ({ id, url, name, price, imageUrl, className, discountPrice, children }) => {
    const [currentImage, setCurrentImage] = React.useState(imageUrl[0]);

    const handleMouseEnter = () => {
        if (imageUrl.length > 1) {
          setCurrentImage(imageUrl[1]);
        }
      };

      const handleMouseLeave = () => {
        setCurrentImage(imageUrl[0]);
      };

  return (
    <div className={cn('transition-all duration-300 hover:translate-y-[-2px] max-w-[190px] mt-2', className)}>
      {children}
      <Link href={`/product/${url}`}>
            <div 
                className="flex justify-center p-6 bg-secondary rounded-lg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image 
                    width={142}
                    height={240}
                    className='w-full h-[240px] object-cover' // Збільшена висота зображення
                    src={currentImage} 
                    alt={name} 
                />
            </div>
            
            <Title text={name} size="xs" className='mb-1 mt-3 font-bold' />

            <div className='flex justify-between items-center mt-2'>
                <span className='text-sm'>
                    <b>
                        {discountPrice ? (
                            <>
                                <span className='text-lg'>{price}₴</span> 
                                <span className='ml-3 text-gray-400 line-through text-sm'>{discountPrice}₴</span>
                            </>
                        ) : (
                            <span className='text-lg'>{price}₴</span>
                        )}
                    </b>
                </span>
            </div>
            
        </Link>
    </div>
  );
};
