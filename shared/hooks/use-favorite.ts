import React from "react";
import { FavoriteItems, useFavoriteStore } from "../store";
import { useSession } from "next-auth/react";

type ReturnProps = {
    favoriteItems: FavoriteItems[];
    favoriteLoading: boolean;
    toggleLoading: boolean;
    toggleFavorite: (product: FavoriteItems) => void;
};

export const useFavorites = (): ReturnProps => {
    const favoriteState = useFavoriteStore((state) => state);
    const session = useSession();

    React.useEffect(() => {
        if (session.status === "authenticated") {
            favoriteState.fetchFavorites();
        } else if (session.status === "unauthenticated") {
            // Якщо користувач не залогінений, зупиняємо "завантаження"
            // (можна використати setState від Zustand напряму)
            useFavoriteStore.setState({ favoriteLoading: false });
        }
    }, [session.status, favoriteState.fetchFavorites]);

    return favoriteState;
};
