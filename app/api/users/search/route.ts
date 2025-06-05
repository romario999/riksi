import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  const pageParam = req.nextUrl.searchParams.get("page") || "1";
  const page = parseInt(pageParam, 10) || 1;
  const itemsPerPage = 20;
  const skip = (page - 1) * itemsPerPage;

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          fullName: {
            contains: query,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          fullName: true,
          liked: { include: { items: true } },
          orders: true,
          cart: true,
        },
        orderBy: { id: "asc" },
        skip,
        take: itemsPerPage,
      }),
      prisma.user.count({
        where: {
          fullName: {
            contains: query,
            mode: "insensitive",
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / itemsPerPage);

    return NextResponse.json({
      users,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Помилка при пошуку користувачів" },
      { status: 500 }
    );
  }
}
