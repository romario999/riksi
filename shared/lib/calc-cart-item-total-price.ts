import { CartItemDTO } from "../services/dto/cart.dto";


export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    return item.quantity * item.productItem.price;
}