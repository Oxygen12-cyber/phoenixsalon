"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Switch } from "@heroui/react";
import {
  CheckIcon,
  PlusIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";
import { createProduct, updateProduct, uploadProductImage } from "./actions";

export type ProductInput = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  price: number | null;
  image1Url: string | null;
  image2Url: string | null;
  featured: boolean;
  sortOrder: number;
};

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black transition-colors placeholder:text-[#756A65] hover:border-black/20 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10";

const categoryOptions = [
  { value: "hairstyle", label: "Hairstyle", hint: "Braids, installs, styling" },
  { value: "extension", label: "Extension", hint: "Hair pieces and add-ons" },
];

const ImageField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image must be 10 MB or smaller.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { url } = await uploadProductImage(fd);
      onChange(url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-[#F7EBE7]/40 p-4">
      <span className="text-sm font-medium text-black">{label}</span>
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
          {value ? (
            <Image src={value} alt="" fill sizes="96px" className="object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center text-xs text-[#6B6560]">
              No photo
            </span>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
            {uploading ? "Uploading…" : value ? "Replace photo" : "Upload photo"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs font-medium text-[#6B6560] underline underline-offset-2 hover:text-black"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

const PhotoTile = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image must be 10 MB or smaller.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { url } = await uploadProductImage(fd);
      onChange(url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label
        className={`group relative flex aspect-[4/5] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl ${
          value
            ? "bg-[#F7EBE7] ring-1 ring-black/10"
            : "border border-dashed border-black/20 bg-white transition-colors hover:border-black/40 hover:bg-[#F7EBE7]/50"
        } ${uploading ? "pointer-events-none" : ""}`}
      >
        {value ? (
          <Image
            src={value}
            alt=""
            fill
            sizes="(max-width: 1024px) 30vw, 140px"
            className="object-cover"
          />
        ) : (
          <span className="flex flex-col items-center gap-1 text-[#80726D]">
            <UploadSimpleIcon size={18} weight="light" aria-hidden />
            <span className="text-[11px] font-medium">Add photo</span>
          </span>
        )}
        {value && !uploading && (
          <span className="absolute inset-x-0 bottom-0 bg-black/55 py-1 text-center text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Replace
          </span>
        )}
        {uploading && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white">
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          aria-label={label}
          className="sr-only"
          disabled={uploading}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[11px] font-medium text-[#6B6560]">
          {label}
        </span>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 text-[11px] font-medium text-[#6B6560] underline underline-offset-2 hover:text-black"
          >
            Remove
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-[11px] font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

const ProductForm = ({
  product,
  onCancel,
  onSuccess,
  variant = "page",
}: {
  product?: ProductInput;
  onCancel?: () => void;
  onSuccess?: () => void;
  variant?: "page" | "modal";
}) => {
  const router = useRouter();
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [category, setCategory] = useState(product?.category ?? "hairstyle");
  const [price, setPrice] = useState(
    product?.price != null ? (product.price / 100).toFixed(2) : "",
  );
  const [image1Url, setImage1Url] = useState(product?.image1Url ?? "");
  const [image2Url, setImage2Url] = useState(product?.image2Url ?? "");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [sortOrder, setSortOrder] = useState(String(product?.sortOrder ?? 0));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData();
    if (product) fd.append("id", String(product.id));
    fd.append("name", name);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("price", price);
    fd.append("image1Url", image1Url);
    fd.append("image2Url", image2Url);
    if (featured) fd.append("featured", "on");
    fd.append("sortOrder", sortOrder);

    try {
      if (product) {
        await updateProduct(fd);
      } else if (onSuccess) {
        fd.append("noRedirect", "1");
        await createProduct(fd);
        setSubmitting(false);
        router.refresh();
        onSuccess();
      } else {
        await createProduct(fd);
      }
    } catch {
      setSubmitting(false);
      setError("Could not save this product. Please try again.");
    }
  };

  if (variant === "modal") {
    return (
      <form onSubmit={onSubmit} className="flex min-h-full flex-col">
        <div className="grid flex-1 gap-7 px-6 py-6 sm:px-8 sm:py-7 lg:grid-cols-[minmax(0,1fr)_272px] lg:gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span
                id="category-label"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B6560]"
              >
                Type
              </span>
              <div
                role="radiogroup"
                aria-labelledby="category-label"
                className="grid grid-cols-2 gap-2"
              >
                {categoryOptions.map((option) => {
                  const selected = category === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer flex-col gap-0.5 rounded-xl border px-3.5 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 ${
                        selected
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white text-black hover:border-black/25"
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={option.value}
                        checked={selected}
                        onChange={() => setCategory(option.value)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                      <span
                        className={`text-[11px] leading-tight ${
                          selected ? "text-white/70" : "text-[#6B6560]"
                        }`}
                      >
                        {option.hint}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-black">
                Name <span className="text-[#B0553E]">*</span>
              </label>
              <input
                id="name"
                name="name"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Knotless Box Braids"
                autoFocus
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-black"
                >
                  Description
                </label>
                <span className="text-[11px] font-light tabular-nums text-[#6B6560]">
                  {description.length}/200
                </span>
              </div>
              <textarea
                id="description"
                name="description"
                rows={3}
                maxLength={200}
                className={`${inputClass} resize-none`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short summary of the style, length, or finish"
                aria-describedby="description-help"
              />
              <p
                id="description-help"
                className="text-xs font-light text-[#6B6560]"
              >
                Optional. Appears under the name on the service card.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-black"
                >
                  Price
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#6B6560]">
                    £
                  </span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    className={`${inputClass} pl-8`}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="65.00"
                    aria-describedby="price-help"
                  />
                </div>
                <p
                  id="price-help"
                  className="text-xs font-light text-[#6B6560]"
                >
                  Leave blank for “Price on request”.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="sortOrder"
                  className="text-sm font-medium text-black"
                >
                  Display order
                </label>
                <input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  className={inputClass}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  aria-describedby="sort-order-help"
                />
                <p
                  id="sort-order-help"
                  className="text-xs font-light text-[#6B6560]"
                >
                  Lower numbers appear first.
                </p>
              </div>
            </div>

            <div className="border-t border-black/10 pt-5">
              <Switch
                name="featured"
                isSelected={featured}
                onChange={setFeatured}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3"
              >
                <Switch.Content className="flex w-full items-center justify-between gap-4">
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-black">
                      Featured on homepage
                    </span>
                    <span className="text-xs font-light leading-tight text-[#6B6560]">
                      Shows first in the homepage grid.
                    </span>
                  </span>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </div>
          </div>

          <aside className="flex flex-col gap-3 lg:border-l lg:border-black/10 lg:pl-8">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B6560]">
                Photos
              </h2>
              <p className="text-xs font-light leading-relaxed text-pretty text-[#6B6560]">
                Primary shows on the card. Up to 10 MB each.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PhotoTile
                label="Primary"
                value={image1Url}
                onChange={setImage1Url}
              />
              <PhotoTile
                label="Finish"
                value={image2Url}
                onChange={setImage2Url}
              />
            </div>
          </aside>
        </div>

        <div className="sticky bottom-0 z-10 border-t border-black/10 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
          {error && (
            <p
              role="alert"
              className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="hidden text-xs font-light text-[#6B6560] sm:block">
              <span className="text-[#B0553E]">*</span> Required field
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="tertiary"
                size="lg"
                onPress={onCancel}
                isDisabled={submitting}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isDisabled={submitting}
                className="flex-1 sm:flex-none"
              >
                {submitting ? (
                  <span
                    aria-hidden
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                ) : (
                  <PlusIcon size={16} weight="bold" aria-hidden />
                )}
                {submitting ? "Creating…" : "Create product"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <section className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6B6560]">
            Details
          </h2>
          <p className="text-xs font-light text-[#6B6560]">
            The basics shown on the service card.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="name" className="text-sm font-medium text-black">
              Name
            </label>
            <input
              id="name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Knotless Box Braids"
              autoFocus
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="description" className="text-sm font-medium text-black">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className={inputClass}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short summary of the style, length, or finish"
              aria-describedby="description-help"
            />
            <p
              id="description-help"
              className="text-xs font-light text-[#6B6560]"
            >
              Optional. Appears under the name on the card.
            </p>
          </div>

          <fieldset className="flex flex-col gap-1.5">
            <legend className="mb-1.5 text-sm font-medium text-black">
              Category
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((option) => {
                const selected = category === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer flex-col gap-0.5 rounded-xl border px-3.5 py-3 transition-colors focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 ${
                      selected
                        ? "border-black bg-[#F7EBE7]"
                        : "border-black/10 bg-white hover:border-black/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={option.value}
                      checked={selected}
                      onChange={() => setCategory(option.value)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-black">
                      {option.label}
                    </span>
                    <span className="text-[11px] font-light leading-tight text-[#6B6560]">
                      {option.hint}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-sm font-medium text-black">
              Price
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#6B6560]">
                £
              </span>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                className={`${inputClass} pl-8`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="65.00"
                aria-describedby="price-help"
              />
            </div>
            <p id="price-help" className="text-xs font-light text-[#6B6560]">
              Leave blank to show “Price on request”.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6B6560]">
            Photos
          </h2>
          <p className="text-xs font-light text-[#6B6560]">
            Use a clear portrait shot, up to 10 MB. Add a finish photo to show the
            final look.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageField label="Primary photo" value={image1Url} onChange={setImage1Url} />
          <ImageField label="Finish photo (optional)" value={image2Url} onChange={setImage2Url} />
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6B6560]">
            Display
          </h2>
          <p className="text-xs font-light text-[#6B6560]">
            Control where this product appears and in what order.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sortOrder" className="text-sm font-medium text-black">
              Sort order
            </label>
            <input
              id="sortOrder"
              type="number"
              className={inputClass}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              aria-describedby="sort-order-help"
            />
            <p
              id="sort-order-help"
              className="text-xs font-light text-[#6B6560]"
            >
              Lower numbers appear first.
            </p>
          </div>

          <label className="flex cursor-pointer items-center justify-between gap-4 self-end rounded-xl border border-black/10 bg-[#F7EBE7]/40 px-4 py-3">
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-black">
                Featured on homepage
              </span>
              <span className="text-xs font-light leading-tight text-[#6B6560]">
                Shows first in the homepage grid.
              </span>
            </span>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="relative h-6 w-11 shrink-0 rounded-full bg-black/20 transition-colors peer-checked:bg-black peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5"
            />
          </label>
        </div>
      </section>

      <div className="flex flex-col gap-3">
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="flex items-center justify-end gap-3">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-medium text-[#423F3F] transition-colors hover:bg-black/5"
            >
              Cancel
            </button>
          ) : (
            <Link
              href="/admin"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-medium text-[#423F3F] transition-colors hover:bg-black/5"
            >
              Cancel
            </Link>
          )}
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-black px-7 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            ) : product ? (
              <CheckIcon size={16} weight="bold" aria-hidden />
            ) : (
              <PlusIcon size={16} weight="bold" aria-hidden />
            )}
            {submitting
              ? product
                ? "Saving…"
                : "Creating…"
              : product
                ? "Save changes"
                : "Create product"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
