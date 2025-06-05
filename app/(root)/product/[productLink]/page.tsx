import { Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/shared/components/shared/product-form";
import { RecommendedProducts } from "@/shared/components/shared/recommended-products";
import { generateOptimizedMetadata } from "@/shared/lib";
import { unstable_cache } from "next/cache";

export async function generateMetadata({ params }: { params: { productLink: string } }) {
  return generateOptimizedMetadata({ productLink: params.productLink });
}

export default async function ProductPage({ params: { productLink } }: { params: { productLink: string } }) {
  const getCachedData = unstable_cache(
    async ({ productLink }: { productLink: string }) => {
      const product = await prisma.product.findUnique({
        where: { productUrl: String(productLink) },
        include: {
          categories: {
            include: {
              product: {
                include: {
                  items: true,
                },
              },
            },
          },
          items: true,
          complects: {
            include: {
              products: true,
            },
          },
        },
      });

      if (!product) {
        return null;
      }

      let category = null;

      const firstCategoryId = product.categories[0]?.categoryId;
      if (firstCategoryId) {
        category = await prisma.category.findUnique({
          where: { id: firstCategoryId },
          select: { id: true, categoryUrl: true, name: true },
        });
      }

      return { product, category };
    },
    [`product-${productLink}`],
    { revalidate: 60 }
  );

  const cachedData = await getCachedData({ productLink });

  if (!cachedData) {
    return notFound();
  }

  const { product, category } = cachedData;

  return (
    <Container className="flex flex-col px-1 my-5 ml:my-10 sm:px-10 pb-10">
      <ProductForm product={product} category={category} />
      <hr />
      <RecommendedProducts productId={product.id} category={category?.id} />
    </Container>
  );
}
