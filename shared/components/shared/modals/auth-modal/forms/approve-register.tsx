'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TFormVerifyEmailValues, verifyEmailSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp';
import { Button, Title } from '@/shared/components';
import toast from 'react-hot-toast';
import { handleVerification, verifyUser } from '@/app/actions';

interface Props {
    onClose?: VoidFunction;
}

export const ApproveRegister: React.FC<Props> = ({ onClose }) => {

    const userData = JSON.parse(sessionStorage.getItem('userData') as string);

    const form = useForm<TFormVerifyEmailValues>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            code: '',
        },
    });

    const [timeLeft, setTimeLeft] = useState(59);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft((prevTime) => prevTime - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const onSubmit = async (data: TFormVerifyEmailValues) => {
        try {
            await verifyUser(data.code);
            toast.success('Акаунт підтверджено', {
                icon: '✅',
            })
            onClose?.();
        } catch (e) {
            console.error('[ERROR Login]', e);
            toast.error('Невірний код', {
                icon: '❌',
            });
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    };

    const handleResendCode = async () => {
        try {
            await handleVerification(userData.userId, userData.email);
            setTimeLeft(59);
            toast.success('Код успішно відправлено', {
                icon: '📩',
            });
        } catch (e) {
            console.error('[ERROR Login]', e);
            toast.error('Виникла помилка', {
                icon: '❌',
            });
        }
    };

    const errorMessage = form.formState.errors.code?.message;

    return (
        <FormProvider {...form}>
            <Title size="sm" className="text-center font-medium" text="Введіть код для підтвердження" />
            <p className="text-gray-400 text-sm">
                На вказаний email було надіслано 6-значний код для підтвердження створеного акаунту
            </p>
            <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2 mx-auto">
                    <InputOTP
                        maxLength={6}
                        value={form.watch('code')}
                        onChange={(value) => form.setValue('code', value)}
                        inputMode='numeric'
                        onKeyDown={handleKeyPress}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
                <div className="flex justify-end">
                    <Button 
                            variant='link' 
                            type='button' 
                            className={`bg-none ${timeLeft === 0 ? '' : 'pointer-events-none text-gray-400'}`}
                            onClick={handleResendCode}
                        >
                        Відправити ще раз {timeLeft > 0 && `- 0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`} 
                    </Button>
                </div>
                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Підтвердити
                </Button>
            </form>
        </FormProvider>
    );
};
