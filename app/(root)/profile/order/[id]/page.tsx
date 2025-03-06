import notFound from "@/app/not-found";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";
import Image from 'next/image';

interface OrderItems {
    id: number,
    name: string,
    quantity: number,
    productItemId: number,
    imageUrl: string,
    price: number,
    sku: string,
    productUrl: string,
    size: string,
}

export default async function OrderPage({ params }: { params: { id: string } }) {
    const session = await getUserSession();
    const orderId = Number(params.id);

    if (isNaN(orderId)) {
        return <p className="text-center text-red-500 text-lg font-semibold">Невірний формат ID</p>;
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId, userId: Number(session?.id) }
    });

    if (!order) {
        return notFound();
    }

    let items = [];
    if (typeof order.items === 'string') {
        try {
            items = JSON.parse(order.items);
        } catch (e) {
            console.error('Error parsing items JSON:', e);
        }
    }
    console.log(items);
    // Функція для відображення статусу замовлення
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Нове';
            case 'SUCCEEDED':
                return 'Успішно оплачено';
            case 'CANCELLED':
                return 'Скасовано';
            default:
                return 'Невідомий статус';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 sm:my-10 my-0 bg-white sm:shadow-xl shadow-none rounded-2xl sm:border-sm sm:border-gray-200 border-none">
            <h2 className="sm:text-2xl text-xl font-bold mb-6 text-gray-900 text-center">Замовлення #{order.id}</h2>
            <div className="overflow-hidden rounded-lg border border-gray-300">
                <table className="w-full text-left">
                    <tbody>
                        {[
                            { label: "Статус", value: getStatusLabel(order.status) },
                            { label: "Сума", value: `${order.totalAmount} грн` },
                            { label: "Дата", value: new Date(order.createdAt).toLocaleDateString('uk-UA') + ' | ' + new Date(order.createdAt).toLocaleTimeString('uk-UA') },
                            { label: "Отримувач", value: `${order.recipientFullName} (${order.recipientPhone})` },
                            { label: "Email", value: order.email },
                            { label: "Доставка", value: order.address },
                        ].map((row, index, arr) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className={`p-4 font-semibold text-gray-700 ${index !== arr.length - 1 ? 'border-b border-gray-300' : ''} text-sm sm:text-base`}>{row.label}</td>
                                <td className={`p-4 text-gray-900 ${index !== arr.length - 1 ? 'border-b border-gray-300' : ''} text-sm sm:text-base`}>{row.value}</td>
                            </tr>
                        ))}
                        {order.comment && (
                            <tr className="bg-gray-50">
                                <td className="p-4 font-semibold text-gray-700 text-sm sm:text-base">Коментар</td>
                                <td className="p-4 text-gray-900 text-sm sm:text-base">{order.comment}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <h3 className="sm:text-2xl text-xl font-bold mt-8 mb-4 text-gray-900 text-center">Товари у замовленні</h3>
            <div className="overflow-hidden rounded-lg border border-gray-300">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-4 font-semibold text-gray-700 border-b border-gray-300 text-sm sm:text-base">Назва</th>
                            <th className="p-4 text-center font-semibold text-gray-700 border-b border-gray-300 text-sm sm:text-base">Кількість</th>
                            <th className="p-4 text-center font-semibold text-gray-700 border-b border-gray-300 text-sm sm:text-base">Ціна</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item: OrderItems, index: number, arr: OrderItems[]) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className={`p-4 ${index !== arr.length - 1 ? 'border-b border-gray-300' : ''} text-sm sm:text-base`}>
                                        <div className="flex items-center mt-2">
                                            <Image src={item.imageUrl} alt={item.name} width={64} height={96} className="w-16 h-24 object-cover mr-4 rounded-sm" />
                                            <div className="sm:ml-2 ml-0 text-xs sm:text-sm">
                                                <div className="font-semibold">{item.name}</div>
                                                <div><span className="font-semibold">Артикул:</span> {item.sku}</div>
                                                <div><span className="font-semibold">Розмір:</span> {item.size}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`p-4 text-center ${index !== arr.length - 1 ? 'border-b border-gray-300' : ''} text-sm sm:text-base`}>{item.quantity}</td>
                                    <td className={`p-4 text-center ${index !== arr.length - 1 ? 'border-b border-gray-300' : ''} text-sm sm:text-base`}>{item.price} грн</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-4 text-center text-sm sm:text-base" colSpan={3}>Товари не доступні</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
