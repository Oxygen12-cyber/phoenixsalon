"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/src/db";
import { product } from "@/src/db/schema";
import { uploadImage } from "@/lib/cloudinary";

const readProduct = (formData: FormData) => {
  const priceRaw = String(formData.get("price") ?? "").trim();
  const price = priceRaw ? Math.round(Number(priceRaw) * 100) : null;

  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    category: String(formData.get("category") ?? "hairstyle").trim() || "hairstyle",
    price: price !== null && !Number.isNaN(price) ? price : null,
    image1Url: String(formData.get("image1Url") ?? "").trim() || null,
    image2Url: String(formData.get("image2Url") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  };
};

export async function createProduct(formData: FormData) {
  const values = readProduct(formData);
  if (!values.name) throw new Error("Name is required.");

  await db.insert(product).values(values);
  updateTag("products");
  revalidatePath("/admin");
  if (formData.get("noRedirect") !== "1") {
    redirect("/admin");
  }
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  const values = readProduct(formData);
  if (!values.name) throw new Error("Name is required.");

  await db.update(product).set(values).where(eq(product.id, id));
  updateTag("products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  await db.delete(product).where(eq(product.id, id));
  updateTag("products");
  revalidatePath("/admin");
}

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export async function uploadProductImage(formData: FormData) {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 10 MB or smaller.");
  }
  return { url: await uploadImage(file) };
}
