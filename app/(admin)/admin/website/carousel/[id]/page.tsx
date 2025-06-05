import { prisma } from "@/prisma/prisma-client";
import { AdminCarouselEdit } from "@/shared/components/shared/admin/website-edit/carousel/admin-carousel-edit";

export default async function AdminWebsiteCarouselEditPage({ params }: { params: { id: string } }) {
    const carousel = await prisma.sliderImage.findUnique({
        where: { id: Number(params.id) }
    })
    
    if (!carousel) {
        return <div>Товар не знайдено</div>
    }
    return (
        <div>
            <AdminCarouselEdit carouselItem={carousel} type="slider" />
        </div>
    );
}