"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import ProductCard from "./productcard";
import { Reveal } from "./motion-utils";
import type { ProductDTO } from "@/lib/products";

const categoryLabel = (category: string) =>
  category === "extension" ? "Extension" : "Hairstyle";

const SectionTwo = ({ products }: { products: ProductDTO[] }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex flex-col gap-10 px-6 py-16">
      {/* title part */}
      <Reveal className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={reduceMotion ? undefined : { rotate: [0, 7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/assets/curly-gold-left.png"
              alt=""
              width="120"
              height="32"
              className="h-6 w-auto sm:h-8"
            />
          </motion.div>
          <h2 className="text-xl font-bold text-black text-center sm:text-2xl">
            Our Services
          </h2>
          <motion.div
            animate={reduceMotion ? undefined : { rotate: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/assets/curly-gold-right.png"
              alt=""
              width="120"
              height="32"
              className="h-6 w-auto sm:h-8"
            />
          </motion.div>
        </div>
        <p className="max-w-xl text-center text-sm font-light text-[#6B6560] sm:text-base">
          A few of our most loved styles. Every install is done with quality hair
          and a gentle hand.
        </p>
      </Reveal>

      {/* product cards */}
      {products.length === 0 ? (
        <Reveal className="mx-auto w-full max-w-6xl" y={24}>
          <div className="rounded-3xl border border-dashed border-black/10 bg-[#F7EBE7]/50 px-6 py-12 text-center">
            <p className="text-sm font-light text-[#6B6560]">
              New styles are on the way. Message us and we&apos;ll help you find
              the right look.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal
              key={product.id}
              offset={["start 0.98", `start ${0.62 + i * 0.06}`]}
              y={50}
            >
              <ProductCard
                image={product.image}
                finishImage={product.finishImage}
                title={product.name}
                subtitle={product.description}
                badge={categoryLabel(product.category)}
                featured={product.featured}
                price={product.price}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="flex justify-center" y={24}>
        <Link
          href="/service"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/15 bg-white px-7 text-sm font-semibold text-black transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          View all services
          <ArrowRightIcon size={16} weight="bold" aria-hidden />
        </Link>
      </Reveal>
    </section>
  );
};

export default SectionTwo;
