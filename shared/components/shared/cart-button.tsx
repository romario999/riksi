'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const loading = useCartStore((state) => state.loading);
  const items = useCartStore((state) => state.items);

  return (
    <CartDrawer>
      {/* Обгортаємо всі елементи в один div */}
      <div>
        {/* Кнопка на великих екранах */}
        <div className="hidden sm:block">
          <Button
            loading={loading}
            className={cn('group relative', { 'w-[105px]': loading }, className)}
          >
            <b>{totalAmount}₴</b>
            <span className="h-full w-[1px] bg-white/30 mx-3" />
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
              <b>{items.length}</b>
            </div>
            <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
          </Button>
        </div>

        {/* Іконка кошика на маленьких екранах */}
        <div className="block sm:hidden">
  <div className="bg-transparent relative">
    <ShoppingCart size={28} className="text-black" strokeWidth={2} />
    <div className="absolute top-[-5px] right-[-5px] bg-black text-white text-[9px] font-bold rounded-full w-3 h-3 flex items-center justify-center">
      {items.length} {/* тут має бути змінна, яка містить кількість елементів у кошику */}
    </div>
  </div>
</div>

      </div>
    </CartDrawer>
  );
};
