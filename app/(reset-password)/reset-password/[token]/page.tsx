import { prisma } from '@/prisma/prisma-client';
import { Button } from '@/shared/components';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FormResetPassword } from '@/shared/components/shared/form/form-reset-password';

interface ResetPasswordPageProps {
  token: string;
}

export default async function ResetPasswordPage({
  params: { token },
}: {
  params: ResetPasswordPageProps;
}) {
  const isTokenValid = await prisma.passwordResetToken.findFirst({
    where: {
      token,
      expiresAt: {
        gte: new Date(),
      },
    },
  });

  if (!isTokenValid) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
        <Image src="/riksi.webp" alt="Logo reset-password page" width={152} height={152} />
        <h4 className="text-4xl mt-5 font-bold text-gray-800">Посилання не дійсне</h4>
        <p className="mt-4 text-lg text-gray-600">
          Посилання для скидання паролю не дійсне або закінчився термін дії
        </p>
        <Link href="/">
          <Button variant="outline" className="mt-4" size={'lg'}>
            Повернутися на головну
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <Image src="/riksi.webp" alt="Logo reset password page" width={152} height={152} />
      <h4 className="text-4xl mt-5 font-bold text-gray-800">Скидання паролю</h4>
      <p className="mt-4 text-lg text-gray-600">Введіть новий пароль</p>
      <FormResetPassword token={token} />
    </div>
  );
}
