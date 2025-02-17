'use client';

import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface Props {
    id: number;
    name: string;
    price: number;
    url: string;
    discountPrice?: number | null;
    imageUrl: string[];
    className?: string;
    children?: React.ReactNode;
    onToggleFavorite?: () => void; // Додано для обробки натискання на серце
}

export const MiniProductCard: React.FC<Props> = ({ id, url, name, price, imageUrl, className, discountPrice, children, onToggleFavorite }) => {
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
        <div className={cn('transition-all relative duration-300 hover:translate-y-[-2px] max-w-[190px] mt-2', className)}>
            {children}
            <Link href={`/product/${url}`}>
                <div 
                    className="relative flex justify-center p-6 bg-secondary rounded-lg"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Image 
                        width={142}
                        height={240}
                        className='w-full h-[240px] object-cover' 
                        src={currentImage} 
                        alt={name} 
                        loading="eager"
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
            {/* Іконка серця, яка розташована на зображенні товару */}
            {onToggleFavorite && (
                <div 
                    onClick={onToggleFavorite}
                    className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer"
                >
                    <Heart className="text-red-500 w-5 h-5" />
                </div>
            )}
        </div>
    );
};
