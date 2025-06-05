import { prisma } from "@/prisma/prisma-client";

export const revalidate = 60;

export async function GET() {
    try {
        const pages = await prisma.footerPage.findMany({
            where: {
                isActive: true
            }
        });
        return new Response(JSON.stringify(pages), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Не вдалося отримати дані' }), { status: 500 });
    }
}
