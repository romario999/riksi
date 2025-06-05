import { prisma } from "@/prisma/prisma-client";
import { AdminDiscountEdit } from "@/shared/components/shared/admin/discounts/admin-discount-edit";

export default async function AdminDiscountEditPage({ params: { id } }: { params: { id: string } }) {

    const discount = await prisma.promoCode.findUnique({
        where: { id: Number(id) }
    });

    if (!discount) {
        return <div>Промокод не знайдено</div>
    }

    return (
        <div>
            <AdminDiscountEdit promocode={discount} />
        </div>
    );
}