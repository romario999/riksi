import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string | undefined, userId?: number) => {
  let userCart;

  if (userId) {
    userCart = await prisma.cart.findFirst({
      where: { userId },
    });
  }

  if (!userCart && !userId) {
    userCart = await prisma.cart.findFirst({
      where: { token },
    });
  }

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token: token || '',
        userId: userId || null,
      },
    });
  } else if (userId && userCart.userId !== userId) {
    await prisma.cart.update({
      where: { id: userCart.id },
      data: { userId },
    });
  }

  return userCart;
};