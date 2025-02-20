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
    categoryId: number[];
}

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => {
        // Додаємо перевірку на існування categories
        const categories = item.productItem.product.categories || []; // Якщо categories не існує, ставимо порожній масив
        
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
            categoryId: categories.map(cat => cat.categoryId) // Мапимо, тільки якщо categories є
        }
    }) as CartStateItem[];

    return {
        items,
        totalAmount: data.totalAmount,
    }
}
