'use server';

import { AdminAddProduct } from "@/@types/admin-add-product";
import { AdminAddSubcategoryType } from "@/@types/admin-add-subcategory";
import { AdminCarouselBannerUpdate } from "@/@types/admin-carousel-banner-update";
import { ProductUpdate } from "@/@types/admin-product-update";
import { ProductCartItem } from "@/@types/cart-item";
import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate, ResetPassword, VerificationUserTemplate } from "@/shared/components";
import { AddProductItem } from "@/shared/components/shared/admin/productItem/admin-add-product-item";
import { CheckoutFormValues } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendOrderAutoselling } from "@/shared/lib/send-order-autoselling";
import { OrderStatus, Prisma, Product } from "@prisma/client";
import { hashSync } from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues, paymentUrl: string, orderReference: string, finalAmount: number, cartItems: ProductCartItem[]) {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;
        const user = await getUserSession();

        if (!cartToken && !user) {
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
                token: cartToken ?? '',
                fullName: data.fullName,
                recipientFullName,
                recipientPhone,
                email: data.email,
                phone: data.phone,
                deliveryCity: data.deliveryType === 'nova-post' ? (data.novaPostCity ?? '') : (data.ukrPostCity ?? ''),
                deliveryDepartment: data.deliveryType === 'nova-post' ? (data.department ?? '') : (data.ukrPostDepartment ?? ''),
                address: deliveryData,
                comment: data.comment ?? '',
                paymentType: data.paymentType === 'allPayment' ? 'Передплата' : 'Післяплата (завдаток 200 грн)',
                status: OrderStatus.PENDING,
                subtotalAmount: userCart.totalAmount,  // Зберігаємо суму без знижки
                discountAmount: discount,  // Зберігаємо суму знижки
                totalAmount: finalAmount,  // Обчислюємо підсумкову суму
                items: JSON.stringify(cartItems),
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
            products: cartItems.map((item) => ({
                price: item.price,
                title: item.name,
                article: item.sku,
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
            delivery_name: data.otherRecipient ? data.fullNameRecipient : data.fullName,
            delivery_type: {
                id: data.deliveryType === 'nova-post' ? 1 : 2,
                title: data.deliveryType === 'nova-post' ? 'Новою поштою' : 'Укрпоштою'
            },
            delivery_phone: data.otherRecipient ? data.phoneNumberRecipient : data.phone,
            delivery_address: `${data.department || data.ukrPostDepartment || data.street + " " + data.numberStreet}`,
            recipient: {
                name: data.otherRecipient ? data.fullNameRecipient?.split(" ")[1] : data.fullName.split(" ")[1],
                phone: data.otherRecipient ? data.phoneNumberRecipient : data.phone,
                surname: data.otherRecipient ? data.fullNameRecipient?.split(" ")[0] : data.fullName.split(" ")[0],
                patronymic: data.otherRecipient ? data.fullNameRecipient?.split(" ")[2] : data.fullName.split(" ")[2],
            }
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

export async function applyPromoCode({ code, cartCategoryIds }: {
    code: string;
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

        if(!promo.active) {
            return { error: "Промокод неактивний" };
        }

        if(promo.expiresAt && promo.expiresAt < new Date()) {
            return { error: "Промокод закінчився" };
        }

        // Перевіряємо, чи промокод застосовується до всіх товарів або конкретних категорій
        if (promo.categoryIds.length > 0) {
            const hasMatchingCategory = cartCategoryIds.every((id: string | null | undefined) =>
                id && promo.categoryIds.includes(id) && cartCategoryIds.map(Number).includes(Number(id))
            );
        
            if (!hasMatchingCategory) {
                return { error: "Цей промокод не застосовується до ваших товарів" };
            }
        }
        
        revalidatePath("/checkout"); // Оновлюємо сторінку

        // Повертаємо лише відсоток знижки
        return { discountPercent: promo.discountPercent };
    } catch (error) {
        console.error('Error [APPLY_PROMO_CODE]', error);
        return { error: "Помилка застосування промокоду" };
    }
}

export async function deleteProduct(productId: number) {
    try {
        await prisma.productCategory.deleteMany({
            where: { productId },
        });

        await prisma.productSubcategory.deleteMany({
            where: { productId },
        });

        const carts = await prisma.cart.findMany({
            where: {
                items: {
                    some: {
                        productItem: { productId },
                    },
                },
            },
            include: {
                items: {
                    include: {
                        productItem: true,
                    },
                },
            },
        });

        for (const cart of carts) {
            const updatedTotalAmount = cart.items
                .filter((item) => item.productItem.productId !== productId) // Exclude the deleted product
                .reduce((acc, item) => acc + item.productItem.price * item.quantity, 0); // Recalculate total

            await prisma.cart.update({
                where: { id: cart.id },
                data: { totalAmount: updatedTotalAmount },
            });
        }

        await prisma.cartItem.deleteMany({
            where: {
                productItem: { productId },
            },
        });

        await prisma.productItem.deleteMany({
            where: { productId },
        });

        await prisma.likedItem.deleteMany({
            where: { productId },
        });

        await prisma.product.delete({
            where: { id: productId },
        });

    } catch (error) {
        console.error('Error [DELETE_PRODUCT]', error);
        throw error;
    }
}

export async function deleteAdminProductItem(sku: string) {
    try {
        await prisma.productItem.delete({
            where: { sku },
        });
    } catch (error) {
        console.error('Error [DELETE_ADMIN_PRODUCT_ITEM]', error);
        throw error;
    }
}

export async function updateAdminProductItem(sku: string, updatedItem: AddProductItem) {
    try {
        await prisma.productItem.update({
            where: { sku },
            data: updatedItem,
        });
        
    } catch (error) {
        console.error('Error [UPDATE_ADMIN_PRODUCT_ITEM]', error);
        throw error;
    }
}

export async function adminUpdateProductData(id: number, data: ProductUpdate) {
    try {

        await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                price: data.price,
                oldPrice: data.oldPrice,
                description: data.description,
                stock: data.stock,
                popularity: data.popularity || 0,
                productUrl: data.url,
                sticker: data.selectedStickers,
                color: data.color,
                imageUrl: data.images,
                items: {
                    upsert: data.items.map((item) => ({
                        where: { sku: item.sku }, // Шукаємо товар за SKU
                        update: {
                            price: item.price,
                            oldPrice: item.oldPrice,
                            stock: item.stock,
                            size: item.size,
                        },
                        create: {
                            sku: item.sku,
                            price: item.price,
                            oldPrice: item.oldPrice,
                            stock: item.stock,
                            size: item.size,
                        }
                    }))
                },
                
                categories: {
                    deleteMany: {}, // Видаляє всі зв'язані категорії
                    createMany: {
                        data: data.categories.map((category) => ({
                            categoryId: category.categoryId,
                        })),
                    },
                },
                subcategories: {
                    deleteMany: {}, // Видаляє всі зв'язані підкатегорії
                    createMany: {
                        data: data.subcategories.map((subcategory) => ({
                            subcategoryId: subcategory.subcategoryId,
                        })),
                    },
                },
                complects: {
                    deleteMany: {}, // Видаляє всі зв'язані комплекти
                    create: data.complects.map((complect) => ({
                      productId: complect.productId, // assuming `productId` is the foreign key
                    })),
                } 
            }
        });

        const existingComplect = await prisma.productComplect.findMany({
            where: {
                products: {
                    some: { id }
                }
            },
            include: {
                products: true
            }
        });

        if(existingComplect && existingComplect.length > 0) {

            await prisma.productComplect.update({
                where: { id: existingComplect[0].id },
                data: {
                  products: {
                    set: data.complects[0].products.map((product: Product) => ({ id: product.id })) // встановлюємо нові продукти для комплекту
                  }
                }
            });
        }

        if(existingComplect.length === 0) {
            if(data.complects.length > 0) {
                await prisma.productComplect.create({
                    data: {
                        products: {
                            connect: data.complects[0].products.map((product: Product) => ({ id: product.id })),  // з'єднуємо продукти з комплектом
                        }
                    }
                });
            }
        }
        
    } catch (error) {
        console.error('Error [ADMIN_UPDATE_PRODUCT_DATA]', error);
        throw error;
    }
}

export async function addAdminProduct(data: AdminAddProduct) {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                oldPrice: data.oldPrice || null,
                description: data.description,
                stock: data.stock,
                popularity: data.popularity || 0,
                productUrl: data.productUrl,    
                sticker: data.selectedStickers,
                color: data.color,
                imageUrl: data.images,
                categories: {
                    createMany: {
                        data: data.categories.map((category) => ({
                            categoryId: category.categoryId,
                        })),
                    },
                },
                subcategories: {
                    createMany: {
                        data: data.subcategories.map((subcategory) => ({
                            subcategoryId: subcategory.subcategoryId,
                        })),
                    },
                },
                items: {
                    createMany: {
                        data: data.items.map((item) => ({
                            sku: item.sku,
                            price: item.price,
                            oldPrice: item.oldPrice,
                            stock: item.stock,
                            size: item.size,
                        })),
                    },
                }
            }
        });

        return newProduct.id;
    } catch (error) {
        console.error('Error [ADD_ADMIN_PRODUCT]', error);
        throw error;
    }
}

export async function AdminUpdateWebsiteEditData(id: number, data: AdminCarouselBannerUpdate, type: string) {
    try {
        if(type === 'slider') {
            await prisma.sliderImage.update({
                where: { id },
                data: data,
            });   
        }

        if(type === 'banner') {
            await prisma.bannerImage.update({
                where: { id },
                data: data,
            });
        }
    } catch (error) {
        console.error('Error [ADMIN_UPDATE_WEBSITE_EDIT_DATA]', error);
        throw error;
    }
}

export async function AdminDeleteWebsiteEditData(id: number, type: string) {
    try {
        if(type === 'slider') {
            await prisma.sliderImage.delete({
                where: { id },
            });
        }

        if(type === 'banner') {
            await prisma.bannerImage.delete({
                where: { id },
            });
        }
    } catch (error) {
        console.error('Error [ADMIN_DELETE_WEBSITE_EDIT_DATA]', error);
        throw error;
    }
}

export async function AdminAddSliderImage(data: AdminCarouselBannerUpdate) {
    try {
        await prisma.sliderImage.create({
            data,
        });

    } catch (error) {
        console.error('Error [ADMIN_ADD_SLIDER_IMAGE]', error);
        throw error;
    }
}

export async function AdminAddBannerImage(data: AdminCarouselBannerUpdate) {
    try {
        await prisma.bannerImage.create({
            data,
        });

    } catch (error) {
        console.error('Error [ADMIN_ADD_BANNER_IMAGE]', error);
        throw error;
    }
}

export async function AdminUpdateUser(data: Prisma.UserUpdateInput, userId: number) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                fullName: data.fullName,
                email: data.email,
                password: data.password ? hashSync(data.password as string, 10) : undefined,
            },
        });
    } catch (error) {
        console.error('Error [ADMIN_UPDATE_USER]', error);
        throw error;
    }
    
}

export async function AdminUpdateCategory(data: Prisma.CategoryUpdateInput, id: number) {
    try {
        await prisma.category.update({
            where: { id },
            data,
        });

        const hasDiscount = data.discountPercent !== undefined && data.discountPercent !== null;

        const productsInCategory = await prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        categoryId: id,
                    },
                },
            },
            select: {
                id: true,
                price: true,
                oldPrice: true,
            },
        });

        if (hasDiscount) {
            const discount = Number(data.discountPercent);

            const updateWithDiscount = productsInCategory.map(product => {
                // Якщо вже є oldPrice — не чіпай його, щоб не втратити стару ціну
                const basePrice = product.oldPrice ?? product.price;
                const newPrice = Math.round(basePrice * (1 - discount / 100));

                return prisma.product.update({
                    where: { id: product.id },
                    data: {
                        oldPrice: basePrice,
                        price: newPrice,
                    },
                });
            });

            await Promise.all(updateWithDiscount);
        } else {
            const resetPrices = productsInCategory
                .filter(product => product.oldPrice !== null)
                .map(product =>
                    prisma.product.update({
                        where: { id: product.id },
                        data: {
                            price: product.oldPrice!,
                            oldPrice: null,
                        },
                    })
                );

            await Promise.all(resetPrices);
        }

    } catch (e) {
        console.error('Error [ADMIN_UPDATE_CATEGORY]', e);
        throw e;
    }
}



export async function AdminAddCategory(data: Prisma.CategoryCreateInput) {
    try {
        await prisma.category.create({
            data,
        })
    } catch (e) {
        console.error('Error [ADMIN_ADD_CATEGORY]', e);
        throw e;
    }
}

export async function AdminDeleteCategory(id: number) {
    try {
        const subcategories = await prisma.subcategory.findMany({
            where: { categoryId: id },
            select: { id: true },
        });
    
        const subcategoryIds = subcategories.map((sub) => sub.id);

        if (subcategoryIds.length > 0) {
            await prisma.productSubcategory.deleteMany({
                where: {
                    subcategoryId: { in: subcategoryIds },
                },
            });

            await prisma.subcategory.deleteMany({
                where: { id: { in: subcategoryIds } },
            });
        }

        await prisma.productCategory.deleteMany({
            where: { categoryId: id },
        });
  
        // 5. Видаляємо саму категорію
        await prisma.category.delete({
            where: { id },
        });
  
    } catch (e) {
        console.error('Error [ADMIN_DELETE_CATEGORY]', e);
        throw e;
    }
}
  

export async function AdminDeleteSubcategory(id: number) {
    try {
        // Видаляємо всі зв'язки продуктів з підкатегорією
        await prisma.productSubcategory.deleteMany({
            where: { subcategoryId: id },
        });
    
        // Видаляємо саму підкатегорію
        await prisma.subcategory.delete({
            where: { id },
        });
    } catch (e) {
        console.error("Error [ADMIN_DELETE_SUBCATEGORY]", e);
        throw e;
    }
  }
  

export async function AdminUpdateSubcategory(data: Prisma.SubcategoryUpdateInput, id: number) {
    try {
        await prisma.subcategory.update({
            where: { id },
            data,
        })
    } catch (e) {
        console.error('Error [ADMIN_UPDATE_SUBCATEGORY]', e);
        throw e;
    }
}

export async function AdminAddSubcategory(data: AdminAddSubcategoryType) {
    try {
        await prisma.subcategory.create({
            data,
        })
    } catch (e) {
        console.error('Error [ADMIN_ADD_SUBCATEGORY]', e);
        throw e;
    }
}

export async function AdminDeleteFooterPage(id: number) {
    try {
        await prisma.footerPage.delete({
            where: { id },
        })
    } catch (e) {
        console.error('Error [ADMIN_DELETE_FOOTER_PAGE]', e);
        throw e;
    }
}

export async function AdminFooterPageSave(data: Prisma.FooterPageUpdateInput, id: number) {
    try {
        await prisma.footerPage.update({
            where: { id },
            data,
        })
    } catch (e) {
        console.error('Error [ADMIN_FOOTER_PAGE_SAVE]', e);
        throw e;
    }
}

export async function AdminFooterPageAdd(data: Prisma.FooterPageCreateInput) {
    try {
        await prisma.footerPage.create({
            data,
        })
    } catch (e) {
        console.error('Error [ADMIN_FOOTER_PAGE_ADD]', e);
        throw e;
    }
}

export async function AdminDeletePromoCode(id: number) {
    try {
        await prisma.promoCode.delete({
            where: { id },
        })
    } catch (e) {
        console.error('Error [ADMIN_DELETE_PROMOCODE]', e);
        throw e;
    }
}

export async function AdminDiscountSave(id: number, data: Prisma.PromoCodeUpdateInput) {
    try {
        await prisma.promoCode.update({
            where: { id },
            data,
        })
    } catch (e) {
        console.error('Error [ADMIN_DISCOUNT_SAVE]', e);
        throw e;
    }
}

export async function AdminDiscountCreate(data: Prisma.PromoCodeCreateInput) {
    try {
        await prisma.promoCode.create({
            data,
        })
    } catch (e) {
        console.error('Error [ADMIN_DISCOUNT_ADD]', e);
        throw e;
    }
}