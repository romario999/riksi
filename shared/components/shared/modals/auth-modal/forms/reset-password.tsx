import { Button, FormInput, Title } from '@/shared/components';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createLinkResetPassword } from '@/app/actions';
import { resetPasswordEmailSchema, TFormResetPasswordEmailValues } from './schemas';

interface Props {
    onClose?: VoidFunction;
}

export const ResetPassword: React.FC<Props> = ({ onClose }) => {

    const form = useForm<TFormResetPasswordEmailValues>({
        resolver: zodResolver(resetPasswordEmailSchema),
        defaultValues: {
            emailReset: '',
        },
    });

    const onSubmit = async (data: TFormResetPasswordEmailValues) => {
        try {
            await createLinkResetPassword(data.emailReset);
            onClose?.();
            toast.success('Посилання для відновлення паролю успішно відправлено!', {
                icon: '✅',
            });
        } catch (e) {
            console.error('[ERROR Login]', e);
            toast.error("Помилка при відправленні посилання для відновлення паролю", {
                icon: '❌',
            });
        }
    }

  return (
    <FormProvider {...form}>
        <Title size="sm" className="text-center font-medium" text="Забули пароль?" />
        <p className="text-gray-400 text-sm">
            Введіть ваш email і ми надішлемо вам посилання для відновлення паролю
        </p>
        <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput 
                name="emailReset" 
                placeholder='E-mail' 
                required 
                value={form.watch('emailReset')}
                onChange={(e) => form.setValue('emailReset', e.target.value)}
            />
            <Button loading={form.formState.isSubmitting} className="h-12 mt-5 text-base flex justify-center" type="submit">
                Надіслати
            </Button>
        </form>
    </FormProvider>
  );
};