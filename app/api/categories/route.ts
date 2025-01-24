import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await prisma.category.findMany({
        include: {
            subcategories: true
        }
    });
    return NextResponse.json(categories);
}

  /*  import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    // Отримуємо категорії та підкатегорії з бази даних з приєднанням до категорії
    const categories = await prisma.category.findMany();
    const subcategories = await prisma.subcategory.findMany({
        include: {
            category: true, // додаємо інформацію про категорію до кожної підкатегорії
        }
    });

    // Створюємо мапу для підрахунку кількості повторюваних підкатегорій
    const subcategoryCount = subcategories.reduce((acc, subcategory) => {
        acc[subcategory.name] = (acc[subcategory.name] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Створюємо масив для всіх субкатегорій з батьківськими категоріями
    const subcategoriesWithParent = subcategories.map(subcategory => {
        const parentCategory = subcategory.category.name;

        // Якщо підкатегорія повторюється, додаємо батьківську категорію
        const nameWithParent = subcategoryCount[subcategory.name] > 1
            ? `${subcategory.name} (${parentCategory})`
            : subcategory.name;

        return {
            ...subcategory,
            name: nameWithParent, // Оновлюємо ім'я підкатегорії
        };
    });

    // Об'єднуємо категорії та оновлені підкатегорії в один масив
    const data = [
        ...categories.map(category => ({ ...category, type: 'category' })),
        ...subcategoriesWithParent.map(subcategory => ({ ...subcategory, type: 'subcategory' }))
    ];

    return NextResponse.json(data);
}
*/