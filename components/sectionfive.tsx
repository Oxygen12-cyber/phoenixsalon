"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { PlusIcon } from "@phosphor-icons/react";

interface Faq {
  question: string;
  answer: string;
}

const faqData: Faq[] = [
  {
    question: "How long does an appointment take?",
    answer: "It depends on the style. The time is shown on each service.",
  },
  {
    question: "Do I pay online?",
    answer: "No. Your request goes to WhatsApp and we confirm there.",
  },
  {
    question: "Can I bring my own hair?",
    answer: "Yes, just let us know when you book.",
  },
  {
    question: "What if I need to cancel?",
    answer:
      "Please message us as early as possible. A cancellation fee applies to confirmed appointments.",
  },
];

export const DividerLine = ({
  progress,
}: {
  progress: MotionValue<number>;
}) => {
  const reduceMotion = useReducedMotion();
  const scaleX = useTransform(
    progress,
    [0, 0.3],
    reduceMotion ? [1, 1] : [0, 1],
  );
  return (
    <motion.div
      style={{ scaleX }}
      className="h-1 w-24 origin-left rounded-full bg-yellow-800"
    />
  );
};

const FaqItem = ({
  faq,
  index,
  progress,
}: {
  faq: Faq;
  index: number;
  progress: MotionValue<number>;
}) => {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const start = Math.min(index * 0.12, 0.5);
  const end = start + 0.4;
  const opacity = useTransform(
    progress,
    [start, end],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const y = useTransform(progress, [start, end], reduceMotion ? [0, 0] : [36, 0]);

  const id = `faq-${index}`;

  return (
    <motion.li style={{ opacity, y }} className="group">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-[#F7EBE7]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
        >
          <span className="text-base font-semibold text-black sm:text-lg">
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="shrink-0 text-black"
          >
            <PlusIcon size={20} weight="bold" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-[#6B6560] sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

const SectionFive = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.6,
  });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-6 py-24"
    >
      <DividerLine progress={progress} />
      <h2 className="mt-6 text-3xl font-bold text-black sm:text-4xl">FAQs</h2>
      <p className="mt-3 max-w-md text-center text-sm font-light text-[#6B6560] sm:text-base">
        Everything you need to know before booking.
      </p>

      <ul className="mt-12 flex w-full max-w-3xl flex-col divide-y divide-black/10 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
        {faqData.map((faq, i) => (
          <FaqItem key={faq.question} faq={faq} index={i} progress={progress} />
        ))}
      </ul>
    </section>
  );
};

export default SectionFive;
