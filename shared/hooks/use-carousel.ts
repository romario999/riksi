import { Api } from "@/shared/services/api-client";
import { SliderImage } from "@prisma/client";
import React from "react";
import { useIsMobile } from "@/shared/hooks";

export const useCarousel = () => {
    const [carousel, setCarousel] = React.useState<SliderImage[]>([]);
    const [loading, setLoading] = React.useState(true);
    const isMobile = useIsMobile();

    React.useEffect(() => {
        async function fetchCarouselItems() {
            try {
                if (isMobile === null) return;
                setLoading(true);
                const carouselItems = await Api.carousel.getAll(isMobile);
                setCarousel(carouselItems);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCarouselItems();
    }, [isMobile]);

    return {
        carousel,
        loading,
    };
};
