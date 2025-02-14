import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/constants/auth-options";
import { prisma } from "@/prisma/prisma-client";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const productId = Number(params.id); // отримуємо ID продукту з параметрів URL

        const likedList = await prisma.liked.findFirst({
            where: { userId: Number(session.user.id) },
            include: { items: true },
        });

        if (!likedList) {
            return NextResponse.json({ error: "Liked list not found" }, { status: 404 });
        }

        const likedItem = likedList.items.find(item => item.productId === productId);

        if (!likedItem) {
            return NextResponse.json({ error: "Liked item not found" }, { status: 404 });
        }

        await prisma.likedItem.delete({
            where: { id: likedItem.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting liked item:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
