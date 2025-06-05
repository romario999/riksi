'use client'

import { useState } from "react";
import { AdminDiscountName } from "./admin-discount-name";
import { AdminDiscountPercent } from "./admin-discount-percent";
import { AdminDiscountAppliesToAll } from "./admin-disount-applies-to-all";
import { AdminDiscountIsActive } from "./admin-discount-is-active";
import { AdminDiscountCategoryIds } from "./admin-discount-category-ids";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { AdminDiscountExpiresAt } from "./admin-discount-expires-at";
import { AdminDiscountCreate } from "@/app/actions";

export const AdminDiscountAdd = () => {

    const [promocodeName, setPromocodeName] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [expiresAt, setExpiresAt] = useState<Date | null>(null);
    const [appliesToAll, setAppliesToAll] = useState(false);
    const [categoryIds, setCategoryIds] = useState<string[]>([]);

    const handleDiscountAdd = async () => {
        try {

            if (promocodeName.length < 1 || discountPercent == 0 || discountPercent == null) {
                toast.error('Заповніть всі поля');
                return;
            }

            const editedPromocode = {
                code: promocodeName,
                active: isActive,
                discountPercent: discountPercent,
                expiresAt: expiresAt,
                appliesToAll: appliesToAll,
                categoryIds: appliesToAll ? [] : categoryIds
            }

           await AdminDiscountCreate(editedPromocode);

            toast.success('Промокод збережено');
        } catch (error) {
            console.error('Error saving discount:', error);
            toast.error('Помилка при збереженні промокоду');
            throw error;
        }
    }

    return (
        <div>
            <div className="flex justify-end"><Button onClick={handleDiscountAdd}>Додати</Button></div>

            <AdminDiscountName promocodeName={promocodeName} setPromocodeName={setPromocodeName} />

            <AdminDiscountPercent discountPercent={discountPercent} setDiscountPercent={setDiscountPercent} />

            <AdminDiscountExpiresAt expiresAt={expiresAt} setExpiresAt={setExpiresAt} />

            <AdminDiscountAppliesToAll appliesToAll={appliesToAll} setAppliesToAll={setAppliesToAll} />

            {!appliesToAll && <AdminDiscountCategoryIds categoryIds={categoryIds} setCategoryIds={setCategoryIds} />}

            <AdminDiscountIsActive isActive={isActive} setIsActive={setIsActive} />
        </div>
    )
}