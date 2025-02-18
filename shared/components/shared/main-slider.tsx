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
                            width={isMobile ? 640 : 1440} 
                            height={isMobile ? 800 : 576} 
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1440px"
                            style={{ width: '100%', height: 'auto' }}
                            priority={i === 0}
                            loading='eager'
                            fetchPriority={i === 0 ? "high" : "auto"}
                            decoding="async"
                            unoptimized={false}
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
