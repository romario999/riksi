import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/constants/auth-options";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const likedItems = await prisma.liked.findMany({
            where: { userId: Number(session.user.id) },
            include: { 
                items: {
                    include: {
                        product: true
                    }
                } 
            },
        });

        return NextResponse.json(likedItems);
    } catch (error) {
        console.error("Error fetching liked items:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId } = await req.json();
        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        await toggleLikeProduct(session.user.id, productId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error [TOGGLE_LIKE_PRODUCT]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

async function toggleLikeProduct(userId: string, productId: number) {
    const likedList = await prisma.liked.findFirst({
        where: { userId: Number(userId) },
        include: { items: true },
    });

    if (!likedList) {
        await prisma.liked.create({
            data: {
                userId: Number(userId),
                items: {
                    create: {
                        product: { connect: { id: productId } },
                    },
                },
            },
        });
    } else {
        const existingItem = likedList.items.find(item => item.productId === productId);

        if (existingItem) {
            await prisma.likedItem.delete({
                where: { id: existingItem.id },
            });
        } else {
            await prisma.likedItem.create({
                data: {
                    liked: { connect: { id: likedList.id } },
                    product: { connect: { id: productId } },
                },
            });
        }
    }
}
