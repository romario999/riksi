import { EditSidebar } from "@/shared/components/shared/admin/website-edit/edit-sidebar";

export default async function AdminWebsiteEditLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="flex">
                <EditSidebar />
                <div className="ml-36 pl-20 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}