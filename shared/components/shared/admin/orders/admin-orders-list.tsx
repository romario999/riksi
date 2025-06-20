'use client';

import { Order } from "@prisma/client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationComponent } from "../../pagination-component";
import { AdminOrdersDelivery } from "./admin-orders-delivery";
import { AdminOrdersItems } from "./admin-orders-items";

interface Props {
  initialOrders: Order[];
  totalPages: number;
  currentPage: number;
  initialTotal: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  dateFrom: string;
  dateTo: string;
}

export const AdminOrdersList: React.FC<Props> = ({
  initialOrders,
  totalPages,
  currentPage,
  sortBy,
  sortOrder,
  search,
  dateFrom,
  dateTo,
}) => {
  const [searchValue, setSearchValue] = useState(search || "");
  const [fromDate, setFromDate] = useState(dateFrom || "");
  const [toDate, setToDate] = useState(dateTo || "");
  const router = useRouter();
  const params = useSearchParams();
  const filtersActive = Boolean(params.get("search") || params.get("dateFrom") || params.get("dateTo"));


  const handleSort = (field: string) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    const query = new URLSearchParams(params.toString());
    query.set("sortBy", field);
    query.set("sortOrder", newOrder);
    query.set("page", "1");
    router.push(`?${query.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(params.toString());
    query.set("search", searchValue);
    if (fromDate) query.set("dateFrom", fromDate);
    else query.delete("dateFrom");

    if (toDate) query.set("dateTo", toDate);
    else query.delete("dateTo");

    query.set("page", "1");
    router.push(`?${query.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const query = new URLSearchParams(params.toString());
    query.set("page", newPage.toString());
    router.push(`?${query.toString()}`);
  };

  const handleResetFilters = () => {
    const query = new URLSearchParams(params.toString());
    query.delete("search");
    query.delete("dateFrom");
    query.delete("dateTo");
    query.set("page", "1");
    setSearchValue("");
    setFromDate("");
    setToDate("");
    router.push(`?${query.toString()}`);
  };

  return (
    <div className="h-screen">
      <h2 className="text-2xl font-semibold mb-4">Список замовлень</h2>

      <form onSubmit={handleSearch} className="mb-6 bg-gray-50 p-4 rounded-md shadow-sm">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col">
            <label htmlFor="search" className="text-sm text-gray-700 mb-1">Пошук за імʼям</label>
            <input
              id="search"
              type="text"
              placeholder="Введіть імʼя"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border px-3 py-2 rounded w-64"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fromDate" className="text-sm text-gray-700 mb-1">Дата від</label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="toDate" className="text-sm text-gray-700 mb-1">Дата до</label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Пошук
            </button>

            {filtersActive && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Скинути
              </button>
            )}
          </div>
        </div>
      </form>


      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="py-3 px-6 text-left text-sm font-medium text-gray-900 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID {sortBy === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Повне імʼя</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Сума</th>
            <th
              className="py-3 px-6 text-left text-sm font-medium text-gray-900 cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Дата {sortBy === "createdAt" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Доставка</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Оплата</th>
          </tr>
        </thead>
        <tbody>
          {initialOrders.length > 0 ? (
            initialOrders.map((order) => (
              <tr key={order.id} className="bg-white border-b">
                <td className="py-3 px-6 text-sm text-gray-900">{order.id}</td>
                <td className="py-3 px-6 text-sm text-gray-900">{order.fullName}

                  {order.fullName !== order.recipientFullName && (
                  <>
                    <br />
                    <span className="text-gray-500">Отримувач: {order.recipientFullName}</span>
                    <br />
                    <span className="text-gray-500">Телефон: {order.recipientPhone}</span>
                  </>
                )}
                </td>
                
                <AdminOrdersItems order={order} totalAmount={order.totalAmount} />
                <td className="py-3 px-6 text-sm text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString("uk-UA")} <br />
                  {new Date(order.createdAt).toLocaleTimeString("uk-UA")}
                </td>
                <AdminOrdersDelivery order={order} />
                <td className="py-3 px-6 text-sm text-gray-900">{order.paymentType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                Замовлень не знайдено.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && initialOrders.length > 0 && (
        <div className="mt-10">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
