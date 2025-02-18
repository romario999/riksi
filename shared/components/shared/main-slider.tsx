'use client';

import React, { useMemo } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './main-carousel';
import Link from 'next/link';
import { Skeleton } from '../ui';
import { useCarousel, useIsMobile } from '@/shared/hooks';
import { SliderImage } from '@prisma/client';
import Image from 'next/image';


export const MainSlider = () => {
    const isMobile = useIsMobile();
    const { carousel, loading } = useCarousel();

    const sliderContent = useMemo(
        () =>
            carousel.map((item: SliderImage, i: number) => (
                <CarouselItem key={i}>
                    <Link href={item.link || '#'}>
                    <Image 
                        className="rounded-lg mx-auto" 
                        src={item.imageUrl} 
                        alt={item.altText ?? ''} 
                        priority
                        width={1440} // Розмір для desktop
                        height={576} // Вказані тобою розміри для мобільного
                        layout='responsive'
                        sizes="(max-width: 768px) 100vw, 1440px"
                        style={{ width: '100%', height: 'auto' }}
                    />
                    </Link>
                </CarouselItem>
            )),
        [carousel]
    );

    if (carousel.length === 0 || loading) {
        return (
            <section className="h-[500px] flex">
                <Skeleton
                    className={`rounded-xl mx-auto ${
                        isMobile ? 'w-full h-[500px]' : 'w-full min-h-[400px] max-h-[500px]'
                    }`}
                />
            </section>
        );
    }

    return (
        <section>
            <Carousel>
                <CarouselContent>{sliderContent}</CarouselContent>
                {!isMobile && <CarouselPrevious />}
                {!isMobile && <CarouselNext />}
            </Carousel>
        </section>
    );
};
