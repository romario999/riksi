import { prisma } from '@/prisma/prisma-client';
import { Prisma } from '@prisma/client';

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 5000;
const ITEMS_PER_PAGE = 18;

export const colorMapping: Record<string, string> = {
  red: 'Червоний',
  white: 'Білий',
  black: 'Чорний',
  milk: 'Молочний',
  pink: 'Рожевий',
};

interface GetProductsParams {
  searchParams: Record<string, string>;
  itemsPerPage?: number;
  categoryUrl?: string;
  subcategoryUrl?: string;
}

export async function getProducts({
  searchParams,
  itemsPerPage = ITEMS_PER_PAGE,
  categoryUrl = '',
  subcategoryUrl = '',
}: GetProductsParams) {
  const page = parseInt(searchParams.page as string || "1", 10);
  const colors = searchParams.color ? searchParams.color?.split(',').map((color) => colorMapping[color] || color) : [];
  const categoriesIdArr = searchParams.categories ? searchParams.categories.split(',').map(Number) : [];
  const subcategoriesIdArr = searchParams.subcategories ? searchParams.subcategories.split(',').map(Number) : [];
  const minPrice = searchParams.priceFrom ? Number(searchParams.priceFrom) : DEFAULT_MIN_PRICE;
  const maxPrice = searchParams.priceTo ? Number(searchParams.priceTo) : DEFAULT_MAX_PRICE;
  const sortOptions = searchParams.sortBy || 'popular';

  const whereConditions: any = {
    items: {
      some: {
        OR: [
          { price: { gte: minPrice, lte: maxPrice } },
          { oldPrice: { gte: minPrice, lte: maxPrice } },
        ],
      },
    },
    ...(colors.length > 0 && { color: { in: colors } }),
  };

  const [category, subcategory] = await Promise.all([
    categoryUrl ? prisma.category.findUnique({ where: { categoryUrl }, include: { subcategories: true } }) : null,
    subcategoryUrl ? prisma.subcategory.findFirst({ where: { subcategoryUrl, category: { categoryUrl } } }) : null,
  ]);

  if (categoryUrl && !category) {
    return { products: [], total: 0, totalPages: 0, currentPage: 1 };
  }

  if (subcategoryUrl && !subcategory) {
    return { products: [], total: 0, totalPages: 0, currentPage: 1 };
  }

  if (category) {
    whereConditions.categories = { some: { categoryId: category.id } };
  }

  if (subcategory) {
    whereConditions.subcategories = { some: { subcategoryId: subcategory.id } };
  }

  if (categoriesIdArr.length > 0) {
    whereConditions.OR = whereConditions.OR || [];
    whereConditions.OR.push({ categories: { some: { categoryId: { in: categoriesIdArr } } } });
  }

  if (subcategoriesIdArr.length > 0) {
    whereConditions.OR = whereConditions.OR || [];
    whereConditions.OR.push({ subcategories: { some: { subcategoryId: { in: subcategoriesIdArr } } } });
  }

  const validSortOrders: Prisma.SortOrder[] = ['asc', 'desc'];
  let orderBy: Prisma.ProductOrderByWithRelationInput | undefined;

  if (sortOptions === 'popular') {
    orderBy = { popularity: 'desc' };
  } else if (validSortOrders.includes(sortOptions as Prisma.SortOrder)) {
    orderBy = { price: sortOptions as Prisma.SortOrder };
  }

  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      where: whereConditions,
      include: {
        items: true,
        categories: true,
        subcategories: true,
      },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: [
        { stock: 'desc' },
        ...(orderBy ? [orderBy] : []),
      ],
    }),
    prisma.product.count({ where: whereConditions }),
  ]);
  

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return { products, total: totalCount, totalPages, currentPage: page };
}