'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Order } from '@prisma/client';
import { pluralizeUa } from '@/shared/lib/pluralize-ua';

interface Props {
    order: Order;
    totalAmount: number;
}

export const AdminOrdersItems: React.FC<Props> = ({ order, totalAmount }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const timeoutRef = useRef<number | null>(null);
  
    const handleMouseEnter = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      setShowTooltip(true);
    };
  
    const handleMouseLeave = () => {
      timeoutRef.current = window.setTimeout(() => {
        setShowTooltip(false);
      }, 100); // затримка перед закриттям
    };

  const items =
    typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
  const count = Array.isArray(items) ? items.length : 0;

  return (
    <td className="py-3 px-6 text-sm text-gray-900">
      {order.totalAmount}₴
      <br />
      <div className="relative inline-block">
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="text-gray-400 border-dashed border-b border-gray-400 cursor-pointer"
        >
          {count} {pluralizeUa(count, 'товар', 'товари', 'товарів')}
        </span>

        {Array.isArray(items) && items.length > 0 && showTooltip && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute z-30 left-0 mt-2 w-80 bg-gray-100 text-black text-sm rounded-md px-3 py-3 shadow-md transition-opacity duration-200"
          >
            <div className="grid grid-cols-4 gap-2 text-xs">
              {items.map((item: any) => (
                <React.Fragment key={item.id}>
                  <span className="col-span-2 text-blue-500">
                    <Link href={item.productUrl}>{item.name}</Link>
                  </span>
                  <span className="col-span-1 text-center">{item.quantity}</span>
                  <span className="col-span-1 text-right">{item.price}₴</span>
                </React.Fragment>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-1 mt-2 text-right font-semibold">
              Всього: {totalAmount}₴
            </div>
          </div>
        )}
      </div>
    </td>
  );
};
