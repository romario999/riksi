import { prisma } from "@/prisma/prisma-client"
import { AdminUserView } from "@/shared/components/shared/admin/users/admin-user-view"

export default async function AdminUserPage({ params: { userId } }: { params: { userId: string } }) {

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(userId),
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            fullName: true,
            liked: { include: { items: true } },
            orders: true,
        },
    });

    const likedItems = await prisma.likedItem.findMany({
        where: {
            likedId: user?.liked?.id,
        },
        select: {
            product: true
        }
    });

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div>
            <AdminUserView user={user} likedItems={likedItems} />
        </div>
    )
}