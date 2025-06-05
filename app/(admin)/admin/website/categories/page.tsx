import { prisma } from "@/prisma/prisma-client";
import { AdminCategoriesList } from "@/shared/components/shared/admin/website-edit/categories/admin-categories-list";

export default async function AdminWebsiteCategoriesEditPage() {
  const categories = await prisma.category.findMany({
    include: {
      subcategories: true,
    },
    orderBy: { id: "asc" },
  });

  const properties = [ "ID", "Назва", "Посилання", "К-сть субкатегорій", ""];

  return (
    <div>
        <AdminCategoriesList categories={categories} properties={properties} />
    </div>
  );
}
