'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './modals/auth-modal/forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput, FormInputPassword } from './form';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema), //formRegisterSchema
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: TFormRegisterValues) => { //TFormUpdateValues
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.success('Дані успішно оновлено', {
                icon: '✅',
            });
        } catch (e) {
            return toast.error('Помилка при оновленні даних', {
                icon: '❌',
            });
        }
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/',
        });
    };

  return (
    <Container className='flex flex-col items-center my-10'>
        <Title text={`Особисті дані | #${data.id}`} size='md' className='font-bold' />
        <FormProvider {...form}>
            <form className='flex flex-col gap-5 w-96 mt-5' onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="Email" required />
                <FormInput name="fullName" label="Повне імʼя" required />

                <FormInputPassword name="password" label='Новий пароль' />
                <FormInputPassword name="confirmPassword" label='Повторіть пароль' />

                <Button disabled={form.formState.isSubmitting} type="submit" className='text-base mt-10'>
                    Зберегти
                </Button>

                <Button
                    onClick={onClickSignOut}
                    variant="secondary"
                    disabled={form.formState.isSubmitting}
                    className='text-base'
                    type='button'
                >
                    Вийти
                </Button>
            </form>
        </FormProvider>
    </Container>
  );
};