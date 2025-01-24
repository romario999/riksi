import {z} from 'zod';

export const passwordSchema = z.string().min(6, { message: 'Пароль повинен містити не менше 6 символів' });

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Введіть коректний email' }),
    password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema.merge(
    z.object({
        fullName: z.string().min(2, { message: 'Введіть імʼя та прізвище' }),
        confirmPassword: passwordSchema,
    })
).refine(data => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
});

export const verifyEmailSchema = z.object({
    code: z.string().min(6, { message: 'Код повинен містити 6 символів' }),
});

export const resetPasswordSchema = z.object({
    emailReset: z.string().email({ message: 'Введіть коректний email' }),
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormVerifyEmailValues = z.infer<typeof verifyEmailSchema>;
export type TFormResetPasswordValues = z.infer<typeof resetPasswordSchema>;