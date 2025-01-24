import axios from 'axios';

export async function POST(req: Request) {
  try {
    const paymentData = await req.json(); // Отримуємо дані з тіла запиту

    const response = await axios.post('https://secure.wayforpay.com/pay?behavior=offline', paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Відправляємо відповідь клієнту
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error processing payment request' }), { status: 500 });
  }
}
