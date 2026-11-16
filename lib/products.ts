import { asc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/src/db";
import { product } from "@/src/db/schema";

export type ProductCategory = "hairstyle" | "extension";

export interface ProductDTO {
  id: number;
  name: string;
  description: string | null;
  category: string;
  price: number | null;
  featured: boolean;
  image: string | null;
  finishImage: string | null;
}

async function fetchProducts(): Promise<ProductDTO[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  const rows = await db
    .select()
    .from(product)
    .orderBy(asc(product.sortOrder), asc(product.id));

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    price: row.price,
    featured: row.featured,
    image: row.image1Url,
    finishImage: row.image2Url,
  }));
}

export async function getProducts(): Promise<ProductDTO[]> {
  return fetchProducts();
}

export async function getHomepageProducts(limit = 4): Promise<ProductDTO[]> {
  const items = await fetchProducts();
  const featured = items.filter((item) => item.featured);
  const rest = items.filter((item) => !item.featured);
  return [...featured, ...rest].slice(0, limit);
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<ProductDTO[]> {
  const items = await fetchProducts();
  return items.filter((item) => item.category === category);
}
