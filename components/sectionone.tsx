"use client";

import { useRef, useState } from "react";
import {
  FeatherIcon,
  HeartIcon,
  PlayIcon,
  ShootingStarIcon,
  SketchLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import Typewriter from "./typewriter";
import { waLink } from "@/lib/whatsapp";

interface commendElements {
  elementIcon: React.ReactNode;
  title: string;
  subtitle: string;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const restContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const restItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const CommendText = ({
  elementIcon,
  title,
  subtitle,
  delay = 0,
}: commendElements & { delay?: number }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="flex flex-col items-center justify-center"
    >
      {elementIcon}
      <p className="text-xl font-bold text-black">{title}</p>
      <p className="text-xs font-medium text-gray-800">{subtitle}</p>
    </motion.div>
  );
};

const SectionOne = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [headlineDone, setHeadlineDone] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 160],
  );
  const gradientY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 70],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -120],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    reduceMotion ? [1, 1, 1] : [1, 1, 0],
  );

  return (
    <section ref={ref} className="relative w-full h-[80vh] overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/assets/hero1.png"
            alt="hero"
            fill
            sizes="100vw"
            priority
            className="object-cover -scale-x-100"
          />
        </motion.div>
      </motion.div>

      {/* layer 2: gradient over left half of image */}
      <motion.div
        style={{
          y: gradientY,
          background:
            "linear-gradient(140deg, rgba(244,199,184,0.94) 40%, rgba(247,235,231,0.44) 80%, rgba(247,235,231,0.60) 90%)",
          maskImage: "linear-gradient(to right, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 60%, transparent 100%)",
        }}
        className="absolute inset-y-0 left-0 w-full lg:w-1/2"
      />

      {/* layer 3: text layer, left aligned over the gradient */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute inset-y-0 pt-72 md:pt-0 left-0 w-full lg:w-1/2 flex flex-col items-start justify-center gap-4 sm:gap-6 px-6 sm:px-10 lg:px-16"
      >
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight"
        >
          <span className="block">
            <Typewriter
              text="HAIR THAT"
              speed={50}
              startDelay={250}
              onDone={() => setHeadlineDone(true)}
            />
          </span>
          <motion.span
            variants={restContainer}
            initial="hidden"
            animate={headlineDone ? "show" : "hidden"}
            className="block"
          >
            <motion.span variants={restItem} className="block">
              FEELS AS GOOD
            </motion.span>
            <motion.span variants={restItem} className="block">
              AS IT LOOKS
            </motion.span>
          </motion.span>
        </motion.h1>
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-[#423F3F] max-w-md"
        >
          Premium extensions, installed with care and <br /> finished to
          perfection
        </motion.p>
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <motion.a
            href={waLink("Hi Phoenix Salon, I'd like to book an appointment.")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="px-6 py-3 bg-black rounded-3xl text-white text-xl shadow-sm font-bold"
          >
            Book appointment
          </motion.a>
          <motion.a
            href="/service"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="flex items-center justify-center gap-3"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.09, 1], opacity: [1, 0.82, 1] }
              }
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 border border-black bg-transparent rounded-full"
            >
              <PlayIcon size={32} weight="duotone" className="" />
            </motion.div>
            <div className="font-bold text-black">View our styles</div>
          </motion.a>
        </motion.div>
        <motion.div
          variants={item}
          className="invisible md:visible flex items-center justify-center gap-5"
        >
          <CommendText
            elementIcon={<SketchLogoIcon size={32} weight="bold" />}
            title="Quality Hair"
            subtitle="Your money's worth"
            delay={0}
          />
          <div className="py-6 px-0.5 bg-gray-500 rounded-xl"></div>
          <CommendText
            elementIcon={<FeatherIcon size={32} weight="bold" />}
            title="Premium Products"
            subtitle="Loved by Professionals"
            delay={0.4}
          />
          <div className="py-6 px-0.5 bg-gray-500 rounded-xl"></div>
          <CommendText
            elementIcon={<ShootingStarIcon size={32} weight="bold" />}
            title="5 Star Experience"
            subtitle="Clients love us"
            delay={0.8}
          />
        </motion.div>
      </motion.div>

      {/* signature text right side */}
      <motion.div
        animate={
          reduceMotion ? undefined : { y: [0, -10, 0], rotate: [-12, -8, -12] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="invisible md:visible absolute right-0 bottom-28 pr-48 -rotate-12"
      >
        <p className="text-white font-bold text-xl tracking-tight leading-tight text-center">
          Hands <br /> that care
          <br /> Hair
          <br /> that last
          <HeartIcon />
        </p>
      </motion.div>
    </section>
  );
};

export default SectionOne;
