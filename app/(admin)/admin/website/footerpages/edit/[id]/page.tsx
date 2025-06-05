import { prisma } from "@/prisma/prisma-client";
import { AdminFooterPageEdit } from "@/shared/components/shared/admin/website-edit/footer-pages/admin-footer-page-edit";

export default async function AdminFooterPagesEditPage({ params }: { params: { id: string } }) {
    const footerPage = await prisma.footerPage.findUnique({
        where: { id: Number(params.id) }
    });

    if (!footerPage) {
        return (
            <div className="">
                <span className="text-2xl font-bold mb-6">Сторінка не знайдена</span>
            </div>
        );
    }

    return (
        <div className="">
            <AdminFooterPageEdit footerPage={footerPage} />
        </div>
    );
}