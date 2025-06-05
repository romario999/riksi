'use client'

import { BarChart, Bar, Tooltip } from 'recharts';
import React from 'react';
import { Title } from '../../title';

const orders = [
  { date: '2025-03-07', count: 5 },
  { date: '2025-03-08', count: 15 },
  { date: '2025-03-09', count: 13 },
  { date: '2025-03-10', count: 6 },
  { date: '2025-03-11', count: 9 },
  { date: '2025-03-12', count: 21 },
  { date: '2025-03-13', count: 19 }
]

export const OrderChart = ({ data }: { data: { date: string; count: number }[] }) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
    <Title text='Останні замовлення (7 днів)' size="sm" className="mb-4" />
      <BarChart width={350} height={160} data={orders}>
      <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { date, count } = payload[0].payload;
                const validDate = new Date(date).toLocaleDateString();
                return (
                  <div className="bg-white p-4 rounded-lg text-sm">
                    <p><strong>Дата:</strong> {validDate}</p>
                    <p><strong>Кількість замовлень:</strong> {count}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </>
  );
};