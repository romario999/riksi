'use client';

import React from 'react';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { useCart } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';

const getPluralForm = (count: number) => {
  if (count === 1) return 'товар';
  if (count >= 2 && count <= 4) return 'товари';
  return 'товарів';
};

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
    const [redirecting, setRedirecting] = React.useState(false);
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const handleSheetClose = () => {
        setIsSheetOpen(false);
    };

    const itemCount = items.length;
    const itemWord = getPluralForm(itemCount);

    return (
        <div className='z-[900]'>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild onClick={() => setIsSheetOpen(true)}>{children}</SheetTrigger>
                <SheetContent className='flex flex-col justify-between pb-0 bg-[#fff]'>
                    <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                        {totalAmount > 0 && (
                            <SheetHeader>
                                <SheetTitle>
                                    У кошику <span className='font-bold'>{itemCount}</span> {itemWord}
                                </SheetTitle>
                            </SheetHeader>
                        )}

                        {!totalAmount && (
                            <div className="flex flex-col items-center justify-center w-full  mx-auto">
                                <Image 
                                    src="/assets/images/empty-box.png" 
                                    alt="Пустий кошик"  
                                    width={120}
                                    height={120}
                                />
                                <Title size="sm" text="Кошик пустий" className='text-center font-bold my-2' />
                                <p className="text-center text-neutral-500 mb-5">
                                    Додайте хоча б один товар щоби здійснити замовлення
                                </p>
                            </div>
                        )}

                        {totalAmount > 0 && (
                            <>
                                <div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
                                    {items.map((item) => (
                                        <div key={item.id} className="mb-2">
                                            <CartDrawerItem 
                                                id={item.id}
                                                imageUrl={item.imageUrl}
                                                details={`Розмір: ${item.size}`}
                                                disabled={item.disabled}
                                                name={item.name}
                                                price={item.price}
                                                quantity={item.quantity}
                                                onClickCountButton={(type) => onClickCountButton(
                                                    item.id,
                                                    item.quantity,
                                                    type,
                                                )}
                                                onClickRemove={() => removeCartItem(item.id)}
                                                onLinkClick={handleSheetClose}
                                                productUrl={item.productUrl || ''}
                                            />
                                            <hr className='my-3' />
                                        </div>
                                    ))}
                                </div>

                                <SheetFooter className='-mx-6 bg-white p-8'>
                                    <div className="w-full">
                                        <div className="flex mb-4">
                                            <span className="flex flex-1 text-lg text-neutral-500">
                                                Всього
                                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                            </span>
                                            <span className='font-bold text-lg'>{totalAmount}₴</span>
                                        </div>
                                        <Link href="/checkout">
                                            <Button
                                                onClick={() => {
                                                    setRedirecting(true);
                                                    handleSheetClose();
                                                }}
                                                loading={redirecting}
                                                type="submit"
                                                className='w-full h-12 text-base'>
                                                Оформити замовлення
                                                <ArrowRight className='w-5 ml-2' />
                                            </Button>
                                        </Link>
                                    </div>
                                </SheetFooter>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
