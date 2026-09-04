import type { SimpleIcon } from "simple-icons";
import {
  siAirtable,
  siClaude,
  siCss,
  siCursor,
  siDjango,
  siExpress,
  siFigma,
  siHtml5,
  siJavascript,
  siMongodb,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import adobeLogo from "../assets/skills/adobe.svg";
import canvaLogo from "../assets/skills/canva.svg";
import capcutLogo from "../assets/skills/capcut.svg";
import lovableLogo from "../assets/skills/lovable.svg";
import openaiLogo from "../assets/skills/openai.svg";
import photoshopLogo from "../assets/skills/photoshop.svg";

export type LucideSkillName = "Sparkles";

export type SkillVisual =
  | { type: "simple"; icon: SimpleIcon; color: string; ink: boolean }
  | { type: "image"; src: string; color: string; ink: boolean }
  | { type: "lucide"; name: LucideSkillName; color: string };

function isInk(hex: string) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 72;
}

function fromSimple(icon: SimpleIcon): SkillVisual {
  return {
    type: "simple",
    icon,
    color: `#${icon.hex}`,
    ink: isInk(icon.hex),
  };
}

function fromImage(src: string, color: string, ink = false): SkillVisual {
  return { type: "image", src, color, ink: ink || isInk(color) };
}

export const SKILL_VISUALS: Record<string, SkillVisual> = {
  "Claude AI": fromSimple(siClaude),
  "Cursor AI": fromSimple(siCursor),
  Lovable: fromImage(lovableLogo, "#FF66F4"),
  "ChatGPT Pro": fromImage(openaiLogo, "#10A37F"),
  "DALL-E": fromImage(openaiLogo, "#10A37F"),
  "Prompt Engineering": { type: "lucide", name: "Sparkles", color: "#800020" },
  Figma: fromSimple(siFigma),
  Canva: fromImage(canvaLogo, "#00C4CC"),
  "Adobe Express": fromImage(adobeLogo, "#FF0000"),
  "Adobe Photoshop": fromImage(photoshopLogo, "#31A8FF"),
  CapCut: fromImage(capcutLogo, "#111111", true),
  TypeScript: fromSimple(siTypescript),
  HTML: fromSimple(siHtml5),
  CSS: fromSimple(siCss),
  "Tailwind CSS": fromSimple(siTailwindcss),
  Python: fromSimple(siPython),
  JavaScript: fromSimple(siJavascript),
  "React.js": fromSimple(siReact),
  "Node.js": fromSimple(siNodedotjs),
  "Express.js": fromSimple(siExpress),
  Django: fromSimple(siDjango),
  MongoDB: fromSimple(siMongodb),
  PostgreSQL: fromSimple(siPostgresql),
  Supabase: fromSimple(siSupabase),
  Airtable: fromSimple(siAirtable),
  Postman: fromSimple(siPostman),
};

export function getSkillVisual(name: string): SkillVisual | undefined {
  return SKILL_VISUALS[name];
}
