import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { PERSONAL } from "../data/constants";
import { useIntro } from "../context/IntroContext";
import { DURATION, EASE } from "../utils/motion";

const INTRO_KEY = "portfolio-intro-seen";

function getIntroSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* ignore */
  }
}

export default function IntroOverlay() {
  const { completeIntro } = useIntro();
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(
    () => isHome && !getIntroSeen() && !prefersReducedMotion,
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const skipIntro =
      !isHome || getIntroSeen() || Boolean(prefersReducedMotion);

    if (skipIntro) {
      setVisible(false);
      completeIntro();
      markIntroSeen();
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 2200;
    let frame = 0;

    const tick = (now: number) => {
      const next = Math.min(1, (now - start) / duration);
      setProgress(next);
      if (next < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    const finishTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      completeIntro();
      markIntroSeen();
    }, 2800);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, [completeIntro, prefersReducedMotion, isHome]);

  if (!visible) return null;

  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-hidden
    >
      <motion.div
        className="intro-panel intro-panel-left"
        initial={{ x: 0 }}
        animate={{ x: "-102%" }}
        transition={{ duration: DURATION.cinematic, ease: EASE.expo, delay: 1.55 }}
      />
      <motion.div
        className="intro-panel intro-panel-right"
        initial={{ x: 0 }}
        animate={{ x: "102%" }}
        transition={{ duration: DURATION.cinematic, ease: EASE.expo, delay: 1.55 }}
      />

      <div className="intro-content">
        <motion.p
          className="intro-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE.out, delay: 0.15 }}
        >
          Portfolio
        </motion.p>

        <div className="intro-title-mask">
          <motion.h1
            className="intro-title"
            initial={{ y: "120%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, ease: EASE.dramatic, delay: 0.28 }}
          >
            {PERSONAL.name}
          </motion.h1>
        </div>

        <motion.div
          className="intro-progress-track"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <motion.span
            className="intro-progress-fill"
            style={{ scaleX: progress }}
          />
        </motion.div>

        <motion.p
          className="intro-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          Selected works, crafted with intent
        </motion.p>
      </div>
    </motion.div>
  );
}
