'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChooseProductForm } from './choose-product-form';

export interface Category {
  name: string;
  categoryUrl: string;
}

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
    className?: string;
    category?: Category | null;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit, category }) => {
    const addCartItem = useCartStore(state => state.addCartItem);
    const loading = useCartStore(state => state.loading);

    const firstItem = product.items[0];

    const onSubmit = async (productItemId?: number) => {
        try {
          const itemId = productItemId;

          await addCartItem({
            productItemId: itemId,
          })
    
          toast.success(product.name + ' додано в кошик!');
          _onSubmit?.();
        } catch (error) {
          toast.error('Не вдалося додати товар у кошик');
          console.error(error);
        }
    };

    return (
        <ChooseProductForm 
            id={product.id}
            imageUrl={product.imageUrl} 
            onSubmit={onSubmit} 
            name={product.name} 
            price={product.price} 
            discountPrice={firstItem.oldPrice || null}
            loading={loading} 
            description={product.description}
            items={product.items}
            stickers={product.sticker}
            complects={product.complects}
            category={category}
        />
    )
};