import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
    const categories = await prisma.category.findMany({
        include: {
            subcategories: true
        }
    });
    return NextResponse.json(categories);
}