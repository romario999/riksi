import {  Subcategory } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Subcategory[]> => {
    const {data} = await axiosInstance.get<Subcategory[]>(ApiRoutes.SUBCATEGORIES);
    return data;
}