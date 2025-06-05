import { AdminItemProduct } from "@/shared/components/shared/admin/productItem/admin-item-accordion";
import { ProductStickers } from "@prisma/client";

export type AdminAddProduct = {
    name: string,
    price: number,
    oldPrice: number | null,
    description: string | null,
    stock: boolean,
    popularity: number | null,
    productUrl: string,
    selectedStickers: ProductStickers[],
    color: string | null,
    images: string[],
    categories: {
        productId: number;
        categoryId: number
    }[],
    subcategories: {
        productId: number;
        subcategoryId: number
    }[],
    items: AdminItemProduct[]
}