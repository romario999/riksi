import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { prisma } from '@/prisma/prisma-client';
import dynamic from 'next/dynamic';
import { SkeletonLoader } from './skeleton-loader';
import { ProductStickers } from '@prisma/client';

const ProductCarousel = dynamic(() => import('./product-carousel'), { ssr: false, loading: () => <SkeletonLoader/> });

export const MainTabs = async () => {
    const products = await prisma.product.findMany({
        include: {
            items: true,
        },
    });

    const hits = products.filter((product) => product.sticker.includes(ProductStickers.HITS));
    const newProducts = products.filter((product) => product.sticker.includes(ProductStickers.NEW));
    const priceParty = products.filter((product) => product.sticker.includes(ProductStickers.PRICEPARTY));

    return (
        <section className="mt-5 flex justify-center">
            <Tabs defaultValue="hits" className="w-full">
                <TabsList className="flex justify-center gap-5">
                    {hits.length > 0 && (
                        <TabsTrigger
                            className="text-base sm:text-lg md:text-xl py-1 px-3 data-[state=active]:bg-gray-300 data-[state=active]:rounded-sm data-[state=active]:text-black"
                            value="hits"
                        >
                            Хіти продажу
                        </TabsTrigger>
                    )}
                    {newProducts.length > 0 && (
                        <TabsTrigger
                            className="text-base sm:text-lg md:text-xl py-1 px-3 data-[state=active]:bg-gray-300 data-[state=active]:rounded-sm data-[state=active]:text-black"
                            value="new"
                        >
                            Новинки
                        </TabsTrigger>
                    )}
                    {priceParty.length > 0 && (
                        <TabsTrigger
                            className="text-base sm:text-lg md:text-xl py-1 px-3 data-[state=active]:bg-gray-300 data-[state=active]:rounded-sm data-[state=active]:text-black"
                            value="priceparty"
                        >
                            Price Party
                        </TabsTrigger>
                    )}
                </TabsList>

                <TabsContent value="hits" className='mt-1 sm:mt-6'>
                    <ProductCarousel stickerType="HITS" products={hits} />
                </TabsContent>
                <TabsContent value="new" className='mt-1 sm:mt-6'>
                    <ProductCarousel stickerType="NEW" products={newProducts} />
                </TabsContent>
                <TabsContent value="priceparty" className='mt-1 sm:mt-6'>
                    <ProductCarousel stickerType="PRICEPARTY" products={priceParty} />
                </TabsContent>
            </Tabs>
        </section>
    );
};