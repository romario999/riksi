
import CryptoJS from 'crypto-js';

type inputsSignature = {
    merchantAccount: string; 
    merchantDomainName: string; 
    orderReference: string; 
    orderDate: string; 
    amount: string; 
    currency: string; 
    productNames: string[]; 
    productCounts: string[]; 
    productPrices: string[];
}

export const generateSignature = (inputs: inputsSignature) => {
    const {
        merchantAccount,
        merchantDomainName,
        orderReference,
        orderDate,
        amount,
        currency,
        productNames,
        productCounts,
        productPrices,
    } = inputs;

    const string = `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${amount};${currency};${productNames.join(';')};${productCounts.join(';')};${productPrices.join(';')}`;
    const key = process.env.NEXT_PUBLIC_WAYFORPAY_SECRET_KEY; // Replace with your actual secret key
    const generatedSignature = CryptoJS.HmacMD5(string, key!).toString(CryptoJS.enc.Hex);
    return generatedSignature;
};