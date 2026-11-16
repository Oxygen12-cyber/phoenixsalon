"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
}

const Typewriter = ({
  text,
  className,
  speed = 60,
  startDelay = 0,
  onDone,
}: TypewriterProps) => {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduceMotion) {
      onDoneRef.current?.();
      return;
    }

    let controls: ReturnType<typeof animate> | undefined;
    const timer = setTimeout(() => {
      controls = animate(0, text.length, {
        duration: (text.length * speed) / 1000,
        ease: "linear",
        onUpdate: (v) => setCount(Math.round(v)),
        onComplete: () => onDoneRef.current?.(),
      });
    }, startDelay);

    return () => {
      clearTimeout(timer);
      controls?.stop();
    };
  }, [text, speed, startDelay, reduceMotion]);

  const shown = reduceMotion ? text.length : count;
  const done = shown >= text.length;

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, shown)}</span>
      {!done && (
        <span
          aria-hidden
          className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.06em] animate-pulse bg-current"
        />
      )}
    </span>
  );
};

export default Typewriter;
