import { prisma } from '@/prisma/prisma-client';
import Link from 'next/link';
import React from 'react';

export const MainBottomBanner =  async ({  }) => {
    const bannerItems = await prisma.bottomBannerImage.findMany({
        orderBy: {
          position: 'asc'
        },
        where: {
          isActive: true
      }
    });
  return (
    <section>
      {bannerItems.map((item, i) => (
          <div className='mt-10'>
            <Link key={i} href={bannerItems[i].link || '#'}>
              <img src={bannerItems[i].imageUrl} alt={String(bannerItems[i].altText)} />
            </Link>
          </div>
      ))}
    </section>
  );
};