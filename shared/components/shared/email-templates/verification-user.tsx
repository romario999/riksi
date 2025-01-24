import React from 'react';

interface Props {
    code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  return (
    <div>
        <p>Код підтвердження: <h2>{code}</h2></p>
    </div>
  );
};