import { prisma } from "@/prisma/prisma-client";
import { OrderChart } from "@/shared/components/shared/admin/main/line-chart-orders";
import { Last10Orders } from "@/shared/components/shared/admin/main/main-last-10-orders";
import { MainPopularProducts } from "@/shared/components/shared/admin/main/main-popular-products";
import { getLastWeekOrders } from "@/shared/lib/get-last-week-orders";

export default async function AdminPage() {
    const orders = await getLastWeekOrders();
    const popularProducts = await prisma.order.findMany({
        // where: {
        //     createdAt: {
        //         gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        //     }
        // },
        select: {
            items: true
        }
    });
    const last10Orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    });
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-5">
                <div className="inline-block bg-gray-50 rounded-lg p-5">
                    <OrderChart data={orders} />
                </div>

                <div className="inline-block bg-gray-50 rounded-lg p-2">
                    <MainPopularProducts popularProducts={popularProducts} />
                </div>
            </div>

            <div>
                <Last10Orders last10Orders={last10Orders} />
            </div>
        </div>
    )
}