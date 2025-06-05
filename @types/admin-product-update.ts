import { ProductStickers } from "@prisma/client";

export type ProductUpdate = {
    name: string;
    price: number;
    oldPrice: number | null;
    description: string | null;
    stock: boolean;
    popularity: number | null;
    url: string;
    selectedStickers: ProductStickers[];
    color: string | null;
    images: string[];
    items: {
        price: number;
        oldPrice: number | null;
        sku: string;
        size: string;
        stock: boolean;
    }[]
    categories: {
        productId: number;
        categoryId: number
    }[];
    subcategories: {
        productId: number;
        subcategoryId: number
    }[];
    complects: any[]
};