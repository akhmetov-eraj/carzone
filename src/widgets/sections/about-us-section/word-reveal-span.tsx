"use client"

import { motion, useTransform, MotionValue } from "framer-motion"

interface WordRevealSpanProps {
  word: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  baseScrollStart: number;
  scrollRangeFactor: number;
  opacityRevealDuration: number;
  className?: string;
  totalWords: number;
}

export function WordRevealSpan({
  word,
  index,
  scrollYProgress,
  baseScrollStart,
  scrollRangeFactor,
  opacityRevealDuration,
  className,
  totalWords,
}: WordRevealSpanProps) {
  // Calculate the start and end scroll positions for this specific word's reveal
  const start = baseScrollStart + (index / totalWords) * scrollRangeFactor;
  const end = start + opacityRevealDuration;

  // Use useTransform to animate the opacity of this word based on scroll progress
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block ${className || ''}`}
    >
      {word}
    </motion.span>
  );
}
