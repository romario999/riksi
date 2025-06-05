import { AdminProductsList } from "@/shared/components/shared/admin/product/admin-products-list";
import { getProducts } from "@/shared/lib/get-products";

export default async function AdminProductsPage({ searchParams }: { searchParams: Record<string, string> }) {
    const {products, total, totalPages, currentPage} = await getProducts({
        searchParams,
        itemsPerPage: 10,
    });
    return (
        <>
            <AdminProductsList initialProducts={products} initialTotal={total} totalPages={totalPages} currentPage={currentPage} />
        </>
    )
}