import { prisma } from '@/prisma/prisma-client'; // Переконайтесь, що Prisma-клієнт імпортується правильно

export async function GET(req: Request) {
    const url = new URL(req.url);
    const isMobile = url.searchParams.get('isMobile') === 'true'; // Отримуємо параметр isMobile з URL

    try {
        const sliderItems = await prisma.bannerImage.findMany({
            where: {
                position: { not: null },
                isActive: true,
                isMobile: isMobile,
            },
            orderBy: {
                position: 'asc',
            },
        });

        return new Response(JSON.stringify(sliderItems), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Не вдалося отримати дані' }), { status: 500 });
    }
}
