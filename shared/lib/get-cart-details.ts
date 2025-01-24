import { CartDTO } from "../services/dto/cart.dto";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    productUrl?: string;
    disabled?: boolean;
    sku: string;
    size: string;
}

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item, i) => {
        return {
            id: item.id,
            quantity: item.quantity,
            productItemId: item.productItemId,
            name: item.productItem.product.name,
            imageUrl: item.productItem.product.imageUrl[0],
            price: item.productItem.price,
            sku: item.productItem.sku,
            productUrl: `/product/${item.productItem.product.productUrl}`,
            size: item.productItem.size,
        }
    }) as CartStateItem[];
    return {
        items,
        totalAmount: data.totalAmount,
    }
}