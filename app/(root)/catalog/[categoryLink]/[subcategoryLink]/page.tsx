import { Container, Filters, ProductList, Title } from "@/shared/components/shared";
import { Suspense } from "react";
import { prisma } from "@/prisma/prisma-client";
import CategoryDescription from "@/shared/components/shared/category-description";
import { getProducts } from "@/shared/lib/get-products";
import { FilterProductsSection } from "@/shared/components/shared/filter-products-section";
import Link from "next/link";
import { Slash } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { categoryLink: string, subcategoryLink: string } }): Promise<Metadata> {
  const { subcategoryLink, categoryLink } = params;
  const subcategory = await prisma.subcategory.findFirst({
    where: {
      subcategoryUrl: subcategoryLink
    },
    select: {
      name: true,
    }
  });

  const title = `${subcategory?.name} | Каталог товарів RIKSI`;
  const description = `Ознайомтесь з нашими товарами в підкатегорії ${subcategory?.name}. Найкраща якість за доступними цінами.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://example.com/catalog/${categoryLink}/${subcategoryLink}`,
    },
  };
}

const ITEMS_PER_PAGE = 18;

export default async function CatalogSubcategory({
  searchParams,
  params
}: {
  searchParams: Record<string, string>,
  params: { categoryLink: string, subcategoryLink: string }
}) {

  const subcategory = await prisma.subcategory.findFirst({
    where: {
      subcategoryUrl: params.subcategoryLink,
      category: {
        categoryUrl: params.categoryLink
      }
    },
    select: {
      id: true,
      name: true,
      category: true,
      description: true
    }
  });

  const category = await prisma.category.findFirst({
    where: {
      categoryUrl: params.categoryLink
    },
    select: {
      id: true,
      name: true,
      categoryUrl: true,
    }
  });

  const { products, total, totalPages, currentPage } = await getProducts({
    searchParams,
    categoryUrl: params.categoryLink,
    subcategoryUrl: params.subcategoryLink,
    itemsPerPage: ITEMS_PER_PAGE,
  });
  
  return (
    <>
      <div className="shadow-lg shadow-black/5 py-5">
        <Container className="p-3">
        <Title
  text={`${category?.name} / ${subcategory?.name}`}
  size="lg"
  className="font-extrabold text-xl sm:text-xl md:text-2xl lg:text-3xl"
/>

        </Container>
      </div>
      <Container className="pb-14 mt-6">
      <div className="flex items-center text-sm ml-2 mb-5 text-gray-400">
        <Link href="/">
          Головна
        </Link>
        <Slash size={14} className="mx-2" />
        <Link href="/catalog">
          Каталог
        </Link>
        <Slash size={14} className="mx-2" />
        <Link href={`/catalog/${category?.categoryUrl}`}>
          {category?.name}
        </Link>
        <Slash size={14} className="mx-2" />
        <span>{subcategory?.name}</span>
      </div>
          <FilterProductsSection
            isSubcategory={true}
            categoryLink={params.categoryLink}
            subcategoryLink={params.subcategoryLink}
            products={products}
            total={total}
            totalPages={totalPages}
            currentPage={currentPage}
            searchParams={searchParams}
            category={category}
            subcategory={subcategory}
          />
        <CategoryDescription description={subcategory?.description} page={currentPage} />
      </Container>
    </>
  );
}
