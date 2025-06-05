import { prisma } from "@/prisma/prisma-client";
import { AdminSubcategoriesList } from "@/shared/components/shared/admin/website-edit/subcategories/admin-subcategories-list";

export default async function AdminWebsiteSubcategoriesEditPage() {

    const subcategories = await prisma.subcategory.findMany({
        include: {
            category: {
                select: {
                    name: true
                }
            }
        }
    });

    const properties = [ "ID", "Назва", "Посилання", "Категорія", ""];

    return (
        <div className="">
            <AdminSubcategoriesList subcategories={subcategories} properties={properties} />
        </div>
    );
}