import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

interface Props {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ items, onClickCountButton, loading, removeCartItem, className }) => {
  return (
    <WhiteBlock title="1. Кошик" className={className}>
        <div className="flex flex-col gap-5">
            {
                loading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
            }
            {
               !loading && items.length > 0 && items.map((item) => (
                    <CheckoutItem 
                        id={item.id}
                        key={item.id}
                        imageUrl={item.imageUrl}
                        details={`Розмір: ${item.size}`}
                        productUrl={item.productUrl}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        disabled={item.disabled}
                        onClickCountButton={(type) => onClickCountButton(
                            item.id,
                            item.quantity,
                            type,
                        )}
                        onClickRemove={() => removeCartItem(item.id)}
                    />
                ))
            }
        </div>
    </WhiteBlock>
  );
};
