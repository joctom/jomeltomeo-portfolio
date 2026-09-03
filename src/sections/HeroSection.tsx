import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import { useIntro } from "../context/IntroContext";
import { PERSONAL, RESUME } from "../data/constants";
import {
  DURATION,
  EASE,
  fadeUpSoft,
  staggerChildren,
  transition,
} from "../utils/motion";

function SplitName({ name, active }: { name: string; active: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span>{name}.</span>;
  }

  return (
    <motion.span
      className="inline-flex flex-wrap overflow-visible pb-[0.2em] leading-[1.22]"
      variants={staggerChildren(0.035, 0.2)}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      {`${name}.`.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block overflow-visible pb-[0.28em] pt-[0.08em]"
          variants={fadeUpSoft}
          transition={transition(DURATION.slow, EASE.dramatic)}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function RoleList({ active }: { active: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const roles = PERSONAL.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentRole = roles[roleIndex];
  const typed = currentRole.slice(0, charCount);
  const isTyping = active && !prefersReducedMotion && (deleting || charCount < currentRole.length);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    const role = roles[roleIndex];
    let delay = 70;

    if (!deleting && charCount === role.length) {
      delay = 2200;
    } else if (deleting && charCount === 0) {
      delay = 320;
    } else if (deleting) {
      delay = 34;
    } else {
      delay = 58 + Math.round(Math.random() * 36);
    }

    const timeout = window.setTimeout(() => {
      if (!deleting && charCount === role.length) {
        setDeleting(true);
        return;
      }

      if (deleting && charCount === 0) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
        return;
      }

      setCharCount((count) => count + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [active, prefersReducedMotion, roleIndex, charCount, deleting, roles]);

  useEffect(() => {
    if (!active || !prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % roles.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [active, prefersReducedMotion, roles.length]);

  return (
    <p
      className={`role-typewriter${isTyping ? " is-typing" : ""}`}
      aria-label={roles.join(", ")}
    >
      <span className="role-typewriter-line">
        <span className="role-typewriter-word">
          {prefersReducedMotion ? currentRole : typed || "\u00A0"}
        </span>
        <span className="role-typewriter-caret" aria-hidden />
      </span>
    </p>
  );
}

export default function HeroSection() {
  const { introComplete } = useIntro();

  return (
    <section
      id="hero"
      className="hero-stage relative flex min-h-screen items-center overflow-hidden border-b border-faint"
    >
      <div className="hero-grid absolute inset-0" aria-hidden />

      <div className="section-container relative z-10 max-w-4xl pt-32 pb-28 lg:pt-40">
        <motion.h1
          className="display-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : {}}
          transition={transition(DURATION.base, EASE.out, 0.15)}
        >
          <SplitName name={PERSONAL.name} active={introComplete} />
        </motion.h1>

        <motion.div
          className="mt-5 md:mt-6"
          initial={{ opacity: 0, y: 24 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={transition(DURATION.slow, EASE.dramatic, 0.55)}
        >
          <RoleList active={introComplete} />
        </motion.div>

        <motion.p
          className="mt-8 max-w-2xl text-base leading-8 text-text-muted md:mt-10 md:text-[1.05rem] md:leading-8"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={introComplete ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={transition(DURATION.slow, EASE.out, 0.85)}
        >
          {PERSONAL.heroSummary}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={transition(DURATION.slow, EASE.out, 1.05)}
        >
          <MagneticButton to="/projects" variant="primary">
            View My Work
          </MagneticButton>
          <MagneticButton href={RESUME.href} external variant="secondary">
            <FileText size={16} />
            View Resume
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
