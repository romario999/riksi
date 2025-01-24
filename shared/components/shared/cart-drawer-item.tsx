import { cn } from '@/shared/lib/utils';
import React from 'react';
import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link';

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    productUrl: string;
    onLinkClick?: () => void;
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
    imageUrl,
    name,
    price,
    quantity,
    onLinkClick,
    details,
    disabled,
    onClickCountButton,
    onClickRemove,
    productUrl,
    className
}) => {
    return (
        <div className={cn('flex bg-white p-5 gap-6', {
            'opacity-50 pointer-events-none': disabled,
        }, className)}>
            <Link href={productUrl} onClick={onLinkClick}>
                <CartItem.Image src={imageUrl} />
            </Link>

            <div className='flex-1'>
                <Link href={productUrl} onClick={onLinkClick}>
                    <CartItem.Info name={name} details={details} />
                </Link>

                <hr className='my-3' />

                <div className="flex items-center justify-between">
                    <CountButton onClick={onClickCountButton} value={quantity} />
                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price} />
                        <Trash2Icon
                            onClick={onClickRemove}
                            className='text-gray-400 cursor-pointer hover:text-gray-600'
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
