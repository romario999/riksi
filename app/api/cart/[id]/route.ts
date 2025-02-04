import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const data = (await req.json()) as { quantity: number };
        const session = await getUserSession();
        const token = req.cookies.get("cartToken")?.value;

        // Якщо користувач не авторизований і немає токена, повертаємо помилку
        if (!session?.id && !token) {
            return NextResponse.json({ error: "Cart token or user session not found" });
        }

        // Знаходимо елемент кошика
        const cartItem = await prisma.cartItem.findFirst({ where: { id } });
        if (!cartItem) {
            return NextResponse.json({ error: "Cart item not found" });
        }

        // Оновлюємо кількість товару в кошику
        await prisma.cartItem.update({
            where: { id },
            data: { quantity: data.quantity }
        });

        // Оновлюємо загальну суму кошика (по токену або по userId)
        const updatedUserCart = await updateCartTotalAmount(token || "", Number(session?.id));

        return NextResponse.json(updatedUserCart);
    } catch (error) {
        console.log("[CART_PATCH] Server error", error);
        return NextResponse.json({ message: "Не вдалося оновити кошик" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getUserSession();
        const token = req.cookies.get("cartToken")?.value;

        if (!session?.id && !token) {
            return NextResponse.json({ error: "Cart token or user session not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: { id: Number(params.id) }
        });
        if (!cartItem) {
            return NextResponse.json({ error: "Cart item not found" });
        }

        await prisma.cartItem.delete({ where: { id: Number(params.id) } });

        const updatedUserCart = await updateCartTotalAmount(token || "", Number(session?.id));

        return NextResponse.json(updatedUserCart);
    } catch (error) {
        console.log("[CART_DELETE] Server error", error);
        return NextResponse.json({ message: "Не вдалося видалити кошик" }, { status: 500 });
    }
}
