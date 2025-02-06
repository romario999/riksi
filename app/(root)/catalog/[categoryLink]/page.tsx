import { Container, Title } from "@/shared/components/shared";
import CategoryDescription from "@/shared/components/shared/category-description";
import { prisma } from "@/prisma/prisma-client";
import { getProducts } from "@/shared/lib/get-products";
import { FilterProductsSection } from "@/shared/components/shared/filter-products-section";
import Link from "next/link";
import { Slash } from "lucide-react";
import { generateOptimizedMetadata } from "@/shared/lib";
import { unstable_cache } from "next/cache";

const ITEMS_PER_PAGE = 18;

export async function generateMetadata({ params }: { params: { categoryLink: string } }) {
  const getCachedCategory = unstable_cache(
    async () =>
      prisma.category.findFirst({
        where: { categoryUrl: params.categoryLink },
        select: { name: true },
      }),
    [`category-metadata-${params.categoryLink}`],
    { revalidate: 60 }
  );

  const category = await getCachedCategory();
  return generateOptimizedMetadata({ categoryLink: category?.name });
}

export default async function CatalogCategory({
  searchParams,
  params,
}: {
  searchParams: Record<string, string>;
  params: { categoryLink: string };
}) {
  const getCachedCategory = unstable_cache(
    async () =>
      prisma.category.findFirst({
        where: { categoryUrl: params.categoryLink },
        select: { id: true, name: true, description: true },
      }),
    [`category-${params.categoryLink}`],
    { revalidate: 60 }
  );

  const getCachedSubcategory = unstable_cache(
    async () =>
      prisma.subcategory.findFirst({
        where: { subcategoryUrl: params.categoryLink },
        select: { id: true, name: true, category: true },
      }),
    [`subcategory-${params.categoryLink}`],
    { revalidate: 60 }
  );

  const getCachedProducts = unstable_cache(
    async () =>
      getProducts({
        searchParams,
        categoryUrl: params.categoryLink,
        itemsPerPage: ITEMS_PER_PAGE,
      }),
    [`products-${params.categoryLink}`, JSON.stringify(searchParams)],
    { revalidate: 60 }
  );

  // Виконуємо кешовані запити
  const [category, subcategory, { products, total, totalPages, currentPage }] = await Promise.all([
    getCachedCategory(),
    getCachedSubcategory(),
    getCachedProducts(),
  ]);

  return (
    <>
      <div className="shadow-lg shadow-black/5 py-5">
        <Container className="p-3">
          <Title text={String(category?.name)} size="lg" className="font-extrabold text-xl sm:text-xl md:text-2xl lg:text-3xl" />
        </Container>
      </div>
      <Container className="pb-14 mt-6">
        <div className="flex items-center text-sm ml-2 mb-5 text-gray-400">
          <Link href="/">Головна</Link>
          <Slash size={14} className="mx-2" />
          <Link href="/catalog">Каталог</Link>
          <Slash size={14} className="mx-2" />
          <span>{category?.name}</span>
        </div>
        <FilterProductsSection
          isCategory={true}
          categoryLink={params.categoryLink}
          products={products}
          total={total}
          totalPages={totalPages}
          currentPage={currentPage}
          searchParams={searchParams}
          category={category}
          subcategory={subcategory}
        />
        <CategoryDescription description={category?.description} page={currentPage} />
      </Container>
    </>
  );
}
