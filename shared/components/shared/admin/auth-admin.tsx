'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { formAdminLogin, TFormAdminLoginValues } from "../modals/auth-modal/forms/schemas";
import { Title } from "../title";
import { FormInput, FormInputPassword } from "../form";
import { Button } from "../../ui";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function AuthAdmin() {
    const form = useForm<TFormAdminLoginValues>({
        resolver: zodResolver(formAdminLogin),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: TFormAdminLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            });
    
            if (!resp?.ok) {
                throw Error();
            }
    
            const session = await fetch('/api/auth/session').then((res) => res.json());
    
            if (session?.user?.role !== 'ADMIN') {
                toast.error('У вас немає доступу до адмін-панелі', {
                    icon: '🚫',
                });
                return;
            }
    
            toast.success('Успішний вхід в акаунт', {
                icon: '✅',
            });
    
            window.location.href = '/admin';
    
        } catch (e) {
            console.error('[ERROR Login]', e);
            toast.error('Неправильний email або пароль', {
                icon: '❌',
            });
        }
    };
    
    

    return (
        <div className="flex items-center justify-center h-screen">
            <FormProvider {...form}>
                <form className='flex flex-col gap-3 w-96' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-center items-center">
                        <Title text="Вхід" size="md" className='font-bold' />
                    </div>

                    <FormInput name="email" label="E-mail" required />
                    <FormInputPassword name="password" label="Пароль" required />

                    <Button loading={form.formState.isSubmitting} className='h-12 mt-5 text-base' type='submit'>
                        Увійти
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
    
}