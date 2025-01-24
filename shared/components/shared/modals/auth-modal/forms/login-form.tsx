'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { FormInputPassword } from '../../../form';

interface Props {
    onClose?: VoidFunction;
    onResetPassword?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose, onResetPassword }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (!resp?.ok) {
                throw Error();
            }

            toast.success('Успішний вхід в акаунт', {
                icon: '✅',
            });

            onClose?.();

        } catch (e) {
            console.error('[ERROR Login]', e);
            toast.error('Неправильний email або пароль', {
                icon: '❌',
            });
        }
    }

  return (
    <FormProvider {...form}>
        <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center">
                <div className="mr-2">
                    <Title text="Вхід в акаунт" size="md" className='font-bold' />
                    <p className='text-gray-400'>Введіть свою пошту для входу</p>
                </div>
               
            </div>

            <FormInput name="email" label="E-mail" required />
            <FormInputPassword name="password" label="Пароль" required />
            <div className="flex justify-end">
                <Button variant='link' type='button' onClick={onResetPassword}>Забули пароль?</Button>
            </div>

            <Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
                Увійти
            </Button>
        </form>
    </FormProvider>
  );
};