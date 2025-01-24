import { prisma } from '@/prisma/prisma-client';
import Link from 'next/link';
import React from 'react';

export const MainBottomBanner =  async ({  }) => {
    const bannerItems = await prisma.bottomBannerImage.findMany({
        orderBy: {
          position: 'asc'
        },
    });
  return (
    <section className='mt-10'>
      {bannerItems.map((item, i) => (
          <Link key={i} href={bannerItems[i].link || '#'}>
            <img src={bannerItems[i].imageUrl} alt={String(bannerItems[i].altText)} />
          </Link>
      ))}
    </section>
  );
};