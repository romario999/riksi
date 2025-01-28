import { FooterPage } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";


export const getAll = async (): Promise<FooterPage[]> => {
    const {data} = await axiosInstance.get<FooterPage[]>(ApiRoutes.FOOTERPAGE);
    return data;
}