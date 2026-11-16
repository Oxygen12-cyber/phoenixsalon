import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { product } from "@/src/db/schema";
import ProductForm from "../product-form";

const ProductFormSkeleton = () => (
  <div
    className="flex flex-col gap-6"
    aria-busy="true"
    aria-label="Loading product"
  >
    {Array.from({ length: 3 }).map((_, section) => (
      <div
        key={section}
        className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
      >
        <div className="h-3 w-24 animate-pulse rounded bg-black/10" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-11 animate-pulse rounded-xl bg-black/5 sm:col-span-2" />
          <div className="h-24 animate-pulse rounded-xl bg-black/5 sm:col-span-2" />
          <div className="h-11 animate-pulse rounded-xl bg-black/5" />
          <div className="h-11 animate-pulse rounded-xl bg-black/5" />
        </div>
      </div>
    ))}
  </div>
);

const EditProduct = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) notFound();

  const [item] = await db
    .select()
    .from(product)
    .where(eq(product.id, productId))
    .limit(1);

  if (!item) notFound();

  return <ProductForm product={item} />;
};

const EditProductPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin"
          className="text-sm font-medium text-[#6B6560] transition-colors hover:text-black"
        >
          ← Back to products
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-black">Edit product</h1>
      </div>
      <Suspense fallback={<ProductFormSkeleton />}>
        <EditProduct params={params} />
      </Suspense>
    </div>
  );
};

export default EditProductPage;
