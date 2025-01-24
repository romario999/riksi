import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { getUserSession } from "@/shared/lib/get-user-session";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value;

        if(!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                      token,
                    }
                ]
            },
            include: {
                items: {
                    orderBy: {
                        id: 'desc'
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            }
                        }
                    }
                },
            }
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log('[CART_GET] Server error', error);
        return NextResponse.json({ message: 'Не вдалося отримати кошик' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;
        const session = await getUserSession();

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token, session?.id);

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

        const updatedUserCart = await updateCartTotalAmount(token);
        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token, {
            path: '/',
            maxAge: 2592000, // 30 days
            httpOnly: true, // Забезпечуємо безпеку кукі
        });
        return resp;

    } catch (error) {
        console.log('[CART_POST] Server error', error);
        return NextResponse.json({ message: 'Не вдалося додати в кошик' }, { status: 500 });
    }
}