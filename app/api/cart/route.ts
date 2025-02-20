import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { getUserSession } from "@/shared/lib/get-user-session";
import { mergeCarts } from "@/shared/lib/merge-carts";

export async function GET(req: NextRequest) {
    try {
        const session = await getUserSession();
        const token = req.cookies.get("cartToken")?.value;

        if (!session?.id && !token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        if (session?.id && token) {
            await mergeCarts(Number(session.id), token);
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                userId: session?.id ? Number(session.id) : undefined,
                token: session?.id ? undefined : token,
            },
            include: {
                items: {
                    orderBy: { id: "desc" },
                    include: { 
                        productItem: { 
                            include: { 
                                product: { 
                                    include: { 
                                        categories: {
                                            select: { categoryId: true } // Отримуємо лише ID категорій
                                        } 
                                    } 
                                } 
                            } 
                        } 
                    },
                },
            },
        });

        return NextResponse.json(userCart ?? { totalAmount: 0, items: [] });
    } catch (error) {
        console.error("[CART_GET] Server error", error);
        return NextResponse.json(
            { message: "Не вдалося отримати кошик" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getUserSession();
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(
            session?.id ? undefined : token, 
            session?.id ? Number(session.id) : undefined 
        );
        

        if (!session?.id) {
            await prisma.cart.update({
                where: { id: userCart.id },
                data: { userId: null },
            });
        }

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
            },
        });

        if (findCartItem) {
            await prisma.cartItem.update({
                where: { id: findCartItem.id },
                data: { quantity: findCartItem.quantity + 1 },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                }
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token, Number(session?.id));

        const resp = NextResponse.json(updatedUserCart);

        if (!session?.id) {
            resp.cookies.set('cartToken', token, {
                path: '/',
                maxAge: 2592000, // 30 днів
                httpOnly: true,
            });
        }

        return resp;

    } catch (error) {
        console.error('[CART_POST] Server error', error);
        return NextResponse.json({ message: 'Не вдалося додати в кошик' }, { status: 500 });
    }
}