import type { Metadata } from "next";
import { Header } from "@/shared/components/shared/header";
import { SocialLinks } from "@/shared/components/shared/social-links";
import { Footer } from "@/shared/components";

export const metadata: Metadata = {
  title: "RIKSI: Український Жіночий Одяг та Білизна | Ексклюзивність та Якість",
  description: "RIKSI - український бренд жіночого одягу та білизни. Ми пропонуємо вам вишуканість, якість та ексклюзивність у кожній деталі. Лімітовані колекції трендового одягу для сучасних жінок. Знайдіть свій унікальний образ з RIKSI",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
          {children}
        <SocialLinks />
        <Footer />
      </main>
    </>
  );
}
