import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = params;

  if (!slug || !Array.isArray(slug)) {
    return NextResponse.json({ error: 'Невірний запит' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'uploads', ...slug);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: { 'Content-Type': contentType },
    });
  } catch (error) {
    console.error('Помилка читання файлу:', error);
    return NextResponse.json({ error: 'Файл не знайдено' }, { status: 404 });
  }
}
