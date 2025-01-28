import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/shared/components";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    return {
        title: 'Профіль користувача | RIKSI',
        description: 'Особистий кабінет користувача'
    }
}

export default async function ProfilePage() {

    const session = await getUserSession();

    if(!session) {
        return redirect('/not-auth');
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.id)
        }
    });

    if(!user) {
        return redirect('/not-auth');
    }

    return <ProfileForm data={user} />
}