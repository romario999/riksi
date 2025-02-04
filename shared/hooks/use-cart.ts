import React from "react";
import { useCartStore } from "../store";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/get-cart-details";
import { useSession } from "next-auth/react";

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
}

export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state) => state);
    const session = useSession()
     
    React.useEffect(() => {
        if (session.status === "authenticated" || session.status === "unauthenticated") {
            cartState.fetchCartItems();
        }
    }, [session.status, cartState.fetchCartItems]);
    

    return cartState;
}