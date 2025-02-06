import { Order } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";


export const getAll = async (): Promise<Order[]> => {
    const {data} = await axiosInstance.get<Order[]>(ApiRoutes.ORDERS);
    return data;
}