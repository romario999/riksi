import { prisma } from "@/prisma/prisma-client";
import { AdminProductAdd } from "@/shared/components/shared/admin/product/admin-product-add";

export default async function AddProductPage() {
    const allCategories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            subcategories: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    return (
        <div>
            <AdminProductAdd allCategories={allCategories} />
        </div>
    )
}