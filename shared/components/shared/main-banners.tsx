'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Skeleton } from '../ui';
import { useBanner, useIsMobile } from '@/shared/hooks';

export const MainBanners = () => {
    const { banner, loading } = useBanner();

    const bannerContent = useMemo(
        () =>
            banner.map((item, i) => (
                <Link href={item.link || '#'} key={i}>
                    <div>
                        <img
                            src={item.imageUrl}
                            className="cursor-pointer rounded-lg transition-shadow duration-300 ease-in-out transform hover:shadow-lg"
                            alt={item.altText ?? 'Banner'}
                        />
                    </div>
                </Link>
            )),
        [banner]
    );

    if (loading) {
        return (
            <section className="mt-5 flex gap-5">
                <Skeleton className="rounded-xl w-full aspect-[16/9]" /> {/* Skeleton з пропорцією 16:9 */}
                <Skeleton className="rounded-xl w-full aspect-[16/9]" />
            </section>
        );
    }
    

    return (
        <section className="mt-5 flex gap-5">
            {bannerContent}
        </section>
    );
};
