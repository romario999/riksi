'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Skeleton } from '../ui';
import { useBanner } from '@/shared/hooks';
import Image from 'next/image';

export const MainBanners = () => {
    const { banner, loading } = useBanner();

    const bannerContent = useMemo(
        () =>
            banner.map((item, i) => (
                <Link href={item.link || '#'} key={i} className="flex-1">
                    <div>
                        <Image
                            src={item.imageUrl}
                            className="cursor-pointer rounded-lg transition-shadow duration-300 ease-in-out transform hover:shadow-lg"
                            alt={item.altText ?? 'Banner'}
                            priority
                            width={720}  // Фіксована ширина
                            height={405} // Фіксована висота (16:9)
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </Link>
            )),
        [banner]
    );

    if (loading) {
        return (
            <section className="mt-5 flex gap-5">
                <Skeleton className="rounded-xl flex-1 aspect-[16/9]" />
                <Skeleton className="rounded-xl flex-1 aspect-[16/9]" />
            </section>
        );
    }

    return (
        <section className="my-5 flex gap-5">
            {bannerContent}
        </section>
    );
};
