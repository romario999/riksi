'use client'

import { Order } from "@prisma/client";
import axios from "axios";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { PaginationComponent } from "../../pagination-component";

interface User {
  id: number;
  email: string;
  createdAt: Date;
  fullName: string;
  liked: any;
  orders: Order[];
  cart: any;
}

interface UsersProductListProps {
  initialUsers: User[];
  initialTotal: number;
  totalPages: number;
  currentPage: number;
  properties: string[];
}

export const UsersProductList: React.FC<UsersProductListProps> = ({
  initialUsers,
  initialTotal,
  totalPages: initialTotalPages,
  currentPage: initialPage,
  properties,
}) => {
  const [users, setUsers] = React.useState<User[]>(initialUsers);
  const [total, setTotal] = React.useState<number>(initialTotal);
  const [page, setPage] = React.useState<number>(initialPage);
  const [totalPages, setTotalPages] = React.useState<number>(initialTotalPages);
  const [loading, setLoading] = React.useState<boolean>(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Оновлення локального стану з параметрів URL та виклик API при їх зміні
  React.useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    const currentPage = parseInt(searchParams.get('page') || "1", 10);
    
    // При зміні параметрів оновлюємо локальний стан (наприклад, поле пошуку)
    setLoading(true);
    axios.get('/api/users/search', {
      params: { query: currentSearch, page: currentPage },
    })
    .then(({ data }) => {
      setUsers(data.users);
      setTotal(data.total);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [searchParams]);

  // Локальний стан поля пошуку для редагування форми
  const [search, setSearch] = React.useState<string>(searchParams.get('search') || '');

  // Сабміт пошукової форми - оновлення URL з параметрами search і скиданням сторінки до 1
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    // Формуємо нові параметри URL
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("search", trimmedSearch);
    queryParams.set("page", "1");
    router.push(`?${queryParams.toString()}`, { scroll: false });
  };

  // Обробка зміни сторінки - збереження параметра page і поточного пошуку
  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("page", newPage.toString());
      // Забезпечуємо, що пошуковий параметр теж існує
      queryParams.set("search", search.trim());
      router.push(`?${queryParams.toString()}`, { scroll: false });
      window.scrollTo(0, 0); // Прокрутка до верху сторінки
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук користувачів за іменем..."
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          type="submit"
          disabled={loading || !search.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {loading ? 'Пошук...' : 'Пошук'}
        </button>
      </form>

      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {properties.map((property, index) => (
              <th
                key={index}
                className="py-3 px-6 text-left text-sm font-medium text-gray-900"
              >
                {property}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.sort((a, b) => a.id - b.id).map((user) => (
              <tr key={user.id} className="bg-white border-b">
                <td className="py-3 px-6 text-sm font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="py-3 px-6 text-sm font-medium text-gray-900">
                  {user.email}
                </td>
                <td className="py-3 px-6 text-sm font-medium text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('uk-UA')}
                </td>
                <td className="py-3 px-6 text-sm font-medium text-gray-900">
                  {user.fullName}
                </td>
                <td className="py-3 px-6 text-sm font-medium text-gray-900">
                  {user.liked?.items?.length || 0}
                </td>
                <td className="py-3 px-6 text-sm font-medium text-gray-900">
                  {user.orders.length}
                </td>
                <td className="py-3 px-6 text-sm">
                  <Link href={`/admin/users/${user.id}`}>
                    <SquareArrowOutUpRight size={20} />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={properties.length} className="text-center py-6 text-gray-500">
                Користувачів не знайдено.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && users.length > 0 && (
        <div className="mt-10">
          <PaginationComponent currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};
