import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormInputPassword } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';

interface Props {
    onClose: VoidFunction;
    onRegistrationSuccess: VoidFunction; 
  }
  
  export const RegisterForm: React.FC<Props> = ({ onClose, onRegistrationSuccess }) => {
    const form = useForm<TFormRegisterValues>({
      resolver: zodResolver(formRegisterSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });
  
    const onSubmit = async (data: TFormRegisterValues) => {
      try {
        const {userId, email} = await registerUser({
          email: data.email,
          fullName: data.fullName,
          password: data.password,
        });
  
        onRegistrationSuccess();

        sessionStorage.setItem('userData', JSON.stringify({ userId, email }));
      } catch (e) {
        console.error('[ERROR Login]', e);
        toast.error("Користувач вже існує або помилка при реєстрації", {
          icon: '❌',
      });
      }
    };
  
    return (
      <FormProvider {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-mail" required />
          <FormInput name="fullName" label="ПІБ" required />
          <FormInputPassword name="password" label="Пароль" required />
          <FormInputPassword name="confirmPassword" label="Повторіть пароль" required />
  
          <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
            Зареєструватися
          </Button>
        </form>
      </FormProvider>
    );
  };
  