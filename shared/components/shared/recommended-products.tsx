import { prisma } from '@/prisma/prisma-client';
import dynamic from 'next/dynamic';
import React from 'react';

const RecommendedCarousel = dynamic(() => import('./recommended-carousel'), { ssr: false });

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