import { prisma } from "@/prisma/prisma-client";
import { AdminFooterPagesList } from "@/shared/components/shared/admin/website-edit/footer-pages/admin-footer-pages-list";

export default async function AdminFooterPagesPage() {
    const allFooterPages = await prisma.footerPage.findMany();
    
    return (
        <div className="">
            <AdminFooterPagesList footerPages={allFooterPages} />
        </div>
    );
}