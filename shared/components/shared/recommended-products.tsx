import { prisma } from '@/prisma/prisma-client';
import React from 'react';
import { RecommendedCarousel } from './recommended-carousel';

export const RecommendedProducts: React.FC<{ category: number | undefined, productId: number }> = async ({ category, productId }) => {
    const products = await prisma.product.findMany({
        where: {
            categories: {
                some: {
                    categoryId: category,
                },
            },
            NOT: {
                id: productId,
            },
        },
        orderBy: {
          popularity: 'desc',
        },
        include: {
            items: true,
        },
        take: 10
    });
  return (
    <div className='mt-10'>
      <p className='text-2xl font-bold mb-10'>Дивіться також</p>
      <RecommendedCarousel products={products}/>
    </div>
  );
};