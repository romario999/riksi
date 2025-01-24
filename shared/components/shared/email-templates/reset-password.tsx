import Link from 'next/link';
import React from 'react';

interface Props {
    resetLink: string;
}

export const ResetPassword: React.FC<Props> = ({ resetLink }) => {
  return (
    <div>
        <p>Щоб скинути пароль, перейдіть за посиланням:</p>
        <a href={resetLink}>{resetLink}</a>
        <p>Посилання дійсне протягом 1 години.</p>
        <p>Якщо ви не запитували скидання паролю, просто проігноруєте це повідомлення.</p>
    </div>
  );
};