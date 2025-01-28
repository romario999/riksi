import React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        backgroundColor: '#edf2f7',
        height: '100%',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          margin: '0 auto',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <img src="/riksi.webp" alt="Logo RIKSI" style={{ margin: '0 auto' }} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'black', marginBottom: '16px' }}>
          Підтвердження вашої реєстрації на сайті RIKSI
        </h1>
        <p style={{ fontSize: '18px', color: 'black', marginBottom: '24px' }}>
          Ви отримали цей лист, тому що ми отримали запит на реєстрацію на нашому сайті. Для підтвердження
          реєстрації, будь ласка, використовуйте наступний код:
        </p>
        <div
          style={{
            color: 'black',
            fontSize: '24px',
            fontWeight: '700',
            padding: '16px 0',
            borderRadius: '8px',
          }}
        >
          {code}
        </div>
        <p style={{ fontSize: '14px', color: '#a0aec0', marginTop: '24px' }}>
          Якщо ви не робили цей запит, просто ігноруйте цей лист.
        </p>
      </div>
    </div>
  );
};
