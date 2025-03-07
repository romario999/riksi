import React from 'react';

interface Props {
  resetLink: string;
}

export const ResetPassword: React.FC<Props> = ({ resetLink }) => {
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
          <img src="https://www.riksi.com.ua/riksi.png" alt="Logo RIKSI" style={{ margin: '0 auto', width: 120 }} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'black', marginBottom: '16px' }}>
          Скидання паролю на сайті RIKSI
        </h1>
        <p style={{ fontSize: '18px', color: 'black', marginBottom: '24px' }}>
          Щоб скинути пароль, перейдіть за наступним посиланням:
        </p>
        <a
          href={resetLink}
          style={{
            display: 'inline-block',
            backgroundColor: '#000',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '18px',
            textDecoration: 'none',
            fontWeight: '700',
            marginBottom: '24px',
          }}
        >
          Скинути пароль
        </a>
        <p style={{ fontSize: '14px', color: '#a0aec0', marginTop: '24px' }}>
          Посилання дійсне протягом 1 години.
        </p>
        <p style={{ fontSize: '14px', color: '#a0aec0', marginTop: '16px' }}>
          Якщо ви не запитували скидання паролю, просто проігноруйте цей лист.
        </p>
      </div>
    </div>
  );
};
