"use server";

import { asc, ilike, or } from "drizzle-orm";
import { db } from "@/src/db";
import { product } from "@/src/db/schema";
import type { ProductDTO } from "@/lib/products";

const LIMIT = 8;

const escapeLike = (value: string) => value.replace(/[\\%_]/g, "\\$&");

export async function searchProducts(query: string): Promise<ProductDTO[]> {
  const term = query.trim();
  if (term.length < 2) return [];

  const pattern = `%${escapeLike(term)}%`;

  const rows = await db
    .select()
    .from(product)
    .where(
      or(
        ilike(product.name, pattern),
        ilike(product.description, pattern),
        ilike(product.category, pattern),
      ),
    )
    .orderBy(asc(product.sortOrder), asc(product.id))
    .limit(LIMIT);

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
