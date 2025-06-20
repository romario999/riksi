import AuthAdmin from "@/shared/components/shared/admin/auth-admin";
import { getUserSession } from "@/shared/lib/get-user-session";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "RIKSI Чек",
  };

export default async function ReceiptLayout({ children }: { children: React.ReactNode }) {
    const session = await getUserSession();

    if (!session || session?.role !== 'ADMIN') {
        return <AuthAdmin />
    }
    return (
        <div>
            {children}
        </div>
    );
}