import useSWR from "swr";
import { Api } from "@/shared/services/api-client";
import { Category, Subcategory } from "@prisma/client";

const fetchCategoriesAndSubcategories = async () => {
  try {
    const [categories, subcategories] = await Promise.all([
      Api.categories.getAll(),
      Api.subcategories.getAll(),
    ]);
    return { categories, subcategories };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useCategories = () => {
  const { data, error, isLoading } = useSWR<{ categories: Category[]; subcategories: Subcategory[] }>(
    "categories-subcategories",
    fetchCategoriesAndSubcategories,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000,
    }
  );

  return {
    categories: data?.categories || [],
    subcategories: data?.subcategories || [],
    loading: isLoading,
    error,
  };
};
