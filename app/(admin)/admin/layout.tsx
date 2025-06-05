import AuthAdmin from "@/shared/components/shared/admin/auth-admin";
import Sidebar from "@/shared/components/ui/sidebar";
import { getUserSession } from "@/shared/lib/get-user-session";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "RIKSI - Admin",
  };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getUserSession();

    if (!session || session?.role !== 'ADMIN') {
        return <AuthAdmin />
    }
    return (
        <div>
            <div className="flex gap-6">
            <Sidebar />
                <div className="ml-16 p-5 w-full">
                    {children}
                </div>
            </div>
    </div>
    );
}