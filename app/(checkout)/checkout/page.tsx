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

export default function CheckoutPage() {
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
    const [submitting, setSubmitting] = React.useState(false);
    const {data: session} = useSession();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            deliveryType: '',
            novaPostCity: '',
            ukrPostCity: '',
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
            const [firstName, lastName] = data.fullName.split(' ');

            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
            form.setValue('email', data.email);
        }
        if(session) {
            fetchUserInfo();
        }
    }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            toast.success('Замовлення оформлено! Перехід на оплату...', {
                icon: '✅',
            });

            const paymentPrice = data.paymentType === 'allPayment' ? totalAmount : 200;
            const { paymentUrl, orderReference } = await createPayment(data, items, paymentPrice) as { paymentUrl: string; orderReference: string; };
            await createOrder(data, paymentUrl, orderReference);
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
                        {/* Ліва частина */}
                        <div className="flex flex-col gap-10 flex-1 xl:mb-20 mb-0">
                            {/* Кошик */}
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                            {/* Персональна інформація */}
                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ''} />

                            {/* Адреса */}
                            <CheckoutAdressForm className={loading ? "opacity-40 pointer-events-none" : ''} />

                            {/* Платіжна інформація */}
                            <CheckoutPaymentForm className={loading ? "opacity-40 pointer-events-none" : ''} />
                        </div>

                        {/* Права частина (сайдбар) */}
                        <div className="max-w-[480px] p-5 mx-auto w-full lg:sticky lg:top-28 lg:flex-shrink-0 mb-10 lg:mb-0">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}