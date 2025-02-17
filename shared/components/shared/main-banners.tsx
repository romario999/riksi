'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Skeleton } from '../ui';
import { useBanner } from '@/shared/hooks';
// import Image from 'next/image';

export const MainBanners = () => {
    const { banner, loading } = useBanner();

    const bannerContent = useMemo(
        () =>
            banner.map((item, i) => (
                <Link href={item.link || '#'} key={i}>
                    <div>
                        {/* <Image
                            src={item.imageUrl}
                            className="cursor-pointer rounded-lg transition-shadow duration-300 ease-in-out transform hover:shadow-lg"
                            alt={item.altText ?? 'Banner'}
                            priority
                            width={0}
                            height={0}
                            sizes='250vw'
                            style={{ width: '100%', height: 'auto' }}
                        /> */}
                        <img src={item.imageUrl} alt={item.altText ?? 'Banner'}
                            className="cursor-pointer rounded-lg transition-shadow duration-300 ease-in-out transform hover:shadow-lg"
                        />
                    </div>
                </Link>
            )),
        [banner]
    );

    if (banner.length === 0 || loading) {
        return (
            <section className="mt-5 flex gap-5">
                <Skeleton className="rounded-xl w-full aspect-[16/9]" />
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
