import { prisma } from "@/prisma/prisma-client";
import { AdminPromoCodeList } from "@/shared/components/shared/admin/discounts/admin-promocode-list";

export default async function AdminDiscountsPromocodesPage() {
    const promocodes = await prisma.promoCode.findMany();

    return (
        <div>
            <AdminPromoCodeList promocodes={promocodes} />
        </div>
    );
}