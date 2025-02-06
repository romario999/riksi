'use client';
import React, { Suspense, useState } from 'react';
import { Category, Product } from '@prisma/client';
import { Filters } from './filters';
import { Button } from '../ui';
import { Filter } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ProductSkeleton } from './product-skeleton';

interface FilterProductsBlockProps {
  isCatalog?: boolean;
  isCategory?: boolean;
  isSubcategory?: boolean;
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  searchParams: Record<string, string>;
  categoryLink?: string;
  subcategoryLink?: string;
  category?: {
    id: number;
    name: string;
    categoryUrl?: string;
  } | null;
  subcategory?: {
    id: number;
    name: string;
    description?: string | null;
    subcategoryUrl?: string;
    category: Category;
  } | null | undefined;
}

const ProductList = dynamic(() => import('./products-list'), {
  ssr: false,
  loading: () => <ProductSkeleton />
});

export const FilterProductsSection: React.FC<FilterProductsBlockProps> = ({
  isCatalog = false,
  isCategory = false,
  isSubcategory = false,
  products,
  total,
  totalPages,
  currentPage,
  searchParams,
  categoryLink,
  subcategoryLink,
  category,
  subcategory,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = () => {
    setLoading(true);
  };

  const handleShowFilters = () => {
    setShowFilters((prev) => !prev);

    // Прокручуємо сторінку до самого верху
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-0 sm:gap-0">
      {/* Контейнер для кнопки фільтру */}
      <div className="sm:hidden sticky top-16 z-10 bg-white p-4 w-full">
        <Button
          variant={'link'}
          className="text-lg justify-start p-2 text-black rounded-lg transition-all duration-300"
          onClick={handleShowFilters}
        >
          {showFilters ? 'Приховати фільтри / сортування' : 'Фільтри / сортування'} <Filter />
        </Button>
      </div>

      {/* Секція фільтрів з анімацією */}
      <div
        className={`bg-white sm:w-[290px] mx-auto w-[260px] pr-9 transition-all duration-300 ${showFilters ? 'max-h-[1500px]' : 'max-h-0'} sm:max-h-full overflow-hidden`}
        style={{ transitionProperty: 'max-height' }}
      >
        <Suspense>
          <Filters
            isCatalog={isCatalog}
            isCategory={isCategory}
            isSubcategory={isSubcategory}
            hasSubcategory={Boolean(subcategory)}
            categoryId={category ? String(category.id) : undefined}
            categoryName={category ? category.name : undefined}
            subcategoryId={subcategory ? String(subcategory.id) : undefined}
            onFilterChange={handleFilterChange}
          />
        </Suspense>
      </div>

      {/* Секція списку продуктів */}
      <div className="flex-1">
          <ProductList
            loading={loading}
            setLoading={setLoading}
            category={categoryLink}
            subcategory={subcategoryLink}
            initialProducts={products}
            initialTotal={total}
            totalPages={totalPages}
            currentPage={currentPage}
            initialSearchParams={Object.fromEntries(Object.entries(searchParams))}
          />
      </div>
    </div>
  );
};
