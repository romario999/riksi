'use client'

import { PromoCode } from "@prisma/client"
import { useState } from "react";
import { AdminDiscountName } from "./admin-discount-name";
import { AdminDiscountPercent } from "./admin-discount-percent";
import { AdminDiscountAppliesToAll } from "./admin-disount-applies-to-all";
import { AdminDiscountIsActive } from "./admin-discount-is-active";
import { AdminDiscountCategoryIds } from "./admin-discount-category-ids";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { AdminDiscountSave } from "@/app/actions";
import { AdminDiscountExpiresAt } from "./admin-discount-expires-at";

interface Props {
    promocode: PromoCode;
}

export const AdminDiscountEdit: React.FC<Props> = ({promocode}) => {

    const [promocodeName, setPromocodeName] = useState(promocode.code);
    const [isActive, setIsActive] = useState(promocode.active);
    const [discountPercent, setDiscountPercent] = useState(promocode.discountPercent);
    const [expiresAt, setExpiresAt] = useState(promocode.expiresAt);
    const [appliesToAll, setAppliesToAll] = useState(promocode.appliesToAll);
    const [categoryIds, setCategoryIds] = useState(promocode.categoryIds);

    const handleDiscountSave = async () => {
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

            await AdminDiscountSave(promocode.id, editedPromocode);

            toast.success('Промокод збережено');
        } catch (error) {
            console.error('Error saving discount:', error);
            toast.error('Помилка при збереженні промокоду');
            throw error;
        }
    }

    return (
        <div>
            <div className="flex justify-end"><Button onClick={handleDiscountSave}>Зберегти</Button></div>

            <AdminDiscountName promocodeName={promocodeName} setPromocodeName={setPromocodeName} />

            <AdminDiscountPercent discountPercent={discountPercent} setDiscountPercent={setDiscountPercent} />

            <AdminDiscountExpiresAt expiresAt={expiresAt} setExpiresAt={setExpiresAt} />

            <AdminDiscountAppliesToAll appliesToAll={appliesToAll} setAppliesToAll={setAppliesToAll} />

            {!appliesToAll && <AdminDiscountCategoryIds categoryIds={categoryIds} setCategoryIds={setCategoryIds} />}

            <AdminDiscountIsActive isActive={isActive} setIsActive={setIsActive} />
        </div>
    )
}