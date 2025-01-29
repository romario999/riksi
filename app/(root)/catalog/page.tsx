import Head from 'next/head'
import { Container, Filters, ProductList, Title } from "@/shared/components/shared";
import { Suspense, useEffect } from "react";
import { getProducts } from "@/shared/lib/get-products";
import { FilterProductsSection } from "@/shared/components/shared/filter-products-section";
import Link from "next/link";
import { Slash } from "lucide-react";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Каталог товарів RIKSI | Жіночий одяг та білизна`;
  const description = `Ознайомтесь з каталогом RIKSI. Найкраща якість за доступними цінами.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://example.com/catalog`,
    },
  };
}

const ITEMS_PER_PAGE = 18;

export default async function Catalog({ searchParams }: { searchParams: Record<string, string> }) {
  const { products, total, totalPages, currentPage } = await getProducts({
    searchParams,
    itemsPerPage: ITEMS_PER_PAGE,
  });


  return (
    <>
     <div className="shadow-lg shadow-black/5 py-5">
        <Container className="p-3">
          <Title text="Каталог товарів" size="lg"   className="font-extrabold text-xl sm:text-xl md:text-2xl lg:text-3xl" />
        </Container>
      </div>
      <Container className="pb-14 mt-6">
      <div className="flex items-center text-sm ml-2 mb-5 text-gray-400">
        <Link href="/">
          Головна
        </Link>
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
        {currentPage == 1 &&  (<div className="mt-10 text-wrap">
              Ласкаво просимо до каталогу товарів RIKSI - українського бренду жіночого одягу та білизни. У нашому асортименті ви знайдете лімітовані колекції, які завжди відображають найактуальніші трендові моди. Наш асортимент включає в себе: білизну, боді, домашній одяг, трикотажний одяг, комбінезони та спортивний одяг - кожен з ними допоможе вам відчути комфорт та вишуканість. <br /><br />Ми віримо, що кожна жінка заслуговує на особливий образ, тому пропонуємо різноманітність стилів та моделей - від класичних до сучасних. Наша білизна надійно забезпечує вам комфорт і натхнення, а кожен одяг здатний підкреслити вашу неповторну красу. <br /><br /> RIKSI - це бренд, який прагне зробити кожен день особливим. Обирайте якість та ексклюзивність. Дозвольте собі бути пропозиції!
         </div>)}
      </Container>
    </>
  );
}