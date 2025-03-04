'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CheckoutPaymentForm, CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { CheckoutAdressForm, CheckoutCart, CheckoutPersonalForm } from "@/shared/components";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { createPayment } from "@/shared/lib";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
    const categoryIds = items.map((item) => item.categoryId).flat().map(String);

    const [submitting, setSubmitting] = React.useState(false);
    const [discount, setDiscount] = React.useState(0);

    const {data: session} = useSession();
    const router = useRouter();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            fullName: '',
            deliveryType: '',
            novaPostCity: '',
            idCity: '',
            ukrPostCity: '',
            idDepartment: '',
            department: '',
            street: '',
            numberStreet: '',
            novaPostTypeDelivery: '',
            ukrPostDepartment: '',
            paymentType: '',
            phone: '',
            dontCall: false,
            otherRecipient: false,
            comment: '',
        }
    });

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();

            form.setValue('fullName', data.fullName);
            form.setValue('email', data.email);
        }
        if(session) {
            fetchUserInfo();
        }
    }, [session]);

    React.useEffect(() => {
        if (items.length === 0) {
            router.push("/");
        }
    }, [items, router]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            toast.success('Замовлення оформлено! Перехід на оплату...', {
                icon: '✅',
            });

            const finalAmount = totalAmount - discount; // Враховуємо знижку
            const paymentPrice = data.paymentType === 'allPayment' ? finalAmount : 1;

            const { paymentUrl, orderReference } = await createPayment(data, items, paymentPrice) as { paymentUrl: string; orderReference: string; };
            await createOrder(data, paymentUrl, orderReference, finalAmount);  // Передаємо finalAmount для обчислення totalAmount
            window.location.href = paymentUrl; 
        } catch (err) {
            console.error(err);
            setSubmitting(false);
            toast.error('Не вдалося оформити замовлення', {
                icon: '❌',
            });
        }
    };

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10">
            <Title text="Оформлення замовлення" className="font-extrabold p-3 mx-auto mb-8 sm:text-[36px] text-[28px]" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col p-3 lg:flex-row gap-10 lg:gap-40">
                        <div className="flex flex-col gap-10 flex-1 xl:mb-20 mb-0">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ''} />
                            <CheckoutAdressForm className={loading ? "opacity-40 pointer-events-none" : ''} />

                            <CheckoutPaymentForm className={loading ? "opacity-40 pointer-events-none" : ''} />
                        </div>

                        <div className="max-w-[480px] p-5 mx-auto w-full lg:sticky lg:top-28 lg:flex-shrink-0 mb-10 lg:mb-0">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} cartCategoryIds={categoryIds} onDiscountChange={setDiscount} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}