'use server';

import React from 'react';
import { Body, Container, Head, Html, Img, Text } from '@react-email/components';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#edf2f7', height: '100%', padding: '24px' }}>
        <Container
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
            <Img
              src="https://www.riksi.com.ua/assets/images/riksi.png"
              alt="Logo RIKSI"
              width="120"
              style={{ margin: '0 auto' }}
            />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: 'black', marginBottom: '16px' }}>
            Підтвердження вашої реєстрації на сайті RIKSI
          </h3>
          <Text style={{ fontSize: '18px', color: 'black', marginBottom: '24px' }}>
            Ви отримали цей лист, тому що ми отримали запит на реєстрацію на нашому сайті. Для підтвердження
            реєстрації, будь ласка, використовуйте наступний код:
          </Text>
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
          <Text style={{ fontSize: '14px', color: '#a0aec0', marginTop: '24px' }}>
            Якщо ви не робили цей запит, просто ігноруйте цей лист.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
