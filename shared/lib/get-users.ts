import { prisma } from '@/prisma/prisma-client';

const ITEMS_PER_PAGE = 18;

interface GetProductsParams {
  searchParams: Record<string, string>;
  itemsPerPage?: number;
}

export async function getUsers({
  searchParams,
  itemsPerPage = ITEMS_PER_PAGE,
}: GetProductsParams) {
  const page = parseInt(searchParams.page as string || "1", 10);
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        select: {
            id: true,
            email: true,
            createdAt: true,
            fullName: true,
            liked: { include: { items: true } },
            orders: true,
            cart: true,
        },
        orderBy: { id: "asc" },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(total / itemsPerPage);

  return {users, total, totalPages, currentPage: page}
}
