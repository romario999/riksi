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
      <div>
        <div className="hidden md:block">
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

        <div className="block md:hidden">
          <div className="relative">
            <ShoppingCart size={28} className="text-black duration-200 ease-in-out" strokeWidth={2} />
            <span className="absolute -top-2.5 -right-3.5 bg-gray-900 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
        </div>
      </div>
    </CartDrawer>
  );
};
