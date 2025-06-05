import { prisma } from "@/prisma/prisma-client"
import { AdminProductEdit } from "@/shared/components/shared/admin/product/admin-product-edit"

export default async function AdminProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            items: true,
            complects: {
                select: {
                    id: true,
                    products: true
                }
            },
            categories: true,
            subcategories: true
        },
    });

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

    // Виведення помилки, якщо товар не знайдений
    if (!product) {
        return <div>Товар не знайдено</div>
    }

    return (
        <div className="px-3 min-h-screen">
            <AdminProductEdit 
                product={product}
                productCategories={product.categories} 
                productSubcategories={product.subcategories}
                allCategories={allCategories}
                productComplects={product.complects}
            />
        </div>
    )
}
