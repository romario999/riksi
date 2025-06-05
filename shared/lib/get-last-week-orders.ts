import { prisma } from "@/prisma/prisma-client";

export const getLastWeekOrders = async () => {
  try {
    const today = new Date();

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const ordersCountByDay = await Promise.all(
      last7Days.map(async (date) => {
        const count = await prisma.order.count({
          where: {
            createdAt: {
              gte: new Date(`${date}T00:00:00.000Z`),
              lte: new Date(`${date}T23:59:59.999Z`),
            },
          },
        });

        return { date, count };
      })
    );

    return ordersCountByDay;
  } catch (error) {
    console.error(error);
    return [];
  }
};