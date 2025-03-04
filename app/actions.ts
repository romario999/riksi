'use server';

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate, ResetPassword, VerificationUserTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendOrderAutoselling } from "@/shared/lib/send-order-autoselling";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues, paymentUrl: string, orderReference: string, finalAmount: number) {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;
        const user = await getUserSession();

        if (!cartToken) {
            throw new Error('Cart token not found');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                OR: [
                    { token: cartToken },
                    { userId: Number(user?.id) }
                ]
            },
        });

        if(!userCart) {
            throw new Error('Cart not found');
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        let deliveryData = `Тип доставки: ${data.deliveryType == 'nova-post' ? 'Нова Пошта' : 'Укрпошта'}, `;

        if (data.deliveryType === 'nova-post') {
            deliveryData += `Місто: ${data.novaPostCity}, `;
            if(data.novaPostTypeDelivery === 'department') {
                deliveryData += `Спосіб доставки: Відділення/поштомат `;
                deliveryData += `Відділення: ${data.department}, `;
            } else {
                deliveryData += `Спосіб доставки: Курʼєр, `;
                deliveryData += `Вулиця: ${data.street}, `;
                deliveryData += `Номер будинку: ${data.numberStreet}, `;
            }
        } else if (data.deliveryType === 'ukr-post') {
            deliveryData += `Місто: ${data.ukrPostCity}, `;
            deliveryData += `Відділення: ${data.ukrPostDepartment}, `;
        }

        const deliveryType = data.deliveryType === 'nova-post' ? 'Нова Пошта' : 'Укрпошта';

        const recipientFullName = data.otherRecipient ? (data.fullNameRecipient ?? '') : data.fullName;
        const recipientPhone = data.otherRecipient ? (data.phoneNumberRecipient ?? '') : data.phone;
        const discount = userCart.totalAmount !== finalAmount ? userCart.totalAmount - finalAmount : 0;
        const order = await prisma.order.create({
            data: {
                userId: Number(user?.id) ?? null,
                token: cartToken,
                fullName: data.fullName,
                recipientFullName,
                recipientPhone,
                email: data.email,
                phone: data.phone,
                address: deliveryData,
                comment: data.comment ?? '',
                paymentType: data.paymentType === 'allPayment' ? 'Передплата' : 'Післяплата (завдаток 200 грн)',
                status: OrderStatus.PENDING,
                subtotalAmount: userCart.totalAmount,  // Зберігаємо суму без знижки
                discountAmount: discount,  // Зберігаємо суму знижки
                totalAmount: finalAmount,  // Обчислюємо підсумкову суму
                items: JSON.stringify(userCart.items),
                paymentId: orderReference,
                typeDelivery: deliveryType,
                dontCall: data.dontCall || false,
            },
        });

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        const autoSellObj = {
            comment: data.comment,
            order_id: order.id,
            products: userCart.items.map((item) => ({
                price: item.productItem.price,
                title: item.productItem.product.name,
                article: item.productItem.sku,
                quantity: item.quantity,
            })),
            total_sum: finalAmount,
            payment_type: {
                id: data.paymentType === 'allPayment' ? 1 : 2,
                title: data.paymentType === 'allPayment' ? 'Передплата' : 'Післяплата (завдаток 200 грн)'
            },
            stat_created: new Date().toLocaleString('sv-SE').replace('T', ' '),
            delivery_city: data.ukrPostCity || data.novaPostCity,
            delivery_data: {
                destination: {
                    address: {
                        geoObject: {		
                            id: data.idCity,
                            name: data.ukrPostCity || data.novaPostCity,				
                        },
                        warehouse: {		
                            id: data.idDepartment,					
                            name: data.department	
                        }
                    }
                }
            },
            delivery_name: data.fullNameRecipient ?? data.fullName,
            delivery_type: {
                id: data.deliveryType === 'nova-post' ? 1 : 2,
                title: data.deliveryType === 'nova-post' ? 'Новою поштою' : 'Укрпоштою'
            },
            delivery_phone: data.phone,
            delivery_address: `${data.department || data.ukrPostDepartment || data.street + " " + data.numberStreet}`,
        };

        if(!paymentUrl) {
            throw new Error('Payment link not found');
        }

        await sendOrderAutoselling(autoSellObj);

        await sendEmail(data.email, 'Оплата замовлення ' + order.id, PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl,
        }));

    } catch (err) {
        console.error('[CreateOrder] Server error', err);
    }    
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if(!currentUser) {
            throw new Error('Користувач не знайдений');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });

    } catch (err) {
        console.log('Error [UPDATE_USER]', err);
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email: body.email },
        });

        if (existingUser) {
            if (existingUser.verified) {
                throw new Error('Користувач вже існує');
            }

            await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                    fullName: body.fullName,
                    password: hashSync(body.password, 10),
                },
            });

            await handleVerification(String(existingUser.id), existingUser.email);
            return { 
                userId: existingUser.id,
                email: existingUser.email
            };
        }

        const newUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        await handleVerification(String(newUser.id), newUser.email);
        return {
            userId: newUser.id,
            email: newUser.email,
        };
    } catch (error) {
        console.error('Error [CREATE_USER]', error);
        throw error;
    }
}

export async function handleVerification(userId: string, email: string) {
    try {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.upsert({
            where: { userId: Number(userId) },
            update: { code },
            create: { userId: Number(userId), code },
        });

        await sendEmail(
            email,
            'Підтвердження реєстрації 📝',
            VerificationUserTemplate({ code })
        );
    } catch (error) {
        console.error('Error [HANDLE_VERIFICATION]', error);
        throw error;
    }
}

export async function verifyUser(code: string) {
    try {
        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                code,
            },
        });

        if(!verificationCode) {
            throw new Error('Невірний код');
        }

        await prisma.user.update({
            where: {
                id: verificationCode.userId,
            },
            data: {
                verified: new Date(),
            }
        });

        await prisma.verificationCode.delete({
            where: {
                id: verificationCode.id,
            },
        });

    } catch (error) {
        console.log('Error [VERIFY_USER]', error);
        throw error;
    }
};

export async function createLinkResetPassword(email: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if(!user) {
            throw new Error('Користувач не знайдений');
        }

        const resetToken = Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000);

        await prisma.passwordResetToken.upsert({
            where:  { id: user.id },
            update: { token: resetToken, expiresAt: expirationTime },
            create: { userId: user.id, token: resetToken, expiresAt: expirationTime },
        });

        const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password/${resetToken}`;
        await sendEmail(email, 'Скидання пароля 🔒', ResetPassword({ resetLink }));

    } catch(error) {
        console.log('Error [RESET_PASSWORD]', error);
        throw error;
    }
}

export async function resetPassword(token: string, newPassword: string) {
    try {
        const resetToken = await prisma.passwordResetToken.findFirst({
            where: {
                token,
                expiresAt: { gt: new Date() }, // Токен має бути дійсним.
            },
        });

        if (!resetToken) {
            throw new Error('Недійсний або прострочений токен');
        }

        const hashedPassword = hashSync(newPassword, 10);

        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword },
        });

        await prisma.passwordResetToken.delete({
            where: { id: resetToken.id },
        });

    } catch (error) {
        console.error('Error [RESET_PASSWORD]', error);
        throw error;
    }
}

export async function callMe(body: Prisma.CallMeCreateInput) {
    try {
        await prisma.callMe.create({
            data: body,
        });
    } catch (error) {
        console.error('Error [CALL_ME]', error);
        throw error;
    }
}

export async function applyPromoCode({ code, totalAmount, cartCategoryIds }: {
    code: string;
    totalAmount: number;
    cartCategoryIds: string[];
}) {
    try {
        // Отримуємо промокод із бази даних
        const promo = await prisma.promoCode.findUnique({
            where: { code },
        });

        if (!promo) {
            return { error: "Промокод недійсний" };
        }

        // Перевіряємо, чи промокод застосовується до всіх товарів або конкретних категорій
        if (promo.categoryIds.length > 0) {
            const applicable = cartCategoryIds.every((id: string) => promo.categoryIds.includes(id));
            if (!applicable) {
                return { error: "Цей промокод не застосовується до ваших товарів" };
            }
        }

        // Обчислюємо нову суму замовлення
        const discount = (totalAmount * promo.discountPercent) / 100;
        const newTotal = Math.max(0, totalAmount - discount);

        revalidatePath("/checkout"); // Оновлюємо сторінку

        return { newTotal, discount };
    } catch (error) {
        console.error('Error [APPLY_PROMO_CODE]', error);
        return { error: "Помилка застосування промокоду" };
    }
}