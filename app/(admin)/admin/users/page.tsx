import { UsersProductList } from "@/shared/components/shared/admin/users/users-product-list";
import { getUsers } from "@/shared/lib/get-users";

export default async function AdminProductsPage({ searchParams }: { searchParams: Record<string, string> }) {
    const {users, total, totalPages, currentPage} = await getUsers({
        searchParams,
        itemsPerPage: 20,
    });

    const properties = [
      "ID",
      "Email",
      "Створено",
      "Повне імʼя",
      "К-сть обраних товарів",
      "К-сть замовлень",
      "",
    ];

    return (
        <>
          <UsersProductList initialUsers={users} initialTotal={total} totalPages={totalPages} currentPage={currentPage} properties={properties} />
        </>
    )
}