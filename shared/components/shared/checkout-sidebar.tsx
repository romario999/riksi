import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';


interface Props {
    className?: string;
    loading?: boolean;
    submitting?: boolean;
    totalAmount: number;
}  

export const CheckoutSidebar: React.FC<Props> = ({ className, loading, totalAmount }) => {
    const totalPrice = totalAmount;
  return (
    <WhiteBlock className={cn('p-6 sticky top-28', className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Всього:</span>
                {
                    loading ? <Skeleton className='w-48 h-11 bg-gray-200' /> : <span className="h-11 text-[34px] font-extrabold">{totalPrice}₴</span>
                }
            </div>

        <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Package size={18} className="mr-2 text-gray-400" />
                    Вартість товарів:
                </div>
        } value={loading ? <Skeleton className='w-16 h-6 rounded-[6px] bg-gray-200' /> : `${totalAmount}₴` } />
        <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Truck size={18} className="mr-2 text-gray-400" />
                    Доставка:
                </div>
        } value={loading ? <Skeleton className='w-16 h-6 rounded-[6px] bg-gray-200' /> : totalAmount >= 4000 ? 'Безкоштовно' : (<span className='md:text-[15px] text-[13px]'>за тарифами перевізника</span>) } />
        
        

        <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти до оплати
                <ArrowRight className="w-5 ml-2" />
        </Button>
        <div className='ml-1 text-[13px] text-gray-400 mt-4'>Підтверджуючи замовлення, я приймаю умови <Link href='/privacypolicy'>угоди користувача</Link></div>
    </WhiteBlock>
  );
};