import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { prisma } from '@/prisma/prisma-client';
import dynamic from 'next/dynamic';
import { FaSpinner } from 'react-icons/fa6';

const SkeletonLoader = () => (
    <div className="w-full h-[300px] animate-pulse">
        <div className="h-full flex items-center justify-center">
            <FaSpinner className="animate-spin" />
        </div>
    </div>
);

const ProductCarousel = dynamic(() => import('./product-carousel'), { 
    ssr: false, 
    loading: () => <SkeletonLoader />
});

export const MainTabs = async () => {
    const products = await prisma.product.findMany({
        include: {
            items: true,
        },
    });
    return (
        <section className="mt-10 flex justify-center">
            <Tabs defaultValue="hits" className="w-full">
                <TabsList className="flex justify-center gap-5">
                    <TabsTrigger
                        className="text-base sm:text-lg md:text-xl py-1 px-3 data-[state=active]:bg-gray-300 data-[state=active]:rounded-sm data-[state=active]:text-black"
                        value="hits"
                    >
                        Хіти продажу
                    </TabsTrigger>
                    <TabsTrigger
                        className="text-base sm:text-lg md:text-xl py-1 px-3 data-[state=active]:bg-gray-300 data-[state=active]:rounded-sm data-[state=active]:text-black"
                        value="new"
                    >
                        Новинки
                    </TabsTrigger>
                    <TabsTrigger
                        className="text-base sm:text-lg md:text-xl py-1 px-3 data-[state=active]:bg-gray-300 data-[state=active]:rounded-sm data-[state=active]:text-black"
                        value="priceparty"
                    >
                        Price Party
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="hits" className='mt-1 sm:mt-6'>
                    <ProductCarousel stickerType="HITS" products={products} />
                </TabsContent>
                <TabsContent value="new" className='mt-1 sm:mt-6'>
                    <ProductCarousel stickerType="NEW" products={products} />
                </TabsContent>
                <TabsContent value="priceparty" className='mt-1 sm:mt-6'>
                    <ProductCarousel stickerType="PRICEPARTY" products={products} />
                </TabsContent>
            </Tabs>
        </section>
    );
};