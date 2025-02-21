'use client';

import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "./form-input";
import { resetPasswordSchema, TFormResetPasswordValues } from "../modals/auth-modal/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui";
import { FormInputPassword } from "./form-input-password";
import toast from "react-hot-toast";
import { resetPassword } from "@/app/actions";

interface Props {
    token: string;
}

export const FormResetPassword: React.FC<Props> = ({token}) => {

    const form = useForm<TFormResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const onSubmit = async (data: TFormResetPasswordValues) => {
        try {
            await resetPassword(token, data.newPassword);
            toast.success('Пароль успішно змінено', {
                icon: '✅',
            });

            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (e) {
            console.error('[ERROR Reset Password]', e);
            toast.error("Помилка при зміні паролю", {
                icon: '❌',
            });
        }
    }

  return (
    <FormProvider {...form}>
        <form className="flex mt-3 flex-col gap-5 w-[300px]" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInputPassword
                name="newPassword"
                placeholder="Новий пароль"
                value={form.watch('newPassword')}
            />
            <FormInputPassword
                name="confirmNewPassword"
                placeholder="Підтвердіть пароль"
                value={form.watch('confirmNewPassword')}
            />
            <Button loading={form.formState.isSubmitting} className="h-12 mt-3 text-base flex justify-center" type="submit">
                Змінити пароль
            </Button>
        </form>
    </FormProvider>
  );
};
