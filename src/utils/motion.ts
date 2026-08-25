import type { Transition } from "framer-motion";

export const EASE = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
  dramatic: [0.16, 1, 0.3, 1] as [number, number, number, number],
  expo: [0.87, 0, 0.13, 1] as [number, number, number, number],
  snap: [0.33, 1, 0.68, 1] as [number, number, number, number],
};

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.85,
  cinematic: 1.15,
};

export function staggerChildren(delay = 0.07, delayChildren = 0.12) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
        delayChildren,
      },
    },
  };
}

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export const fadeUpSoft = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const maskUp = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
  },
};

export const lineDraw = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const viewport = {
  once: true,
  margin: "-80px" as const,
};

export const viewportTight = {
  once: true,
  margin: "-40px" as const,
};

export function transition(
  duration = DURATION.base,
  ease: [number, number, number, number] = EASE.out,
  delay = 0,
): Transition {
  return { duration, ease, delay };
}
