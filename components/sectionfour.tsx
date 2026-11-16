"use client";

import { useRef } from "react";
import { ArrowRightIcon, InfinityIcon } from "@phosphor-icons/react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal, useParallax } from "./motion-utils";
import { waLink } from "@/lib/whatsapp";

const steps = [
  {
    number: "1",
    title: "Choose your style",
    subtitle: "Browse the styles and pick your favorite. Not sure? send a photo.",
  },
  {
    number: "2",
    title: "Send your request",
    subtitle: "Tap reserve and your details go straight to WhatsApp.",
  },
  {
    number: "3",
    title: "Get confirmed and glow",
    subtitle: "We confirm your slot, then you relax and enjoy.",
  },
];

const ListItem = ({
  number,
  title,
  subtitle,
  delay,
}: {
  number: string;
  title: string;
  subtitle: string;
  delay: number;
}) => {
  const reduceMotion = useReducedMotion();
  return (
    <li>
      <Reveal className="flex gap-4" y={28}>
        <motion.span
          animate={reduceMotion ? undefined : { scale: [1, 1.09, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
          className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white ring-4 ring-white"
        >
          {number}
        </motion.span>
        <div className="flex flex-col gap-1 pt-1">
          <p className="text-lg font-bold text-black sm:text-xl">{title}</p>
          <p className="text-sm text-gray-800 sm:text-base">{subtitle}</p>
        </div>
      </Reveal>
    </li>
  );
};

const SectionFour = () => {
  const ref = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const imgY = useParallax(ref, 60);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.75", "end 0.45"],
  });
  const lineScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={ref}
      className="px-6 sm:px-12 lg:px-24"
      style={{
        background:
          "linear-gradient(to bottom, rgba(247,232,227,1) 0%, rgba(255,255,255,0.91) 12%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 py-20 sm:py-24 lg:flex-row lg:items-stretch lg:gap-16 lg:py-0">
        {/* leftside text */}
        <div className="flex flex-col gap-8 lg:flex-1 lg:py-24">
          <Reveal y={24}>
            <p className="text-2xl font-semibold text-black sm:text-3xl lg:text-4xl">
              How It Works
            </p>
          </Reveal>
          <Reveal y={36}>
            <h2 className="text-4xl font-bold tracking-wide text-black sm:text-5xl lg:text-6xl">
              Reserve your spot in minutes
            </h2>
          </Reveal>

          {/* steps with growing connector line */}
          <div className="relative">
            <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-black/10" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-[17px] top-4 bottom-4 w-0.5 origin-top bg-black"
            />
            <ul ref={stepsRef} className="relative space-y-8 sm:space-y-10">
              {steps.map((step, i) => (
                <ListItem key={step.number} {...step} delay={i * 0.5} />
              ))}
            </ul>
          </div>

          <Reveal y={24}>
            <p className="text-sm font-light tracking-wide text-gray-800 sm:text-base">
              <span className="font-bold">Note:</span> No online payment needed.
              A cancellation fee applies to confirmed appointments that are
              canceled.
            </p>
          </Reveal>

          <Reveal y={24}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                <a
                  href={waLink("Hi Phoenix Salon, I'd like to book an appointment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-7 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  Book appointment
                  <ArrowRightIcon size={18} weight="bold" />
                </a>
              </motion.div>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                <Link
                  href="/service"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-3.5 font-semibold text-black transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  <InfinityIcon size={22} weight="bold" />
                  Find your look
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* right side with portrait type image/media */}
        <motion.div style={{ y: imgY }} className="w-full lg:flex-1 lg:pr-2">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl lg:aspect-auto lg:h-full lg:max-w-none lg:overflow-visible lg:rounded-none"
          >
            <video
              autoPlay={!reduceMotion}
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/sec4hero.png"
              aria-label="Phoenix Salon hair styling reel"
              className="absolute inset-0 h-full w-full object-cover object-top lg:object-contain lg:object-right"
            >
              <source src="/phoenix.webm" type="video/webm" />
            </video>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionFour;
