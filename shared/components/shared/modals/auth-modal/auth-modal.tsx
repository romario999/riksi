'use client';

import { Button, Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import { ApproveRegister } from './forms/approve-register';
import { ResetPassword } from './forms/reset-password';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<'login' | 'register'>('login');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
  };

  const handleResetPassword = () => {
    setIsResetPassword(true);
  };

  const handleClose = () => {
    onClose();
    setIsResetPassword(false);
    setIsRegistered(false);
    setType('login');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] max-h-[85vh] md:max-h-[95vh] overflow-y-scroll max-w-[450px] bg-white p-6 sm:p-10">
        {isResetPassword ? (
          <ResetPassword onClose={handleClose} /> // Відображення форми для відновлення паролю
        ) : isRegistered ? (
          <ApproveRegister onClose={handleClose} /> // Відображаємо компонент підтвердження
        ) : type === 'login' ? (
          <LoginForm onClose={handleClose} onResetPassword={handleResetPassword} />
        ) : (
          <RegisterForm onClose={handleClose} onRegistrationSuccess={handleRegistrationSuccess} />
        )}
        {!isRegistered && !isResetPassword && (
          <>
            <hr className="my-4" />
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/',
                    redirect: true,
                  })
                }
                type="button"
                className="gap-2 h-12 p-2 flex-1"
              >
                <img className="w-6 h-6" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
                Google
              </Button>
            </div>
            <Button variant="outline" onClick={onSwitchType} type="button" className="h-12 mt-4">
              {type === 'login' ? 'Зареєструватися' : 'Увійти'}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;