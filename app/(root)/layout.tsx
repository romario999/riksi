import type { Metadata } from "next";
import { Header } from "@/shared/components/shared/header";
import { Suspense } from "react";
import { SocialLinks } from "@/shared/components/shared/social-links";
import { Footer } from "@/shared/components";

export const metadata: Metadata = {
  title: "RIKSI: Український Жіночий Одяг та Білизна | Ексклюзивність та Якість",
  description: "RIKSI - український бренд жіночого одягу та білизни. Ми пропонуємо вам вишуканість, якість та ексклюзивність у кожній деталі. Лімітовані колекції трендового одягу для сучасних жінок. Знайдіть свій унікальний образ з RIKSI",
};

export default function HomeLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen">
        <Suspense>
          <Header />
        </Suspense>
        {children}
        {modal}
        <SocialLinks/>
        <Footer />
      </main>
    </>
  );
}
