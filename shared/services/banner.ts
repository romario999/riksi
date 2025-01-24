import { BannerImage } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (isMobile: boolean): Promise<BannerImage[]> => {
    const { data } = await axiosInstance.get<BannerImage[]>(ApiRoutes.BANNER, {
        params: { isMobile },
    });
    return data;
};
