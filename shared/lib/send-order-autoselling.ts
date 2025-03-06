import axios from "axios";

interface Product {
    price: number;
    title: string;
    article: string;
    quantity: number;
}
  
interface PaymentType {
    id: number;
    title: string;
}
  
interface GeoObject {
    id: string | undefined | null;
    name: string | undefined | null;
}
  
interface Warehouse {
    id: string | undefined | null;
    name: string | undefined | null;
}
  
interface Address {
    geoObject: GeoObject;
    warehouse: Warehouse;
}
  
interface Destination {
    address: Address;
}
  
interface DeliveryData {
    destination: Destination;
}
  
interface DeliveryType {
    id: number;
    title: string;
}

interface Recipient {
    name: string | undefined | null;
    phone: string | undefined | null;
    surname: string | undefined | null;
    patronymic: string | undefined | null;
}
  
interface Order {
    comment: string | undefined | null;
    order_id: number;
    products: Product[];
    total_sum: number;
    payment_type: PaymentType;
    stat_created: string;
    delivery_city: string | undefined | null;
    delivery_data: DeliveryData;
    delivery_name: string | undefined | null;
    delivery_type: DeliveryType;
    delivery_phone: string | undefined | null;
    delivery_address: string;
    recipient: Recipient;
}
  

export const sendOrderAutoselling = async (obj: Order) => {
    try {
        console.log(obj);
        // await axios.post(
        //     `${process.env.AUTOSELLING_POST_URL}`
        // , obj);
    } catch (err) {
        console.error(err);
    }
}