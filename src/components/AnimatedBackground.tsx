import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SHAPES: {
  id: string;
  className: string;
  duration: number;
  delay: number;
  path: string;
  strokeVar: string;
  strokeDasharray?: string;
  strokeWidth?: number;
  parallax: number;
}[] = [
  {
    id: "hex-1",
    className: "top-[12%] left-[8%] h-24 w-24 md:h-32 md:w-32",
    duration: 28,
    delay: 0,
    path: "M50 4 L96 27 L96 73 L50 96 L4 73 L4 27 Z",
    strokeVar: "--color-shape-1",
    parallax: 24,
  },
  {
    id: "ring-1",
    className: "top-[18%] right-[12%] h-28 w-28 md:h-36 md:w-36",
    duration: 22,
    delay: 2,
    path: "M50 8 A42 42 0 1 1 49.9 8",
    strokeVar: "--color-shape-2",
    strokeDasharray: "8 12",
    parallax: 18,
  },
  {
    id: "tri-1",
    className: "bottom-[28%] left-[15%] h-20 w-20 md:h-28 md:w-28",
    duration: 24,
    delay: 1,
    path: "M50 6 L94 88 L6 88 Z",
    strokeVar: "--color-shape-3",
    parallax: 30,
  },
  {
    id: "diamond-1",
    className: "bottom-[20%] right-[18%] h-22 w-22 md:h-30 md:w-30",
    duration: 26,
    delay: 3,
    path: "M50 4 L96 50 L50 96 L4 50 Z",
    strokeVar: "--color-shape-1",
    parallax: 20,
  },
  {
    id: "cross-1",
    className: "top-[48%] left-[42%] h-16 w-16 md:h-20 md:w-20",
    duration: 20,
    delay: 4,
    path: "M50 10 L50 90 M10 50 L90 50",
    strokeVar: "--color-shape-3",
    strokeWidth: 1,
    parallax: 14,
  },
  {
    id: "hex-2",
    className: "top-[55%] right-[8%] h-20 w-20 md:h-24 md:w-24",
    duration: 30,
    delay: 5,
    path: "M50 4 L96 27 L96 73 L50 96 L4 73 L4 27 Z",
    strokeVar: "--color-shape-2",
    parallax: 22,
  },
];

const NODES = [
  { x: 12, y: 20 },
  { x: 28, y: 35 },
  { x: 45, y: 18 },
  { x: 62, y: 42 },
  { x: 78, y: 25 },
  { x: 88, y: 55 },
  { x: 35, y: 62 },
  { x: 55, y: 72 },
  { x: 72, y: 68 },
  { x: 18, y: 78 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [1, 6],
  [6, 7],
  [7, 8],
  [8, 5],
  [0, 9],
  [9, 6],
  [3, 7],
];

function FloatingGeometry({
  className,
  path,
  strokeVar,
  duration,
  delay,
  strokeDasharray,
  strokeWidth = 1.5,
  parallax,
  mouseX,
  mouseY,
}: {
  className: string;
  path: string;
  strokeVar: string;
  duration: number;
  delay: number;
  strokeDasharray?: string;
  strokeWidth?: number;
  parallax: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const x = useTransform(mouseX, [-0.5, 0.5], [-parallax, parallax]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-parallax * 0.6, parallax * 0.6]);

  return (
    <motion.div className={`absolute opacity-50 ${className}`} style={{ x, y }}>
      <motion.div
        animate={{
          rotate: [0, 360],
          y: [0, -18, 8, 0],
        }}
        transition={{
          rotate: { duration, repeat: Infinity, ease: "linear" },
          y: { duration: duration * 0.6, delay, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <path
            d={path}
            stroke={`var(${strokeVar})`}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const auroraX = useTransform(smoothX, [-0.5, 0.5], ["42%", "58%"]);
  const auroraY = useTransform(smoothY, [-0.5, 0.5], ["38%", "52%"]);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(event.clientX / window.innerWidth - 0.5);
        mouseY.set(event.clientY / window.innerHeight - 0.5);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
      aria-hidden
    >
      <motion.div
        className="bg-aurora bg-aurora-primary"
        style={{ left: auroraX, top: auroraY }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-aurora bg-aurora-secondary"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.12, 0.96, 1],
          opacity: [0.28, 0.42, 0.32, 0.28],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        className="absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <pattern
            id="geo-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--color-grid)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geo-grid)" />
      </motion.svg>

      <motion.svg
        className="absolute inset-0 h-full w-full opacity-35"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {CONNECTIONS.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="var(--color-shape-1)"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
            transition={{
              pathLength: { duration: 2, delay: i * 0.15 },
              opacity: { duration: 4, delay: i * 0.2, repeat: Infinity },
            }}
          />
        ))}
        {NODES.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="0.35"
            fill="var(--color-accent-light)"
            animate={{ opacity: [0.2, 0.55, 0.2], r: [0.3, 0.42, 0.3] }}
            transition={{
              duration: 3 + (i % 3),
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.svg>

      <motion.div
        className="absolute top-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/15 to-transparent"
        animate={{ opacity: [0.15, 0.45, 0.15], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {SHAPES.map((shape) => (
        <FloatingGeometry
          key={shape.id}
          className={shape.className}
          path={shape.path}
          strokeVar={shape.strokeVar}
          duration={shape.duration}
          delay={shape.delay}
          strokeDasharray={shape.strokeDasharray}
          strokeWidth={shape.strokeWidth ?? 1.5}
          parallax={shape.parallax}
          mouseX={smoothX}
          mouseY={smoothY}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg)_72%)]" />
      <div className="bg-vignette" />
      <div className="bg-grain" />
    </div>
  );
}
