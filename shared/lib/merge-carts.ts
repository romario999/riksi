import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "./update-cart-total-amount";

export const mergeCarts = async (userId: number, token: string) => {
    if (!token) return;

    const anonymousCart = await prisma.cart.findFirst({
        where: { token },
        include: { items: true },
    });

    if (!anonymousCart || anonymousCart.items.length === 0) return;

    const userCart = await prisma.cart.findFirst({
        where: { userId },
        include: { items: true },
    });

    if (!userCart) {
        await prisma.cart.update({
            where: { id: anonymousCart.id },
            data: { userId, token: '' },
        });

        await updateCartTotalAmount('', userId);

        return;
    }

    const userCartItemsMap = new Map(
        userCart.items.map(item => [item.productItemId, item.quantity])
    );

    for (const item of anonymousCart.items) {
        if (userCartItemsMap.has(item.productItemId)) {
            await prisma.cartItem.updateMany({
                where: {
                    cartId: userCart.id,
                    productItemId: item.productItemId,
                },
                data: {
                    quantity: userCartItemsMap.get(item.productItemId)! + item.quantity,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: item.productItemId,
                    quantity: item.quantity,
                },
            });
        }
    }

    await prisma.cartItem.deleteMany({
        where: { cartId: anonymousCart.id },
    });

    await prisma.cart.delete({
        where: { id: anonymousCart.id },
    });

    await updateCartTotalAmount('', userId);
};