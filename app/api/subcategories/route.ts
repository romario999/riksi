import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
    const subcategories = await prisma.subcategory.findMany({
        include: {
            category: true
        }
    });
    return NextResponse.json(subcategories);
}