import type { CSSProperties } from "react";
import ampersandMark from "../assets/ampersand.png";

export default function AmpersandMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`heading-amp-mark ${className}`.trim()}
      style={
        {
          WebkitMaskImage: `url(${ampersandMark})`,
          maskImage: `url(${ampersandMark})`,
        } as CSSProperties
      }
      aria-hidden
    />
  );
}
