import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { getSkillVisual, type LucideSkillName } from "../data/skillIcons";
import { DURATION, EASE } from "../utils/motion";

const lucideMap = {
  Sparkles,
} satisfies Record<LucideSkillName, typeof Sparkles>;

function LucideMark({ name, color }: { name: LucideSkillName; color: string }) {
  const Icon = lucideMap[name];
  return <Icon className="skill-logo" color={color} strokeWidth={1.75} />;
}

const tileVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: 10, scale: 0.94, filter: "blur(6px)" },
};

interface SkillChipProps {
  name: string;
}

export default function SkillChip({ name }: SkillChipProps) {
  const visual = getSkillVisual(name);
  const color = visual?.color ?? "#8A847A";

  return (
    <motion.span
      layout
      className="skill-tile"
      style={{ "--skill-color": color } as CSSProperties}
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: DURATION.fast, ease: EASE.out }}
      data-cursor
      data-cursor-label={name}
      data-cursor-variant="hover"
    >
      <span className="skill-logo-wrap">
        {visual?.type === "simple" && (
          <svg className="skill-logo" viewBox="0 0 24 24" aria-hidden>
            <path fill={`#${visual.icon.hex}`} d={visual.icon.path} />
          </svg>
        )}
        {visual?.type === "image" && (
          <img className="skill-logo" src={visual.src} alt="" draggable={false} />
        )}
        {visual?.type === "lucide" && (
          <LucideMark name={visual.name} color={visual.color} />
        )}
        {!visual && (
          <span className="skill-logo skill-logo-fallback" aria-hidden>
            {name.charAt(0)}
          </span>
        )}
      </span>
      <span className="skill-tile-label">{name}</span>
    </motion.span>
  );
}
