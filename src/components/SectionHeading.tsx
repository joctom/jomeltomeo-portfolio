import { motion } from "framer-motion";
import type { ReactNode } from "react";
import AmpersandMark from "./AmpersandMark";
import {
  DURATION,
  EASE,
  fadeUpSoft,
  lineDraw,
  maskUp,
  staggerChildren,
  transition,
  viewport,
} from "../utils/motion";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  subtitle?: string;
  subtitleStyle?: "body" | "heading";
  align?: "left" | "center";
  action?: ReactNode;
}

function SplitTitle({ title }: { title: ReactNode }) {
  if (typeof title !== "string") {
    return <>{title}</>;
  }

  return (
    <motion.span
      className="inline-flex flex-wrap"
      variants={staggerChildren(0.06, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {title.split(" ").map((word, index) => {
        const isAmp = word === "&";
        return (
          <span
            key={`${word}-${index}`}
            className={`heading-word-mask ${isAmp ? "heading-amp-wrap" : "mr-[0.28em]"}`}
          >
            <motion.span
              className={`inline-block ${isAmp ? "heading-amp-serif" : ""}`}
              variants={maskUp}
              transition={transition(DURATION.slow, EASE.dramatic)}
            >
              {isAmp ? (
                <>
                  <span className="sr-only">&</span>
                  <AmpersandMark />
                </>
              ) : (
                word
              )}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  subtitleStyle = "body",
  align = "left",
  action,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.header
      className={`section-heading mb-12 md:mb-16 ${isCenter ? "text-center" : "text-left"}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerChildren(0.08, 0.02)}
    >
      <div
        className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
          isCenter ? "items-center" : ""
        }`}
      >
        <div className={isCenter ? "w-full" : "flex-1"}>
          <motion.div
            className={`mb-5 flex items-center gap-4 ${
              isCenter ? "justify-center" : ""
            }`}
            variants={fadeUpSoft}
            transition={transition(DURATION.base, EASE.out)}
          >
            <motion.span
              className="section-heading-line"
              variants={lineDraw}
              transition={transition(DURATION.slow, EASE.dramatic)}
            />
            <span className="meta-label">{label}</span>
          </motion.div>

          <h2 className="display-heading text-[2.35rem] sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]">
            <SplitTitle title={title} />
          </h2>

          {subtitle && (
            <motion.p
              className={
                subtitleStyle === "heading"
                  ? `display-heading mt-3 text-[1.65rem] md:text-[1.85rem] ${
                      isCenter ? "mx-auto" : ""
                    }`
                  : `mt-4 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg ${
                      isCenter ? "mx-auto" : ""
                    }`
              }
              variants={fadeUpSoft}
              transition={transition(DURATION.base, EASE.out, 0.12)}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {action && (
          <motion.div
            className="shrink-0"
            variants={fadeUpSoft}
            transition={transition(DURATION.base, EASE.out, 0.18)}
          >
            {action}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  cursorLabel?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  delay = 0,
  cursorLabel = "Explore",
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`card-surface card-cinematic group p-6 md:p-7 ${
        hover ? "transition-colors duration-300 hover:border-stroke hover:bg-surface" : ""
      } ${className}`}
      initial={{ opacity: 0, y: 32, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: EASE.out }}
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.35, ease: EASE.out },
            }
          : undefined
      }
      data-cursor
      data-cursor-label={cursorLabel}
      data-cursor-variant="hover"
    >
      <span className="card-shine" aria-hidden />
      {children}
    </motion.div>
  );
}
