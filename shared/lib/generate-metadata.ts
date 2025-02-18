import { Metadata } from "next";
import { prisma } from "@/prisma/prisma-client";

interface MetadataParams {
  productLink?: string;
  categoryLink?: string;
  subcategoryLink?: string;
  footerUrl?: string;
  profile?: boolean;
  notAuth?: boolean;
  catalog?: boolean;
  wishlist?: boolean;
}

export const generateOptimizedMetadata = async ({ productLink, categoryLink, subcategoryLink, footerUrl, profile, notAuth, catalog, wishlist }: MetadataParams): Promise<Metadata> => {
  let title = "RIKSI";
  let description = "Ознайомтесь з нашими товарами на сайті RIKSI.";
  let url = "https://example.com/";

    if (productLink) {
        const product = await prisma.product.findUnique({
            where: { productUrl: productLink },
            select: { name: true },
        });

        title = `${product?.name} | RIKSI`;
        description = `${product?.name} - купити в інтернет-магазині RIKSI. Широкий асортимент товарів та вигідні ціни.`;
        url = `https://example.com/product/${productLink}`;
    }

    if (categoryLink) {
        title = `${categoryLink} | RIKSI`;
        description = `Перегляньте найкращі товари у категорії ${categoryLink} в інтернет-магазині RIKSI.`;
        url = `https://example.com/category/${categoryLink}`;
    }

    if (subcategoryLink) {
        title = `${subcategoryLink} | RIKSI`;
        description = `Перегляньте товари в підкатегорії ${subcategoryLink} в RIKSI.`;
        url = `https://example.com/category/${subcategoryLink}`;
    }

    if (footerUrl) {
        const pageInfo = await prisma.footerPage.findUnique({
            where: { footerUrl },
            select: { title: true },
        });

        title = `${pageInfo?.title} | RIKSI`;
        description = `Ознайомтесь з ${pageInfo?.title} на сайті RIKSI.`;
        url = `https://example.com/${footerUrl}`;
    }

    if(catalog) {
        title = 'Каталог товарів RIKSI | Жіночий одяг та білизна',
        description = 'Ознайомтесь з каталогом RIKSI. Найкраща якість за доступними цінами.'
        url = 'https://example.com/catalog'
    }

    if (profile) {
        title = 'Профіль користувача | RIKSI',
        description = 'Особистий кабінет користувача'
    }

    if (notAuth) {
        title = 'Ви не авторизовані | RIKSI',
        description = 'Будь ласка, авторизуйтесь, щоб отримати доступ до цієї сторінки сайту.'
    }

    if (wishlist) {
        title = 'Список бажань | RIKSI',
        description = 'Ознайомтесь з вашим списком бажань'
    }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
    },
  };
};