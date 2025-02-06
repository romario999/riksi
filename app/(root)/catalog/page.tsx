import { Container, Title } from "@/shared/components/shared";
import { getProducts } from "@/shared/lib/get-products";
import { FilterProductsSection } from "@/shared/components/shared/filter-products-section";
import Link from "next/link";
import { Slash } from "lucide-react";
import { generateOptimizedMetadata } from "@/shared/lib";

export async function generateMetadata() {
  return generateOptimizedMetadata({ catalog: true });
}

const ITEMS_PER_PAGE = 18;

export const revalidate = 60; // Перегенерація сторінки через 60 секунд

export default async function Catalog({ searchParams }: { searchParams: Record<string, string> }) {
  const { products, total, totalPages, currentPage } = await getProducts({
    searchParams,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <>
      <div className="shadow-lg shadow-black/5 py-5">
        <Container className="p-3">
          <Title text="Каталог товарів" size="lg" className="font-extrabold text-xl sm:text-xl md:text-2xl lg:text-3xl" />
        </Container>
      </div>
      <Container className="pb-14 mt-6">
        <div className="flex items-center text-sm ml-2 mb-5 text-gray-400">
          <Link href="/">Головна</Link>
          <Slash size={14} className="mx-2" />
          <span>Каталог</span>
        </div>
        <FilterProductsSection
          isCatalog={true}
          products={products}
          total={total}
          totalPages={totalPages}
          currentPage={currentPage}
          searchParams={searchParams}
        />
        {currentPage === 1 && (
          <div className="mt-10 text-wrap">
            Ласкаво просимо до каталогу товарів RIKSI...
          </div>
        )}
      </Container>
    </>
  );
}
