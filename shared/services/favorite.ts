import { axiosInstance } from "./instance";

export const getFavorites = async (): Promise<any[]> => {
    return (await axiosInstance.get<number[]>('/favorites')).data;
};

export const addFavorite = async (productId: number): Promise<void> => {
    await axiosInstance.post('/favorites', { productId });
};

export const removeFavorite = async (productId: number): Promise<void> => {
    await axiosInstance.delete(`/favorites/${productId}`);
};
