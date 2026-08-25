import { siFacebook } from "simple-icons";

export default function FacebookIcon({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path fill="currentColor" d={siFacebook.path} />
    </svg>
  );
}
