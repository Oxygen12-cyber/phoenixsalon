"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal, useParallax } from "./motion-utils";

const SectionThree = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const imgY = useParallax(ref, 70);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden px-6 py-20 sm:py-24 lg:py-28"
      style={{
        background:
          "radial-gradient(120% 120% at 60% 50%, rgba(128,114,109,0.94) 8%, rgba(129,113,108,1) 34%, rgba(122,107,102,1) 60%)",
      }}
    >
      {/* drifting glow */}
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { x: [-40, 40, -40], y: [20, -20, 20] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-6rem] top-1/2 -mt-48 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* image */}
        <div className="flex w-full flex-1 items-center justify-center lg:w-1/2">
          <motion.div style={{ y: imgY }} className="w-full max-w-xl">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-full shadow-2xl ring-1 ring-white/20"
            >
              <Image
                src="/assets/sec3hero.png"
                alt="Styled hair by Phoenix Salon"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* value statement — booking CTA lives in the section below */}
        <div className="flex w-full flex-1 flex-col items-start gap-5 lg:w-1/2">
          <Reveal y={24}>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              Your next look
            </span>
          </Reveal>
          <Reveal y={36}>
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Ready For <br /> Your Best Hair?
            </h2>
          </Reveal>
          <Reveal y={30}>
            <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
              From bold transformations to everyday polish, every appointment is
              tailored to you and the look you want.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
