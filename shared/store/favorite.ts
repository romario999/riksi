import { create } from "zustand";
import { Api } from "../services/api-client";

export interface FavoriteState {
  favoriteLoading: boolean;
  error: boolean;
  favoriteItems: FavoriteItems[];
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (product: FavoriteItems) => Promise<void>;
}

export interface FavoriteItems {
  imageUrl: string[];
  id: number; 
  name: string; 
  productUrl: string;
  price: number;
  oldPrice: number | null;
}


export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteItems: [],
  error: false,
  favoriteLoading: true,

  fetchFavorites: async () => {
      try {
          set({ favoriteLoading: true, error: false });
          const likedLists = await Api.favorites.getFavorites();
          let products: FavoriteItems[] = [];

          if (likedLists.length > 0) {
              products = likedLists[0].items.map((item: any) => item.product);
          }

          set({ favoriteItems: products });
      } catch (error) {
          console.error(error);
          set({ error: true });
      } finally {
          set({ favoriteLoading: false });
      }
  },

  toggleFavorite: async (product) => {
      const { favoriteItems } = get();
      const isFavorite = favoriteItems.some(item => item.id === product.id);

      try {
          set({ favoriteLoading: true, error: false });

          if (isFavorite) {
              await Api.favorites.removeFavorite(product.id);
              set({ favoriteItems: favoriteItems.filter(item => item.id !== product.id) });
          } else {
              await Api.favorites.addFavorite(product.id);
              set({ favoriteItems: [...favoriteItems, product] });
          }
      } catch (error) {
          console.error(error);
          set({ error: true });
      } finally {
          set({ favoriteLoading: false });
      }
  },
}));
