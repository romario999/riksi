'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore, useFavoriteStore } from '@/shared/store';
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
    const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);
    
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

    const onSubmitFavorite = async (isFavorite: boolean) => {
      try {
          await toggleFavorite({
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            productUrl: product.productUrl,
            imageUrl: product.imageUrl
          });
          toast.success(
              isFavorite 
                  ? `${product.name} видалено з обраного!` 
                  : `${product.name} додано в обране!`
          );
      } catch {
          toast.error('Не вдалося змінити статус обраного');
      }
  };

    return (
        <ChooseProductForm 
            id={product.id}
            imageUrl={product.imageUrl} 
            onSubmit={onSubmit} 
            onSubmitFavorite={onSubmitFavorite}
            name={product.name} 
            price={product.price} 
            discountPrice={product.oldPrice}
            loading={loading} 
            description={product.description}
            items={product.items}
            stickers={product.sticker}
            complects={product.complects}
            category={category}
        />
    )
};