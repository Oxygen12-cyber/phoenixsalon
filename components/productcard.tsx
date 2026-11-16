"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  ArrowsLeftRightIcon,
  ScissorsIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { waLink } from "@/lib/whatsapp";

export interface ProductCardProps {
  image?: string | null;
  finishImage?: string | null;
  title: string;
  subtitle?: string | null;
  badge?: string;
  featured?: boolean;
  /** Price in pence, matching the product schema. */
  price?: number | null;
  sizes?: string;
  compact?: boolean;
}

const formatPrice = (pence: number) =>
  `£${(pence / 100).toFixed(pence % 100 === 0 ? 0 : 2)}`;

const ProductCard = ({
  image,
  finishImage,
  title,
  subtitle,
  badge,
  featured = false,
  price,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  compact = false,
}: ProductCardProps) => {
  const [showFinish, setShowFinish] = useState(false);
  const baseImage = image ?? finishImage ?? null;
  const hoverImage = image && finishImage ? finishImage : null;
  const showingFinish = Boolean(hoverImage) && showFinish;

  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(28,20,16,0.04),0_12px_28px_-16px_rgba(28,20,16,0.22)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(28,20,16,0.06),0_28px_48px_-20px_rgba(28,20,16,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7EBE7]">
        {baseImage ? (
          <>
            <Image
              src={baseImage}
              alt={title}
              fill
              sizes={sizes}
              className={`object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                hoverImage
                  ? showingFinish
                    ? "opacity-0"
                    : "group-hover:opacity-0"
                  : ""
              }`}
            />
            {hoverImage && (
              <Image
                src={hoverImage}
                alt={`${title} — finished look`}
                fill
                sizes={sizes}
                className={`object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                  showingFinish
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F7EBE7] via-[#fbf4f1] to-[#efe0d9] text-[#80726D]">
            <ScissorsIcon size={28} weight="light" aria-hidden />
            <span className="text-xs font-medium">Image coming soon</span>
          </div>
        )}

        {(badge || featured) && (
          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
            {featured && (
              <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
                Featured
              </span>
            )}
            {badge && (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#423F3F] shadow-sm ring-1 ring-black/5 backdrop-blur-md">
                {badge}
              </span>
            )}
          </div>
        )}

        {hoverImage && (
          <button
            type="button"
            aria-pressed={showFinish}
            aria-label={
              showFinish ? "Show the original look" : "Show the finished look"
            }
            onClick={() => setShowFinish((v) => !v)}
            className="absolute bottom-3 right-3 z-10 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/90 px-3 text-xs font-semibold text-black shadow-sm ring-1 ring-black/5 backdrop-blur-md transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <ArrowsLeftRightIcon size={14} weight="bold" aria-hidden />
            {showingFinish ? "Before" : "After"}
          </button>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col ${compact ? "gap-1 p-4" : "gap-1.5 p-4 sm:p-5"}`}
      >
        <h3
          className={`${
            compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
          } font-semibold leading-snug tracking-tight text-black`}
        >
          {title}
        </h3>
        {subtitle?.trim() && (
          <p
            className={`line-clamp-2 ${
              compact ? "text-xs sm:text-sm" : "text-sm"
            } font-light leading-relaxed text-[#6B6560]`}
          >
            {subtitle}
          </p>
        )}
        {price != null && (
          <p className="mt-1 text-sm font-light text-[#6B6560]">
            From{" "}
            <span className="font-semibold text-black">
              {formatPrice(price)}
            </span>
          </p>
        )}

        <div className="mt-auto border-t border-black/10 pt-3">
          <a
            href={waLink(`Hi, I want to book this ${title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-between gap-2 rounded-xl px-1 text-sm font-medium text-black transition-colors duration-200 hover:bg-[#F7EBE7] hover:text-[#26201e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <span className="inline-flex items-center gap-2">
              <WhatsappLogoIcon size={16} weight="fill" aria-hidden />
              Book this
            </span>
            <ArrowRightIcon
              size={16}
              weight="bold"
              aria-hidden
              className="text-[#80726D] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
