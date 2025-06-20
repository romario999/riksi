import { prisma } from "@/prisma/prisma-client";
import Image from "next/image";
import writtenNumber from "written-number";

writtenNumber.defaults.lang = "uk";

interface Item {
  id: string | number;
  imageUrl: string;
  name: string;
  productUrl: string;
  sku: string;
  quantity: number;
  price: number;
}


export default async function ReceiptPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: Number(params.id) }
  });

  if (!order) {
    return <div>Замовлення не знайдено</div>;
  }

  const items =
    typeof order.items === "string"
      ? JSON.parse(order.items)
      : [];

  // Розбиваємо суму на гривні і копійки
  const total = order.totalAmount || 0;
  const hryvnias = Math.floor(total);
  const kopecks = Math.round((total - hryvnias) * 100);

  // Конвертуємо гривні в слова
  const hryvniasWords = writtenNumber(hryvnias);
  // Перша буква велика
  const hryvniasWordsCapitalized = hryvniasWords.charAt(0).toUpperCase() + hryvniasWords.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-[14px] font-sans text-black bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        {/* Logo */}
        <div className="shrink-0 mt-5">
          <Image src="/riksi.webp" alt="RIKSI" width={150} height={45} className="mb-2" />
        </div>

        {/* Info Block (Recipient + Delivery + Payment) */}
        <div className="text-right flex flex-col gap-4">
          {/* Recipient */}
          <div>
            <h2 className="text-[16px] font-bold mb-1">Одержувач</h2>
            <div>{order.recipientFullName}</div>
            <div>{order.phone}</div>
            <div>{order.email}</div>
          </div>

          {/* Delivery */}
          <div>
            <h3 className="font-semibold mb-1">Доставка</h3>
            <div>{order.deliveryCity}</div>
            <div>{order.typeDelivery}</div>
            <div>{order.deliveryDepartment}</div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-1">Оплата</h3>
            <div>{order.paymentType}</div>
          </div>
        </div>
      </div>

      {/* Invoice Title */}
      <div className="my-6">
        <h1 className="text-2xl font-bold">Рахунок №{order.id}</h1>
        <div>від {new Date(order.createdAt).toLocaleDateString("uk-UA")}</div>
      </div>

      {/* Table Header */}
      <table className="w-full border-collapse border-t border-black text-left mb-6">
        <thead className="border-b border-black">
          <tr>
            <th className="py-2 px-2">№</th>
            <th className="py-2 px-2">Товар</th>
            <th className="py-2 px-2">К-ть</th>
            <th className="py-2 px-2">Од.</th>
            <th className="py-2 px-2">Ціна, грн</th>
            <th className="py-2 px-2">Сума, грн</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: Item, index: number) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 px-2 align-top">{index + 1}</td>
              <td className="py-2 px-2">
                <div className="flex items-center gap-3">
                  <div>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={60}
                      height={90}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <a href={item.productUrl} className="text-blue-700 underline block font-medium mb-1">
                      {item.name}
                    </a>
                    <div className="text-gray-700 text-sm">Артикул: {item.sku}</div>
                  </div>
                </div>
              </td>
              <td className="py-2 px-2 align-top">{item.quantity}</td>
              <td className="py-2 px-2 align-top">шт.</td>
              <td className="py-2 px-2 align-top">{item.price.toFixed(2)}</td>
              <td className="py-2 px-2 align-top">{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="text-right mb-6">
        <div>Всього: {order.totalAmount.toFixed(2)} грн</div>
        <div>Доставка: За тарифами перевізника</div>
        <div className="text-xl font-bold mt-2">Загальна сума: {order.totalAmount.toFixed(2)} грн</div>
      </div>

      {/* In Words */}
      <div className="font-medium mt-4">
        Загальна сума до сплати:<br />
        <span className="italic">
          {hryvniasWordsCapitalized} грн {kopecks < 10 ? "0" : ""}
          {kopecks} коп.
        </span>
      </div>

      {/* Footer */}
      <div className="mt-10">
        <span>Виписав ....................................</span>
      </div>
    </div>
  );
}
