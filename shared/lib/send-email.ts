import { Resend } from 'resend';
import { PayOrderTemplate } from '../components/shared/email-templates/pay-order';

export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: 'admin@riksi.com.ua',
        // from: 'onboarding@resend.dev',
        to,
        subject,
        text: '',
        react: template,
    });

    if (error) {
        throw error;
    }

    return data;
}