import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageUrl = formData.get("imageUrl") as string;

    if (!imageUrl) {
      return NextResponse.json({ error: "Некоректні дані" }, { status: 400 });
    }

    // Перевірка на безпечний шлях
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const normalizedPath = path.normalize(path.join(process.cwd(), "public", imageUrl));

    if (!normalizedPath.startsWith(uploadsDir)) {
      return NextResponse.json({ error: "Недозволений шлях до файлу" }, { status: 403 });
    }

    // Перевіряємо, чи існує файл
    try {
      await fs.access(normalizedPath);
    } catch {
      return NextResponse.json({ error: "Файл не знайдено" }, { status: 404 });
    }

    // Видалення файлу
    await fs.unlink(normalizedPath);

    return NextResponse.json({ message: "Файл успішно видалено" });
  } catch (error) {
    console.error("Помилка при видаленні файлу:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
