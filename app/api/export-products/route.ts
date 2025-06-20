import { prisma } from "@/prisma/prisma-client";
import { authOptions } from "@/shared/constants/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const products = await prisma.product.findMany({
        include: {
        items: true,
        categories: {
            include: {
                category: true
            }
        },
        subcategories: {
            include: {
                subcategory: true
            }
        },
        complects: {
            include: {
                products: true
            }
        }
        },
    });

    const rows = products.flatMap((product) =>
        product.items.map((item) => ({
            sku: item.sku,
            name: product.name,
            description: product.description ?? "",
            productUrl: product.productUrl,
            photo: product.imageUrl.join(", "),
            category: product.categories.map((cat) => cat.category.name).join(", "),
            subcategory: product.subcategories.map((sub) => sub.subcategory.name).join(", "),
            complects: product.complects.map((com) => com.products.map((p) => p.name).join(", ")).join(", "),
            price: item.price,
            oldPrice: item.oldPrice ?? "",
            size: item.size,
            color: product.color ?? "",
            sticker: product.sticker.map((st) => st).join(", "),
            popularity: product.popularity ?? 0,
            stock: item.stock ? "В наявності" : "Немає",
            currency: item.currency,
        }))
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Товари");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    return new NextResponse(buffer, {
        headers: {
        "Content-Disposition": `attachment; filename=products-${Date.now()}.xlsx`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
    });
}
