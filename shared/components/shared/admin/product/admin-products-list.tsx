'use client';

import { Product } from '@prisma/client';
import React from 'react';
import { PaginationComponent } from '../../pagination-component';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSpinner, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa6';
import { Pencil, Trash2 } from 'lucide-react';
import { Api } from '@/shared/services/api-client';
import { deleteProduct } from '@/app/actions';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { AdminImportModal } from './admin-import-modal';

interface AdminProductsListProps {
  initialProducts: Product[];
  initialTotal: number;
  totalPages: number;
  currentPage: number;
}

export const AdminProductsList: React.FC<AdminProductsListProps> = ({
  initialProducts,
  initialTotal,
  totalPages,
  currentPage,
}) => {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [total, setTotal] = React.useState<number>(initialTotal);
  const [page, setPage] = React.useState<number>(currentPage);
  const [loading, setLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [importMessage, setImportMessage] = React.useState("");

  // При успішному імпорті можна оновити список або вивести повідомлення
  const onImportSuccess = (msg: string) => {
    setImportMessage(msg);
    setModalOpen(false);
    // Тут можна додати логіку оновлення списку, наприклад, зробити fetch оновлених даних
  };

  const [search, setSearch] = React.useState<string>(searchParams.get('search') || '');
  const sortBy = searchParams.get('sortBy') || '';

  const handleSortByPrice = () => {
    setLoading(true);
    const query = new URLSearchParams(window.location.search);
    if (sortBy === 'asc') {
      query.set('sortBy', 'desc');
    } else {
      query.set('sortBy', 'asc');
    }
    router.push(`?${query.toString()}`, { scroll: false });
  };

  React.useEffect(() => {
    if (!searchParams.has('page')) {
      const newSearchParams = new URLSearchParams(window.location.search);
      router.push(`?${newSearchParams.toString()}`, { scroll: false });
      setPage(1);
    }
  }, [searchParams, router]);

  React.useEffect(() => {
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

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Api.products.search(search);
      setProducts(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!search.trim()) {
      const timeout = setTimeout(() => {
        setProducts(initialProducts);
        setTotal(initialTotal);
        setPage(currentPage);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [initialProducts, initialTotal, currentPage, search]);

  const handleDeleteProduct = async (id: number, name: string) => {
    const isConfirmed = window.confirm(`Ви дійсно хочете видалити товар ${name}?`);
    if (isConfirmed) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
  

  return (
    <div className="p-6 min-h-screen relative">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Список товарів</h1>

      <form onSubmit={handleSearchSubmit} className="mb-4 flex">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук товарів..."
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <button disabled={loading || !search} type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Пошук
        </button>
      </form>

      <div className="my-6 flex justify-end gap-4 items-center">
        <Button onClick={() => setModalOpen(true)} variant="outline">
          Імпортувати
        </Button>

        {/* Вивід повідомлення про імпорт (поза модалкою) */}
        {importMessage && (
          <p
            className={`text-sm ${
              importMessage.toLowerCase().includes("помилка")
                ? "text-red-600"
                : "text-green-600"
            } max-w-xs`}
          >
            {importMessage}
          </p>
        )}

        {/* Експорт */}
        <Link href={"/api/export-products"} target="_blank">
          <Button variant={'outline'}>Експорт</Button>
        </Link>

        {/* Додати товар */}
        <Link href={'products/add-product'}>
          <Button>Додати товар</Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md relative">
        {loading ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
            <FaSpinner className="animate-spin" size={32} />
          </div>
        ) : null}

        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Зображення</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Назва</th>
              <th
                className="py-3 px-6 text-left text-sm font-medium text-gray-900 cursor-pointer flex items-center gap-2"
                onClick={handleSortByPrice}
              >
                Ціна
                {sortBy === 'asc' ? (
                  <FaSortUp className="text-blue-500" />
                ) : sortBy === 'desc' ? (
                  <FaSortDown className="text-blue-500" />
                ) : (
                  <FaSort />
                )}
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Кількість</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-3 px-6 text-sm">
                    <img
                      src={product.imageUrl[0] || '/placeholder.jpg'}
                      alt={product.name}
                      className="w-10 h-16 rounded"
                    />
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900">{product.name}</td>
                  <td className="py-3 px-6 text-sm text-gray-900">{product.price}₴</td>
                  <td className={`py-3 px-6 text-sm ${product.stock ? 'text-green-500' : 'text-red-500'}`}>
                    {product.stock ? 'В наявності' : 'Немає в наявності'}
                  </td>
                  <td className="py-3 px-6 text-sm">
                    <div className="flex gap-3 space-x-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <Pencil size={20} />
                      </Link>
                      <Trash2 size={20} className='cursor-pointer' onClick={() => handleDeleteProduct(product.id, product.name)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-3 px-6 text-center text-gray-500">
                  Немає товарів для відображення
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && products.length > 0 && (
        <div className="mt-10">
          <PaginationComponent currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
      <AdminImportModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onImportSuccess={onImportSuccess} />
    </div>
  );
};
