// shared/components/shared/admin/Pagination.tsx
import Link from "next/link";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  range?: number; // Опціонально, для налаштування кількості сторінок по обидва боки
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  range = 2,
}) => {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages < 1) return pages;

    // Перша сторінка завжди є
    pages.push(1);

    // Якщо існує пропуск між першою сторінкою і початком діапазону, додаємо "..."
    if (currentPage - range > 2) {
      pages.push("...");
    }

    // Генеруємо сторінки перед поточною
    for (let i = Math.max(2, currentPage - range); i < currentPage; i++) {
      pages.push(i);
    }

    // Якщо поточна сторінка не є першою або останньою, додаємо її
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }

    // Генеруємо сторінки після поточної
    for (
      let i = currentPage + 1;
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    // Якщо існує пропуск між кінцем діапазону і останньою сторінкою, додаємо "..."
    if (currentPage + range < totalPages - 1) {
      pages.push("...");
    }

    // Остання сторінка (якщо їх більше однієї)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-4 mt-16">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`}>
          <button className="px-4 py-2 text-lg font-semibold text-black hover:text-gray-500">
            ← Назад
          </button>
        </Link>
      )}
      {pageNumbers.map((page, index) => (
        <span key={index}>
          {typeof page === "number" ? (
            <Link href={`?page=${page}`}>
              <button
                className={`px-4 py-2 text-lg font-semibold transition-all duration-200 ${
                  page === currentPage
                    ? "text-black border-b-2 border-black"
                    : "text-black hover:text-gray-500"
                }`}
              >
                {page}
              </button>
            </Link>
          ) : (
            <span className="px-4 py-2 text-lg font-semibold text-gray-400">
              {page}
            </span>
          )}
        </span>
      ))}
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`}>
          <button className="px-4 py-2 text-lg font-semibold text-black hover:text-gray-500">
            Вперед →
          </button>
        </Link>
      )}
    </div>
  );
};
