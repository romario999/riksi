import { prisma } from "@/prisma/prisma-client";

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const pages = await prisma.footerPage.findMany();
        return new Response(JSON.stringify(pages), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Не вдалося отримати дані' }), { status: 500 });
    }
}
