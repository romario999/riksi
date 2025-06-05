import { prisma } from "@/prisma/prisma-client";
import { EditCategory } from "@/shared/components/shared/admin/website-edit/categories/edit-category";

export default async function EditCategoryPage({ params }: { params: { categoryId: string } }) {

    const category = await prisma.category.findUnique({
        where: { id: Number(params.categoryId) },
        include: {
            subcategories: true
        }
    });

    if (!category) {
        return <div>Категорія не знайдена</div>
    }

    return (
        <div className="">
            <EditCategory category={category} />
        </div>
    );
}