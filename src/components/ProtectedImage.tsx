import type { DragEvent, ImgHTMLAttributes, MouseEvent } from "react";

export function preventImageSave(event: MouseEvent | DragEvent) {
  event.preventDefault();
}

export const protectedImageAttrs = {
  draggable: false as const,
  onContextMenu: preventImageSave,
  onDragStart: preventImageSave,
};

type ProtectedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

export default function ProtectedImage({
  className,
  wrapperClassName = "",
  ...props
}: ProtectedImageProps) {
  return (
    <div
      className={`protected-image ${wrapperClassName}`.trim()}
      onContextMenu={preventImageSave}
    >
      <img {...props} {...protectedImageAttrs} className={className} />
      <div className="protected-image-shield" aria-hidden="true" />
    </div>
  );
}
