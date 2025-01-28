'use client';

import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
    id: number;
    name: string;
    price: number;
    url: string;
    discountPrice?: number | null;
    imageUrl: string[];
    className?: string;
    showBtn?: boolean;
    children?: React.ReactNode;
}

export const ProductCard: React.FC<Props> = ({ id, url, name, price, imageUrl, className, discountPrice, children, showBtn = true }) => {
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
        <div className={cn('max-w-[270px] transition-all duration-300 hover:translate-y-[-2px]', className)}>
            {children}
            <Link href={`/product/${url}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg hover:cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img className='h-[320px] object-cover' src={currentImage} alt={name} />
                </div>

                <Title text={name} size="sm" className='mb-1 mt-3 font-bold text-center sm:text-left' />

                <div className='flex flex-col sm:flex-row justify-between items-center mt-4'>
                    <span className='text-[20px] text-center sm:text-left'>
                        <b>
                            {discountPrice ? (
                                <>
                                    <span>{price}₴</span>
                                    <span className='ml-3 text-gray-400 line-through text-[17px]'>{discountPrice}₴</span>
                                </>
                            ) : (
                                <span>{price}₴</span>
                            )}
                        </b>
                    </span>
                    {showBtn && (<Button variant="outline" className='mt-2 sm:mt-0 text-sm font-bold'>
                        <Plus className='w-5 h-5 mr-1' />
                        До кошику
                    </Button>)}
                </div>
            </Link>
        </div>
    );
};
