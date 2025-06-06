import { Order } from "@prisma/client"
import { AdminOrdersDelivery } from "../orders/admin-orders-delivery"
import { AdminOrdersItems } from "../orders/admin-orders-items"

export const Last10Orders = ({ last10Orders }: { last10Orders: Order[] }) => {
    return (
        <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
                <tr>
                <th
                    className="py-3 px-6 text-left text-sm font-medium text-gray-900 cursor-pointer"
                >
                    ID
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Повне імʼя</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Сума</th>
                <th
                    className="py-3 px-6 text-left text-sm font-medium text-gray-900 cursor-pointer"
                >
                    Дата
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Доставка</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Оплата</th>
                </tr>
            </thead>
            <tbody>
                {last10Orders.length > 0 ? (
                last10Orders.map((order) => (
                    <tr key={order.id} className="bg-white border-b">
                    <td className="py-3 px-6 text-sm text-gray-900">{order.id}</td>
                    <td className="py-3 px-6 text-sm text-gray-900">{order.fullName}
                        {order.fullName !== order.recipientFullName && (
                  <td>
                    <span className="text-gray-500">Отримувач: {order.recipientFullName}</span>
                    <br />
                    <span className="text-gray-500">Телефон: {order.recipientPhone}</span>
                  </td>
                )}
                    </td>
                    <AdminOrdersItems order={order} totalAmount={order.totalAmount} />
                    <td className="py-3 px-6 text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString("uk-UA")} <br />
                        {new Date(order.createdAt).toLocaleTimeString("uk-UA")}
                    </td>
                    <AdminOrdersDelivery order={order} />
                    <td className="py-3 px-6 text-sm text-gray-900">{order.paymentType}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                    Замовлень не знайдено.
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    )
}