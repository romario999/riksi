import { prisma } from "@/prisma/prisma-client";
import { EditSubcategory } from "@/shared/components/shared/admin/website-edit/subcategories/edit-subcategory";

export default async function EditSubcategoryPage({ params }: { params: { subcategoryId: string } }) {

    const subcategory = await prisma.subcategory.findUnique({
        where: { id: Number(params.subcategoryId) },
        include: {
            category: true
        }
    });

    const categories = await prisma.category.findMany();

    if (!subcategory) {
        return <div>Підкатегорія не знайдена</div>
    }

    return (
        <div className="">
            <EditSubcategory subcategory={subcategory} allCategories={categories} />
        </div>
    );
}