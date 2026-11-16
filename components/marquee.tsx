"use client";

import { useRef } from "react";
import { FlowerLotusIcon } from "@phosphor-icons/react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const marqueeTexts = [
  "HAIR EXTENSIONS",
  "KNOTLESS BRAIDS",
  "SEW-INS",
  "CLOSURE INSTALLS",
  "QUALITY HAIR",
  "GENTLE INSTALLS",
];

const SPEED = 80;

const MarqueeText = ({ text }: { text: string }) => {
  return (
    <div className="flex shrink-0 items-center justify-center gap-3 px-5 whitespace-nowrap">
      <FlowerLotusIcon className="shrink-0" />
      <p className="text-xl font-bold">{text}</p>
      <FlowerLotusIcon className="shrink-0" />
    </div>
  );
};

const Marquee = () => {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const boost = useSpring(
    useTransform(velocity, [-2500, 0, 2500], [-500, 0, 500], {
      clamp: false,
    }),
    { stiffness: 300, damping: 40 },
  );
  const skew = useTransform(velocity, [-2500, 0, 2500], [-6, 0, 6]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused.current || !trackRef.current) return;

    const half = trackRef.current.scrollWidth / 2;
    let next = x.get() - (delta / 1000) * (SPEED + boost.get());
    if (half) {
      if (-next >= half) next += half;
      if (next > 0) next -= half;
    }
    x.set(next);
  });

  return (
    <div
      className="h-15 bg-[#f4f4f4] overflow-hidden flex items-center mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div
        ref={trackRef}
        style={{ x, skewX: reduceMotion ? 0 : skew }}
        className="flex w-max"
      >
        {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
          <MarqueeText key={i} text={text} />
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
