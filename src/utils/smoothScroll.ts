import { ROUTE_SECTIONS } from "../data/constants";

let activeScrollFrame: number | null = null;

export const NAV_OFFSET = 100;
export const SCROLL_DURATION = 420;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function smoothScrollTo(targetY: number, duration = SCROLL_DURATION) {
  if (activeScrollFrame !== null) {
    cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = null;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  if (Math.abs(distance) < 2) return;

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      activeScrollFrame = requestAnimationFrame(step);
    } else {
      activeScrollFrame = null;
    }
  }

  // Move in the same click frame so the page responds before React paints.
  step(startTime + 16);
}

export function scrollToSection(
  sectionId: string,
  offset = NAV_OFFSET,
  duration = SCROLL_DURATION,
  instant = false,
) {
  if (sectionId === "hero") {
    if (instant) window.scrollTo(0, 0);
    else smoothScrollTo(0, duration);
    return;
  }

  const el = document.getElementById(sectionId);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  if (instant) window.scrollTo(0, top);
  else smoothScrollTo(top, duration);
}

export function scrollToRoute(path: string, instant = false) {
  const sectionId = ROUTE_SECTIONS[path] ?? "hero";
  scrollToSection(sectionId, NAV_OFFSET, SCROLL_DURATION, instant);
}
