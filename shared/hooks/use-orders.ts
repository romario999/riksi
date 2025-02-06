import { Api } from "@/shared/services/api-client";
import { Order } from "@prisma/client";
import React from "react";

export const useOrders = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        async function fetchOrders() {
            try {
                setLoading(true);
                const categories = await Api.orders.getAll();
                setOrders(categories);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
    };
};
