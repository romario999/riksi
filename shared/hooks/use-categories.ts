import useSWR from "swr";
import { Api } from "@/shared/services/api-client";
import { Category, Subcategory } from "@prisma/client";

const fetchCategoriesAndSubcategories = async () => {
  try {
    // Виконуємо обидва запити одночасно
    const [categories, subcategories] = await Promise.all([
      Api.categories.getAll(),
      Api.subcategories.getAll(),
    ]);
    return { categories, subcategories };
  } catch (error) {
    console.error("Помилка завантаження категорій:", error);
    throw error;
  }
};

export const useCategories = () => {
  const { data, error, isLoading } = useSWR(
    "categories-subcategories", 
    fetchCategoriesAndSubcategories,
    {
      revalidateOnFocus: false, // Не оновлювати при фокусі на сторінку
      dedupingInterval: 60000, // Кешування на 5 хвилин
    }
  );

  return {
    categories: data?.categories || [],
    subcategories: data?.subcategories || [],
    loading: isLoading,
    error,
  };
};
