'use client';

import { useState, useEffect } from 'react';
import { Product } from '@prisma/client';
import { ProductCard } from './product-card';
import { Flame } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PaginationComponent } from './pagination-component';
import { FaSpinner } from 'react-icons/fa6';
import { MiniProductCard } from './mini-product-card';
import { useIsMobile } from '@/shared/hooks';


export interface GetSearchParams {
  page?: string | number;
  limit?: string | number;
  query?: string;
  sortBy?: string;
  categoryUrl?: string;
  subcategoryUrl?: string;
  categoryId?: string;
  subcategoryId?: string;
  size?: string;
  color?: string;
  categories?: string;
  subcategories?: string;
  priceFrom?: string;
  priceTo?: string;
}

interface ProductListProps {
  initialProducts: Product[];
  initialTotal: number;
  totalPages: number;
  currentPage: number;
  initialSearchParams: { [key: string]: string };
  category?: string;
  subcategory?: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function ProductList({
  initialProducts,
  initialTotal,
  totalPages,
  currentPage,
  initialSearchParams,
  category,
  subcategory,
  loading,
  setLoading,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState<number>(initialTotal);
  const [page, setPage] = useState<number>(currentPage);
  const isMobile = useIsMobile(784);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.has('page')) {
      const newSearchParams = new URLSearchParams(window.location.search);
      router.push(`?${newSearchParams.toString()}`, { scroll: false });
      setPage(1);
    }
  }, [searchParams, router]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setLoading(true);
      setPage(newPage);
      const query = new URLSearchParams(window.location.search);
      query.set('page', newPage.toString());
      router.push(`?${query.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProducts(initialProducts);
      setTotal(initialTotal);
      setPage(currentPage);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [initialProducts, initialTotal, currentPage, setLoading]);

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 opacity-40 z-40">
          <FaSpinner className="animate-spin" size={32} />
        </div>
      )}
      <div className={`${loading ? 'opacity-40' : ''}`}>
        <div className={`mx-auto flex justify-center items-center ${products.length === 0 ? 'min-h-[200px]' : ''}`}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-11 px-2 max-w-[1200px] auto-rows-fr">
            {products.length === 0 ? (
              <p className="mt-4 mx-auto text-base">Немає товарів</p>
            ) : (
              products.map((product) =>
                isMobile ? (
                  <div className="flex justify-center" key={product.id}>
                    <MiniProductCard
                      className={`relative ${product.stock ? '' : 'opacity-50'}`}
                      id={product.id}
                      url={product.productUrl}
                      name={product.name}
                      imageUrl={product.imageUrl}
                      price={product.price}
                      discountPrice={product.oldPrice}
                    >
                      {product.sticker.map((sticker, i) => (
                        <Sticker key={i} sticker={sticker} index={i} />
                      ))}
                    </MiniProductCard>
                  </div>
                ) : (
                  <ProductCard
                    className={`relative ${product.stock ? '' : 'opacity-50'}`}
                    key={product.id}
                    id={product.id}
                    url={product.productUrl}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    discountPrice={product.oldPrice}
                  >
                    {product.sticker.map((sticker, i) => (
                      <Sticker key={i} sticker={sticker} index={i} />
                    ))}
                  </ProductCard>
                )
              )
            )}
          </div>
        </div>
      </div>

      {totalPages > 1 && products.length > 1 && (
        <div className="mt-10">
          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

const Sticker = ({ sticker, index }: { sticker: string; index: number }) => {
  const bgClass =
    sticker === 'HITS' ? 'bg-[#28a745] text-white' :
    sticker === 'NEW' ? 'bg-[#e80aa4] text-white' :
    sticker === 'PRICEPARTY' ? 'bg-yellow-300 text-black' : '';

  return (
    <div
      className={`absolute ${index === 0 ? 'top-4' : 'top-12'} ${bgClass} left-2 rounded-l-full rounded-r-sm py-1 px-2 text-sm`}
    >
      {sticker === 'HITS' ? <Flame size={18} /> : sticker === 'NEW' ? 'New' : 'Price Party'}
    </div>
  );
};
