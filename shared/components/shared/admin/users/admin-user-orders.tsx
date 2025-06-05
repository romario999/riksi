export const AdminUserOrders = ({ orders }: { orders: any}) => {
    if (!orders || orders.length === 0) {
        return <div>Немає замовлень</div>;
    }
    console.log(orders);
    return (
        <div>
            <h3 className="block text-sm font-medium text-gray-700">Замовлення</h3>
            <div className="flex gap-4 mt-3">
                {orders.map((item: any) => (
                    <div key={item.id} className="border p-4 rounded-lg">
                        <h4 className="text-lg font-semibold">Замовлення #{item.id}</h4>
                        <p>Дата: {new Date(item.createdAt).toLocaleDateString()}</p>
                        <p>Сума: {item.totalAmount} грн</p>
                    </div>
            ))}
            </div>
        </div>
    )
}