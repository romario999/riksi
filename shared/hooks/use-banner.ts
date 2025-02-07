import { Api } from "@/shared/services/api-client";
import { BannerImage } from "@prisma/client";
import { useIsMobile } from "@/shared/hooks";
import useSWR from "swr";

const fetchBannerItems = async (isMobile: boolean) => {
    try {
      return await Api.banner.getAll(isMobile);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const useBanner = () => {
    const isMobile = useIsMobile();

    const { data: carousel, error, isLoading } = useSWR<BannerImage[]>(
        isMobile !== null ? `banner-${isMobile}` : null,
        () => fetchBannerItems(isMobile as boolean),
        {
          revalidateOnFocus: false,
          refreshInterval: 60000,
        }
    );

    return {
        banner: carousel || [], 
        loading: isLoading,
        error,
    };
};
