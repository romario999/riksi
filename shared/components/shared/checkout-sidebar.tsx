"use client";

import React, { useState } from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Truck, X } from "lucide-react";
import { Button, Input, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import clsx from "clsx";
import { applyPromoCode } from "@/app/actions";

interface Props {
    className?: string;
    loading?: boolean;
    submitting?: boolean;
    totalAmount?: number;
    cartCategoryIds: string[];
    onDiscountChange: (discount: number) => void;
}

export const CheckoutSidebar: React.FC<Props> = ({ className, loading, totalAmount = 0, cartCategoryIds, onDiscountChange }) => {
    const [openPromo, setOpenPromo] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleApplyPromo = async () => {
        const result = await applyPromoCode({ code: promoCode, totalAmount, cartCategoryIds });

        if (result.error) {
            setError(result.error);
        } else {
            setDiscount(Number(result.discount));
            setError(null);
            onDiscountChange(Number(result.discount)); // Оновлюємо знижку у `CheckoutPage`
        }
    };

    const handleResetPromo = () => {
        setPromoCode("");
        setDiscount(0);
        setError(null);
        onDiscountChange(0); // Якщо промокод скидається, скидати і знижку
    };

    return (
        <WhiteBlock className={cn("p-6 sticky top-28", className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Всього:</span>
                {loading ? <Skeleton className="w-48 h-11 bg-gray-200" /> : <span className="h-11 text-[34px] font-extrabold">{totalAmount - discount}₴</span>}
            </div>

            <CheckoutItemDetails 
                title={<div className="flex items-center"><Package size={18} className="mr-2 text-gray-400" />Вартість товарів:</div>} 
                value={loading ? <Skeleton className="w-16 h-6 rounded-[6px] bg-gray-200" /> : `${totalAmount}₴`} 
            />

            <CheckoutItemDetails 
                title={<div className="flex items-center"><Truck size={18} className="mr-2 text-gray-400" />Доставка:</div>} 
                value={loading ? <Skeleton className="w-16 h-6 rounded-[6px] bg-gray-200" /> : totalAmount >= 4000 ? "Безкоштовно" : (<span className="md:text-[15px] text-[13px]">за тарифами перевізника</span>)} 
            />

            <div>
                <Button type="button" variant="link" className="text-sm text-neutral-500" onClick={() => setOpenPromo(!openPromo)}>
                    Маєте промокод?
                </Button>

                <div className={clsx("overflow-hidden transition-all duration-300 pb-2 px-1", openPromo ? "max-h-40 opacity-100" : "max-h-0 opacity-0 pointer-events-none")}> 
                    <div className="mt-1 flex flex-col sm:flex-row gap-3">
                        <Input type="text" className="w-[200px]" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                        <Button type="button" variant="outline" className="h-9" onClick={handleApplyPromo}>
                            Застосувати
                        </Button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {discount > 0 && <p className="text-green-500 text-sm mt-2">Знижка: -{discount}₴</p>}
                </div>
            </div>

            {discount > 0 && (
                <div className="flex items-center gap-2 p-2 mt-2 bg-green-100 text-green-700 text-sm w-max rounded">
                    <span>Промокод застосовано: {promoCode}</span>
                    <button onClick={handleResetPromo} className="text-green-700 hover:text-red-500">
                        <X size={16} />
                    </button>
                </div>
            )}

            <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти до оплати
                <ArrowRight className="w-5 ml-2" />
            </Button>

            <div className="ml-1 text-[13px] text-gray-400 mt-4">
                Підтверджуючи замовлення, я приймаю умови <Link href="/privacypolicy">угоди користувача</Link>
            </div>
        </WhiteBlock>
    );
};
