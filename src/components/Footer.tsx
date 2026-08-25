import { motion } from "framer-motion";
import { Link2, Mail } from "lucide-react";
import { PERSONAL } from "../data/constants";
import { EASE, fadeUpSoft, staggerChildren, transition, viewport } from "../utils/motion";
import FacebookIcon from "./FacebookIcon";

export default function Footer() {
  return (
    <footer className="border-t border-subtle bg-bg-secondary">
      <motion.div
        className="section-container section-padding !py-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerChildren(0.08, 0.05)}
      >
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <motion.div variants={fadeUpSoft} transition={transition(0.55, EASE.out)}>
            <p className="text-lg font-semibold text-fg">{PERSONAL.name}</p>
            <p className="mt-1 max-w-md text-sm text-text-muted">
              {PERSONAL.roles.join(" · ")}
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            variants={fadeUpSoft}
            transition={transition(0.55, EASE.out, 0.08)}
          >
            <a
              href={`mailto:${PERSONAL.email}`}
              className="icon-box h-10 w-10 text-text-muted transition-colors hover:border-stroke-strong hover:text-fg"
              aria-label="Email"
              data-cursor
              data-cursor-label="Contact"
            >
              <Mail size={16} />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-box h-10 w-10 text-text-muted transition-colors hover:border-stroke-strong hover:text-fg"
              aria-label="LinkedIn"
              data-cursor
              data-cursor-label="Open"
            >
              <Link2 size={16} />
            </a>
            <a
              href={PERSONAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-box h-10 w-10 text-text-muted transition-colors hover:border-stroke-strong hover:text-fg"
              aria-label="Facebook"
              data-cursor
              data-cursor-label="Connect"
            >
              <FacebookIcon size={16} />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 flex flex-col gap-2 border-t border-subtle pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between"
          variants={fadeUpSoft}
          transition={transition(0.55, EASE.out, 0.14)}
        >
          <p>© {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.</p>
          <p className="text-text-muted/70">Designed with creativity, technology, and motion.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
