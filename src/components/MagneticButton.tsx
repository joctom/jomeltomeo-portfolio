import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { scrollToRoute } from "../utils/smoothScroll";

const MotionLink = motion.create(Link);

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  to?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  download?: boolean | string;
  external?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  to,
  variant = "primary",
  type = "button",
  download,
  external,
}: MagneticButtonProps) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  };

  const baseClass = `btn-magnetic inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 420, damping: 20 },
  };

  if (to) {
    return (
      <MotionLink
        to={to}
        className={baseClass}
        onClick={() => {
          onClick?.();
          scrollToRoute(to);
        }}
        {...motionProps}
      >
        <span className="btn-shine" aria-hidden />
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        {...motionProps}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
        download={download}
      >
        <span className="btn-shine" aria-hidden />
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClass}
      {...motionProps}
    >
      <span className="btn-shine" aria-hidden />
      {children}
    </motion.button>
  );
}
