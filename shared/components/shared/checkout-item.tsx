'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  productUrl,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div className={cn('flex items-center gap-4 flex-wrap justify-between', {
      'opacity-50 pointer-events-none': disabled,
    }, className)}>
      <div className="flex items-center gap-5">
        <Link href={productUrl || '/'}>
          <CartItemDetails.Image src={imageUrl} />
        </Link>
        <div className="flex flex-col gap-2">
          <Link href={productUrl || '/'}>
            <CartItemDetails.Info name={name} details={details} className='max-w-[160px] sm:max-w-full' />
          </Link>
          <div className="flex items-center gap-5">
            <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
            <button type="button" onClick={onClickRemove}>
              <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className='p-1'>
      <CartItemDetails.Price value={price} />
      </div>
    </div>
  );
};
