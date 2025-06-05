import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import { getServerSession } from 'next-auth';
import { UserRole } from '@prisma/client';
import { authOptions } from '@/shared/constants/auth-options';

export async function POST(req: Request) {
  // Перевірка ролі користувача
  const user = await getServerSession(authOptions);
  if (user?.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Отримання formData
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const productUrl = formData.get('productUrl') as string;
  const index = formData.get('index') as string;
  const folder = formData.get('folder') as string; // Додаємо папку для завантаження

  if (!file || !index || !folder) {
    return NextResponse.json({ error: 'Некоректні дані' }, { status: 400 });
  }

  // Перевірка типу файлу
  const buffer = Buffer.from(await file.arrayBuffer());
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (!ext || !allowedExtensions.includes(ext)) {
    return NextResponse.json({ error: 'Непідтримуваний формат' }, { status: 400 });
  }

  // Перевірка розміру файлу
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Файл занадто великий' }, { status: 400 });
  }

  // Створення шляху до папки для завантаження
  const safeFolder = folder.replace(/[^a-zA-Z0-9-_]/g, ''); // Очистка від небажаних символів
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', safeFolder);

  try {
    await fs.mkdir(uploadDir, { recursive: true }); // Створення папки, якщо її немає
  } catch (err) {
    console.error('Помилка створення папки:', err);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }

  // Формування імені файлу
  const safeProductUrl = productUrl.replace(/[^a-zA-Z0-9-_]/g, '');
  const fileName = `${safeProductUrl}-${index}.webp`;
  const filePath = path.join(uploadDir, fileName);

  // Обробка зображення і збереження
  try {
    await sharp(buffer).webp({ quality: 80 }).toFile(filePath);
    return NextResponse.json({ url: `/uploads/${safeFolder}/${fileName}` });
  } catch (error) {
    console.error('Помилка обробки зображення:', error);
    return NextResponse.json({ error: 'Помилка обробки файлу' }, { status: 500 });
  }
}
