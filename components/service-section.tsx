"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import ProductCard from "./productcard";
import { Reveal } from "./motion-utils";
import { waLink } from "@/lib/whatsapp";

export interface ServiceProduct {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  finishImage?: string | null;
  /** Price in pence, matching the product schema. */
  price?: number | null;
  featured?: boolean;
}

interface ServiceSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  products: ServiceProduct[];
  ctaLabel: string;
  message: string;
  /** "grid" = 2-up mobile grid; "scroll" = horizontal snap-scroller on mobile. */
  layout?: "grid" | "scroll";
  sizes?: string;
  tint?: boolean;
  emptyMessage?: string;
}

const ServiceSection = ({
  id,
  eyebrow,
  title,
  description,
  products,
  ctaLabel,
  message,
  layout = "grid",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw",
  tint = false,
  emptyMessage = "New styles are coming soon. Message us and we'll help you find the right look.",
}: ServiceSectionProps) => {
  const reduceMotion = useReducedMotion();
  const isScroll = layout === "scroll";

  return (
    <section id={id} className={tint ? "bg-[#F7EBE7]" : "bg-white"}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:py-20">
        <Reveal className="flex flex-col items-start gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#80726D]">
            {eyebrow}
          </span>
          <h2 className="text-3xl font-bold text-black sm:text-4xl">{title}</h2>
          <p className="max-w-xl text-sm font-light text-[#6B6560] sm:text-base">
            {description}
          </p>
        </Reveal>

        {products.length === 0 ? (
          <Reveal y={24}>
            <div className="rounded-3xl border border-dashed border-black/10 bg-white/60 px-6 py-12 text-center">
              <p className="text-sm font-light text-[#6B6560]">{emptyMessage}</p>
            </div>
          </Reveal>
        ) : (
          <ul
            role="list"
            aria-label={title}
            tabIndex={isScroll ? 0 : undefined}
            className={
              isScroll
                ? "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-3"
                : "grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
            }
          >
            {products.map((product, i) => (
              <li
                key={product.id}
                className={
                  isScroll ? "w-[68%] shrink-0 snap-start sm:w-auto sm:shrink" : ""
                }
              >
                <Reveal
                  className="h-full"
                  offset={["start 0.98", `start ${0.7 + i * 0.05}`]}
                  y={40}
                >
                  <ProductCard
                    image={product.image}
                    finishImage={product.finishImage}
                    title={product.name}
                    subtitle={product.description}
                    price={product.price}
                    featured={product.featured}
                    sizes={sizes}
                    compact
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <Reveal y={24}>
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="inline-block"
          >
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {ctaLabel}
              <ArrowRightIcon size={18} weight="bold" />
            </a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceSection;
