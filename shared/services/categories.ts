import { Category, Subcategory } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";


export const getAll = async (): Promise<Category[]> => {
    const {data} = await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES);
    return data;
}