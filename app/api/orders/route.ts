import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getUserSession();

    if(!session) {
        throw new Error('Користувач не знайдений');
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: Number(session.id)
        },
        select: {
            id: true,
            status: true,
            totalAmount: true,
            items: true,
            createdAt: true
        }
    });

    return NextResponse.json(orders);
}