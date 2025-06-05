import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { AdminOrdersList } from "@/shared/components/shared/admin/orders/admin-orders-list";

interface SearchParams {
  searchParams: {
    page?: string;
    sortBy?: "createdAt" | "id";
    sortOrder?: "asc" | "desc";
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

export default async function AdminOrdersPage({ searchParams }: SearchParams) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;
  const sortBy = searchParams.sortBy || "createdAt";
  const sortOrder = searchParams.sortOrder || "desc";
  const search = searchParams.search || "";
  const dateFrom = searchParams.dateFrom ? new Date(searchParams.dateFrom) : null;
  const dateTo = searchParams.dateTo
  ? new Date(new Date(searchParams.dateTo).setHours(23, 59, 59, 999))
  : null;

  const whereClause: Prisma.OrderWhereInput = {
    ...(search && {
      fullName: {
        contains: search,
        mode: "insensitive",
      },
    }),
    ...(dateFrom && {
      createdAt: {
        gte: dateFrom,
        ...(dateTo ? { lte: dateTo } : {}),
      },
    }),
    ...(!dateFrom && dateTo && {
      createdAt: {
        lte: dateTo,
      },
    }),
  };

  const total = await prisma.order.count({ where: whereClause });

  const orders = await prisma.order.findMany({
    where: whereClause,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <AdminOrdersList
        initialOrders={orders}
        totalPages={totalPages}
        currentPage={currentPage}
        initialTotal={total}
        sortBy={sortBy}
        sortOrder={sortOrder}
        search={search}
        dateFrom={searchParams.dateFrom || ""}
        dateTo={searchParams.dateTo || ""}
      />
    </div>
  );
}
