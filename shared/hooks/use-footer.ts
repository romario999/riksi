import useSWR from 'swr';
import { Api } from "@/shared/services/api-client";
import { FooterPage } from "@prisma/client";

const fetchFooterPages = async () => {
  try {
    return await Api.footerPages.getAll();
  } catch (error) {
    console.error("Помилка завантаження сторінок футера:", error);
    throw error;
  }
};

export const useFooter = () => {
  const { data: footerPages, error, isLoading } = useSWR<FooterPage[]>(
    "footer-pages", // Унікальний ключ для кешування
    fetchFooterPages,
    {
      revalidateOnFocus: false, // Не оновлювати при поверненні на сторінку
      refreshInterval: 60000, // Кешувати дані на 5 хвилин
    }
  );

  return {
    footerPages: footerPages || [],
    loading: isLoading,
    error,
  };
};
