import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { desc } from "drizzle-orm";
import { db } from "@/src/db";
import { product } from "@/src/db/schema";
import DeleteButton from "./delete-button";
import AddProductModal from "./add-product-modal";

export const instant = false;

const formatPrice = (pence: number | null) =>
  pence == null ? "Price on request" : `£${(pence / 100).toFixed(2)}`;

const ProductListSkeleton = () => (
  <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading products">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
        >
          <div className="h-3 w-16 animate-pulse rounded bg-black/10" />
          <div className="mt-2 h-6 w-10 animate-pulse rounded bg-black/10" />
        </div>
      ))}
    </div>
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <ul className="divide-y divide-black/5">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-[#F7EBE7]" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-black/10" />
              <div className="h-3 w-28 animate-pulse rounded bg-black/5" />
            </div>
            <div className="h-8 w-20 animate-pulse rounded-full bg-black/5" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ProductList = async () => {
  const items = await db
    .select()
    .from(product)
    .orderBy(product.sortOrder, desc(product.createdAt));

  const hairstyles = items.filter((item) => item.category !== "extension").length;
  const extensions = items.filter((item) => item.category === "extension").length;
  const featured = items.filter((item) => item.featured).length;

  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: items.length },
          { label: "Hairstyles", value: hairstyles },
          { label: "Extensions", value: extensions },
          { label: "Featured", value: featured },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white px-4 py-3.5 shadow-sm ring-1 ring-black/5"
          >
            <dt className="text-xs font-medium uppercase tracking-wider text-[#6B6560]">
              {stat.label}
            </dt>
            <dd className="mt-1 text-2xl font-bold text-black">{stat.value}</dd>
          </div>
        ))}
      </dl>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/10 bg-white p-12 text-center">
          <p className="text-sm text-[#6B6560]">
            No products yet. Click &ldquo;Add product&rdquo; to create your first one.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <ul className="divide-y divide-black/5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-[#F7EBE7]/30"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F7EBE7] ring-1 ring-black/5">
                  {item.image1Url ? (
                    <Image
                      src={item.image1Url}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-[10px] font-medium text-[#6B6560]">
                      No photo
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-black">{item.name}</p>
                    <span className="rounded-full bg-[#F7EBE7] px-2.5 py-0.5 text-[11px] font-medium capitalize text-black">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="rounded-full bg-black px-2.5 py-0.5 text-[11px] font-medium text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-light text-[#6B6560]">
                    {formatPrice(item.price)}
                    {item.description ? ` · ${item.description}` : ""}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/admin/products/${item.id}`}
                    className="rounded-full px-3 py-1.5 text-sm font-medium text-[#423F3F] transition-colors hover:bg-black/5 hover:text-black"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={item.id} name={item.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Products</h1>
          <p className="text-sm font-light text-[#6B6560]">
            Manage hairstyles and extensions
          </p>
        </div>
        <AddProductModal />
      </div>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default AdminDashboard;
