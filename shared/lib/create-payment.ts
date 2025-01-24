import { CheckoutFormValues } from "../constants";
import { generateSignature } from "./generate-signature";
import axios from "axios";

export const createPayment = async (data: CheckoutFormValues, items: any[], totalAmount: number) => {
    const productNames = items.map(item => item.name);
    const productCounts = items.map(item => item.quantity.toString());
    const productPrices = items.map(item => item.price.toString());

    const inputs = {
        merchantAccount: process.env.NEXT_PUBLIC_WAYFORPAY_MERCHANT_ACCOUNT ?? '',
        merchantDomainName: "https://localhost:3000",
        orderReference: `ORDER-${Date.now()}`,
        orderDate: Math.floor(Date.now() / 1000).toString(),
        amount: totalAmount.toString(),
        currency: "UAH",
        productNames,
        productCounts,
        productPrices,
        clientFirstName: data.firstName,
        clientLastName: data.lastName,
        clientAddress: `${data.street}, ${data.numberStreet}`,
        clientEmail: data.email,
        defaultPaymentSystem: "card"
    };

    const generatedSignature = generateSignature(inputs);

    const paymentData = {
        merchantAccount: inputs.merchantAccount,
        merchantDomainName: inputs.merchantDomainName,
        merchantSignature: generatedSignature,
        orderReference: inputs.orderReference,
        orderDate: inputs.orderDate,
        amount: inputs.amount,
        currency: inputs.currency,
        orderTimeout: "49000",
        productName: inputs.productNames,
        productPrice: inputs.productPrices,
        productCount: inputs.productCounts,
        clientFirstName: inputs.clientFirstName,
        clientLastName: inputs.clientLastName,
        clientAddress: inputs.clientAddress,
        clientEmail: inputs.clientEmail,
        defaultPaymentSystem: inputs.defaultPaymentSystem,
        language: 'AUTO',
    };

    try {
        const response = await axios.post('/api/payment', paymentData);
        return { paymentUrl: response.data.url, orderReference: paymentData.orderReference };
    } catch (error) {
        console.error('Error during payment request:', error);
    }
}