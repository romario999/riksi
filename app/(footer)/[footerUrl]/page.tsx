import { prisma } from '@/prisma/prisma-client';
import { Container } from '@/shared/components';
import { Slash } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function FooterPage({ params: { footerUrl } }: { params: { footerUrl: string } }) {
  const pages = await prisma.footerPage.findMany();
  const pageInfo = await prisma.footerPage.findUnique({
    where: { footerUrl: footerUrl },
  });

  // Якщо сторінка не знайдена, перенаправляємо на 404
  if (!pageInfo) {
    notFound();
  }

  return (
    <section>
      <Container>
        <div className="flex gap-10 py-20">
          <div className="h-full">
            <ul className="flex flex-col gap-5 w-[210px]">
              {pages
                .sort((a, b) => a.id - b.id)
                .map((item, i) => (
                  <li
                    key={i}
                    className={`rounded p-1 ${
                      footerUrl === item.footerUrl ? 'bg-[#e7e7e7] font-bold' : ''
                    }`}
                  >
                    <Link href={`${item.footerUrl}`}>{item.title}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center text-sm ml-2 mb-5 text-gray-400">
              <Link href="/">Головна</Link>
              <Slash size={14} className="mx-2" />
              <span>{pageInfo?.title}</span>
            </div>
            <h4 className="text-2xl font-bold">{pageInfo.secondTitle}</h4>
            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: pageInfo.content || '' }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
