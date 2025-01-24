import { Product, ProductItem, ProductComplect, ProductCategory } from "@prisma/client";

export type ProductWithRelations = Product & {
  items: ProductItem[];
  complects: ProductComplect[]; 
  categories: ProductCategory[];
};
