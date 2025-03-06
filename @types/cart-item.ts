export interface ProductCartItem {
    id: number;
    quantity: number;
    productItemId?: number;
    name: string;
    imageUrl: string;
    price: number;
    sku: string;
    productUrl?: string;
    size: string;
    categoryId: number[];
}