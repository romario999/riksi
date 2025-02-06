'use server';

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate, ResetPassword, VerificationUserTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues, paymentUrl: string, orderReference: string) {
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

        const recipientFullName = data.otherRecipient ? (data.fullNameRecipient ?? '') : data.firstName + ' ' + data.lastName;
        const recipientPhone = data.otherRecipient ? (data.phoneNumberRecipient ?? '') : data.phone;

        const order = await prisma.order.create({
            data: {
                userId: Number(user?.id) ?? null,
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                recipientFullName,
                recipientPhone,
                email: data.email,
                phone: data.phone,
                address: deliveryData,
                comment: data.comment,
                status: OrderStatus.PENDING,
                totalAmount: userCart.totalAmount,
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

        if(!paymentUrl) {
            throw new Error('Payment link not found');
        }


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