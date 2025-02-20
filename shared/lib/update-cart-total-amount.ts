import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";
import { CartItemDTO } from "../services/dto/cart.dto";

export const updateCartTotalAmount = async (token: string | undefined, userId?: number) => {
    let userCart;

    if (userId) {
        userCart = await prisma.cart.findFirst({
            where: { userId },
            include: {
                items: {
                    orderBy: { id: 'desc' },
                    include: {
                        productItem: { include: { product: true } }
                    }
                }
            }
        });
    } else if (token) {
        userCart = await prisma.cart.findFirst({
            where: { token },
            include: {
                items: {
                    orderBy: { id: 'desc' },
                    include: {
                        productItem: { include: { product: true } }
                    }
                }
            }
        });
    }

    if (!userCart) return null;

    const totalAmount = userCart.items.reduce((acc, item) => {
        const cartItemDTO: CartItemDTO = {
            ...item,
            productItem: {
                ...item.productItem,
                product: {
                    ...item.productItem.product,
                    categories: []
                }, // продукт вже є в productItem
            },
        };
        return acc + (calcCartItemTotalPrice(cartItemDTO) ?? 0);
    }, 0);

    return prisma.cart.update({
        where: { id: userCart.id },
        data: { totalAmount },
        include: {
            items: {
                orderBy: { id: 'desc' },
                include: {
                    productItem: { include: { product: true } }
                }
            }
        }
    });
};
