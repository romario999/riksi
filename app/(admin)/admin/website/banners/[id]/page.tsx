import { prisma } from "@/prisma/prisma-client";
import { AdminCarouselEdit } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-edit";

export default async function AdminWebsiteBannerEditPage({ params }: { params: { id: string } }) {
    const banner = await prisma.bannerImage.findUnique({
        where: { id: Number(params.id) }
    })
    
    if (!banner) {
        return <div>Товар не знайдено</div>
    }
    return (
        <div>
            <AdminCarouselEdit carouselItem={banner} type="banner" />
        </div>
    );
}