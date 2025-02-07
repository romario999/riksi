import useSWR from 'swr';
import { Api } from "@/shared/services/api-client";
import { useIsMobile } from "@/shared/hooks";
import { SliderImage } from '@prisma/client';

const fetchCarouselItems = async (isMobile: boolean) => {
  try {
    return await Api.carousel.getAll(isMobile);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useCarousel = () => {
  const isMobile = useIsMobile();

  const { data: carousel, error, isLoading } = useSWR<SliderImage[]>(
    isMobile !== null ? `carousel-${isMobile}` : null,
    () => fetchCarouselItems(isMobile as boolean),
    {
      revalidateOnFocus: false,
      refreshInterval: 60000,
    }
  );

  return {
    carousel: carousel || [], 
    loading: isLoading,
    error,
  };
};