import useSWR from "swr";
import { Api } from "@/shared/services/api-client";
import { FooterPage } from "@prisma/client";

const fetchFooterPages = async () => {
  try {
    return await Api.footerPages.getAll();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useFooter = () => {
  const { data: footerPages, error, isLoading } = useSWR<FooterPage[]>(
    "footer-pages",
    fetchFooterPages,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000,
    }
  );

  return {
    footerPages: footerPages || [],
    loading: isLoading,
    error,
  };
};
