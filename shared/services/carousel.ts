import { SliderImage } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (isMobile: boolean): Promise<SliderImage[]> => {
    const { data } = await axiosInstance.get<SliderImage[]>(ApiRoutes.CAROUSEL, {
        params: { isMobile },
    });
    return data;
};
