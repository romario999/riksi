import { Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/shared/components/shared/product-form";
import { RecommendedProducts } from "@/shared/components/shared/recommended-products";
import { generateOptimizedMetadata } from "@/shared/lib";

export async function generateMetadata({ params }: { params: { productLink: string } }) {
  return generateOptimizedMetadata({ productLink: params.productLink });
}


export default async function ProductPage({ params: { productLink } }: { params: { productLink: string } }) {
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

    const category = await prisma.category.findUnique({
        where: { id: Number(product?.categories[0].categoryId) },
        select: { id: true, categoryUrl: true, name: true },
    });

    if (!product) {
        return notFound();
    }
    return (
        <Container className="flex flex-col px-1 my-5 ml:my-10 sm:px-10 pb-10">
           <ProductForm product={product} category={category} />
           <hr />
           <RecommendedProducts productId={product.id} category={category?.id}/>
        </Container>
    );
}