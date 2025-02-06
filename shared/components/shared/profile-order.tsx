import React from 'react'
import { Container } from './container'
import { Title } from './title'
import { useOrders } from '@/shared/hooks'
import { FaSpinner } from 'react-icons/fa'
import Link from 'next/link'

const ProfileOrder = () => {
  const { orders, loading } = useOrders();

  return (
    <Container className="flex flex-col items-center my-10 bg-white rounded-lg p-5">
      <Title text="Історія замовлень" size="md" className="font-bold text-gray-800" />
      <div className="flex flex-col gap-5 w-full sm:w-[450px] mt-5">
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin my-2" />
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => {
            let items = [];
            if (typeof order.items === 'string') {
              try {
                items = JSON.parse(order.items);
              } catch (e) {
                console.error('Error parsing items JSON:', e);
              }
            }

            return (
              <Link href={`profile/order/${order.id}`} key={order.id}>
                <div className="flex flex-col w-full bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-semibold text-gray-700">№{order.id}</span>
                    <span className="text-sm text-gray-500">Дата: {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Статус:</span>
                    <span className={`font-semibold ${order.status == 'SUCCEEDED' && 'text-green-500'} ${order.status == 'PENDING' && 'text-yellow-500'} ${order.status == 'CANCELLED' && 'text-red-500'}`}>
                      {order.status == 'PENDING' && 'Очікує оплату'}
                      {order.status == 'SUCCEEDED' && 'Успішно оплачено'}
                      {order.status == 'CANCELLED' && 'Скасовано'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Сума:</span>
                    <span className="font-semibold text-gray-900">₴{order.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Товари:</span>
                      <span className="font-semibold max-w-[250px] text-gray-900 break-words">
                          {items.length > 0 ? (
                          items.map((item: any) => (
                              <span className='flex flex-wrap' key={item.id}>
                              {item.productItem.product.name} ({item.quantity} шт.)
                              </span>  
                          ))
                          ) : (
                          <span>Товари не доступні</span>
                          )}
                      </span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <span>У вас немає замовлень</span>
        )}
      </div>
    </Container>
  )
}

export default ProfileOrder
