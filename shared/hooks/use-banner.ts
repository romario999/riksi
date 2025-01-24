import { Api } from "@/shared/services/api-client";
import { BannerImage } from "@prisma/client";
import React from "react";
import { useIsMobile } from "@/shared/hooks";

export const useBanner = () => {
    const [banner, setBanner] = React.useState<BannerImage[]>([]);
    const [loading, setLoading] = React.useState(true);
    const isMobile = useIsMobile();

    React.useEffect(() => {
        async function fetchBannerItems() {
            try {
                if (isMobile === null) return;
                setLoading(true);
                const bannerItems = await Api.banner.getAll(isMobile);
                setBanner(bannerItems);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBannerItems();
    }, [isMobile]);

    return {
        banner,
        loading,
    };
};
