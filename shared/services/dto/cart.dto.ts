import { Cart, CartItem, Product, ProductItem } from "@prisma/client";

export type ProductWithCategories = Product & {
    categories: {
        categoryId: number;
    }[];
}

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: ProductWithCategories;
    };
}

export interface CartDTO extends Cart {
    items: CartItemDTO[];
}

export interface CreateCartItemValues {
    productItemId: number;
}