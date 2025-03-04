import {z} from 'zod';

export const passwordSchema = z.string().min(6, { message: 'Пароль повинен містити не менше 6 символів' });

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Введіть коректний email' }),
    password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema.merge(
    z.object({
        fullName: z.string().min(4, { message: 'Введіть ваше імʼя, прізвище, по-батькові' }),
        confirmPassword: passwordSchema,
    })
).refine(data => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
});

export const verifyEmailSchema = z.object({
    code: z.string().min(6, { message: 'Код повинен містити 6 символів' }),
});

export const resetPasswordEmailSchema = z.object({
    emailReset: z.string().email({ message: 'Введіть коректний email' }),
});

export const resetPasswordSchema = z.object({
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmNewPassword'],
});

export const callMeSchema = z.object({
    callMeName: z.string().min(2, { message: 'Введіть ваше імʼя' }),
    callMePhone: z.string().min(9, { message: 'Некоректний номер телефону' }),
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormVerifyEmailValues = z.infer<typeof verifyEmailSchema>;
export type TFormResetPasswordEmailValues = z.infer<typeof resetPasswordEmailSchema>;
export type TFormResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type TFormCallMeValues = z.infer<typeof callMeSchema>;