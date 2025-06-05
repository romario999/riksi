'use client';

import { useState, useRef } from 'react';

interface Props {
    order: {
        typeDelivery: string;
        deliveryCity: string;
        deliveryDepartment?: string;
    };
}

export const AdminOrdersDelivery: React.FC<Props> = ({ order }) => {
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

  return (
    <td className="py-3 px-6 text-sm text-gray-900">
      {order.typeDelivery}
      <br />
      <div className="relative inline-block">
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="text-sm text-gray-400 border-dashed border-b border-gray-400 cursor-pointer"
        >
          {order.deliveryCity}
        </span>

        {order.deliveryDepartment && showTooltip && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute z-10 left-0 mt-2 w-64 bg-gray-100 text-black text-sm rounded-md px-2 py-1 shadow-md transition-opacity duration-200"
          >
            {order.deliveryCity}, {order.deliveryDepartment}
          </div>
        )}
      </div>
    </td>
  );
};
