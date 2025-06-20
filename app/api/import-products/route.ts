import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/constants/auth-options";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return new NextResponse("Файл не знайдено", { status: 400 });

    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    for (const row of rows) {
      const {
        name,
        sku,
        description,
        price,
        oldPrice,
        category,
        subcategory,
        complects,
        size,
        color,
        photo,
        stock,
        currency,
        popularity,
        sticker,
        productUrl,
      } = row as {
        name: string;
        sku: string;
        description: string;
        price: string;
        oldPrice?: string;
        category?: string;
        subcategory?: string;
        complects?: string;
        size?: string;
        color?: string;
        photo?: string;
        stock: string;
        currency: string;
        popularity?: string;
        sticker?: string;
        productUrl?: string;
      };

      const stockBool = stock === "В наявності";
      const priceNum = +price;
      const oldPriceNum = oldPrice ? +oldPrice : null;
      const imageUrl = photo ? photo.split(", ").map((url: string) => url.trim()) : [];
      const stickerProduct = sticker ?? "";
      const popularityProduct = popularity ? +popularity : 0;
      const categoryNames = category ? category.split(", ").map((cat: string) => cat.trim()) : [];
      const subcategoryNames = subcategory ? subcategory.split(", ").map((sub: string) => sub.trim()) : [];
      const complectNames = complects ? complects.split(", ").map((com: string) => com.trim()) : [];

      const foundCategories = await prisma.category.findMany({
        where: { name: { in: categoryNames } },
      });

      const foundSubcategories = await prisma.subcategory.findMany({
        where: { name: { in: subcategoryNames } },
      });

      let product = await prisma.product.findFirst({ where: { name } });

      if (!product) {
        product = await prisma.product.create({
          data: {
            name,
            description,
            color,
            productUrl: productUrl || "",
            price: priceNum,
            imageUrl: imageUrl,
            stock: stockBool,
            popularity: popularityProduct,
            sticker: stickerProduct ? [stickerProduct as import("@prisma/client").ProductStickers] : [],
            categories: {
              create: foundCategories.map((cat) => ({
                category: { connect: { id: cat.id } },
              })),
            },
            subcategories: {
              create: foundSubcategories.map((sub) => ({
                subcategory: { connect: { id: sub.id } },
              })),
            },
          },
        });
      } else {
        const imageUrlChanged =
          JSON.stringify(product.imageUrl) !== JSON.stringify(imageUrl);

        const needsProductUpdate =
          product.description !== description ||
          product.color !== color ||
          product.productUrl !== productUrl ||
          product.price !== priceNum ||
          imageUrlChanged;

        if (needsProductUpdate) {
          await prisma.product.update({
            where: { id: product.id },
            data: {
              description,
              color,
              productUrl,
              price: priceNum,
              imageUrl: imageUrl,
            },
          });
        }

        // 🧹 Очистка попередніх категорій/підкатегорій
        await prisma.product.update({
          where: { id: product.id },
          data: {
            categories: { deleteMany: {} },
            subcategories: { deleteMany: {} },
          },
        });

        // 🔄 Додавання оновлених категорій/підкатегорій
        await prisma.product.update({
          where: { id: product.id },
          data: {
            categories: {
              create: foundCategories.map((cat) => ({
                category: { connect: { id: cat.id } },
              })),
            },
            subcategories: {
              create: foundSubcategories.map((sub) => ({
                subcategory: { connect: { id: sub.id } },
              })),
            },
          },
        });
      }

      const item = await prisma.productItem.findUnique({ where: { sku } });

      if (!item) {
        await prisma.productItem.create({
          data: {
            sku,
            price: priceNum,
            oldPrice: oldPriceNum,
            size: size || "",
            stock: stockBool,
            currency,
            productId: product.id,
          },
        });
      } else {
        const needsUpdate =
          item.price !== priceNum ||
          item.oldPrice !== oldPriceNum ||
          item.size !== size ||
          item.stock !== stockBool ||
          item.currency !== currency ||
          item.productId !== product.id;

        if (needsUpdate) {
          await prisma.productItem.update({
            where: { sku },
            data: {
              price: priceNum,
              oldPrice: oldPriceNum,
              size,
              stock: stockBool,
              currency,
              productId: product.id,
            },
          });
        }
      }

      // 🔁 Перерахунок stock на основі всіх item-ів
      const allItems = await prisma.productItem.findMany({
        where: { productId: product.id },
        select: { stock: true },
      });

      const atLeastOneInStock = allItems.some((item) => item.stock === true);

      if (product.stock !== atLeastOneInStock) {
        await prisma.product.update({
          where: { id: product.id },
          data: { stock: atLeastOneInStock },
        });
      }

      // 🧩 Імпорт комплектів
      if (complectNames.length > 0) {
        const complectProducts = await prisma.product.findMany({
          where: { name: { in: complectNames } },
        });

        if (complectProducts.length > 0) {
          const allProductIds = [product.id, ...complectProducts.map((p) => p.id)];

          // Видалити існуючі комплекти, які вже містять цей продукт
          const existingComplects = await prisma.productComplect.findMany({
            where: {
              products: {
                some: { id: product.id },
              },
            },
            include: { products: true },
          });

          for (const complect of existingComplects) {
            await prisma.productComplect.delete({
              where: { id: complect.id },
            });
          }

          // Створити новий комплект
          await prisma.productComplect.create({
            data: {
              products: {
                connect: allProductIds.map((id) => ({ id })),
              },
            },
          });
        }
      }
    }

    return new NextResponse("Імпорт завершено", { status: 200 });
  } catch (error) {
    console.error("Помилка імпорту:", error);
    return new NextResponse("Помилка при імпорті", { status: 500 });
  }
}