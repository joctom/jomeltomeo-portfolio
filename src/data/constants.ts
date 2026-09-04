import resumePdf from "../assets/resume/Jomel-Tomeo_Resume.pdf";
import propertyManagementPreview from "../assets/projects/property-management-preview.png";
import viraPortfolioPreview from "../assets/projects/vira-portfolio-preview.png";
import {
  plagueGothicGallery,
  typographyGallery,
  whimsicalGrannyGallery,
} from "./aiGalleries";

export const RESUME = {
  href: resumePdf,
} as const;

export const PERSONAL = {
  name: "Jomel Tomeo",
  shortName: "Mel.",
  roles: ["Full-Stack Web Developer", "AI Artist", "AI Prompt Engineering","Figma UI/UX Designer", "Video Editor"],
  heroSummary:
    "Full-Stack Web Developer, AI Artist and Figma UI/UX Designer with hands-on experience creating AI-powered visuals, modern web experiences, and engaging digital content. Skilled in prompt engineering, DALL-E, responsive full-stack development, UI/UX prototyping in Figma, and video editing for social media and creative campaigns.",
  tagline:
    "I create AI-powered visuals, modern web experiences, clean UI/UX designs, and engaging digital content.",
  location: "Philippines",
  email: "jomel.tomeo.16@gmail.com",
  linkedin: "https://linkedin.com/in/joctom",
  linkedinHandle: "linkedin.com/in/joctom",
  facebook: "https://www.facebook.com/joctom/",
};

export const NAV_LINKS: { label: string; path: string; menuLabel?: string }[] = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Stacks", path: "/stacks" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

export const ROUTE_SECTIONS: Record<string, string> = {
  "/": "hero",
  "/about": "about",
  "/services": "about",
  "/projects": "projects",
  "/ai": "projects",
  "/web": "projects",
  "/ui-ux": "projects",
  "/video": "projects",
  "/stacks": "stacks",
  "/skills": "stacks",
  "/testimonials": "testimonials",
  "/contact": "contact",
};

export const SECTION_ROUTES = Object.keys(ROUTE_SECTIONS);

export type PortfolioCategory =
  | "AI Arts"
  | "AI Prompt Engineering"
  | "Full-Stack Web Development"
  | "UI/UX Design"
  | "Video Editing";

export const PROJECT_FILTERS = [
  { id: "all", label: "All", path: "/projects", category: null },
  { id: "ai", label: "Images", path: "/ai", category: "AI Arts" as PortfolioCategory },
  { id: "web", label: "Web Dev", path: "/web", category: "Full-Stack Web Development" as PortfolioCategory },
  { id: "ui-ux", label: "UI/UX Design", path: "/ui-ux", category: "UI/UX Design" as PortfolioCategory },
  { id: "video", label: "Video", path: "/video", category: "Video Editing" as PortfolioCategory },
] as const;

export const PROJECT_PATHS = PROJECT_FILTERS.map((filter) => filter.path);

export function isNavActive(path: string, pathname: string) {
  if (path === "/projects") return (PROJECT_PATHS as readonly string[]).includes(pathname);
  return pathname === path;
}

export const SERVICES = [
  {
    icon: "Sparkles",
    title: "AI Art Creation",
    description:
      "Advanced prompt engineering, ChatGPT Pro workflows, DALL-E visual concept generation, digital asset creation, and brand-aligned AI imagery.",
  },
  {
    icon: "Code2",
    title: "Full-Stack Web Development",
    description:
      "Modern responsive websites using HTML, CSS, Tailwind CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, PostgreSQL, Postman, with basic knowledge of Python and Django.",
  },
  {
    icon: "Layout",
    title: "Figma UI/UX Design",
    description:
      "Clean wireframes, functional layouts, interactive prototypes, user-focused interfaces, and visual design systems.",
  },
  {
    icon: "Film",
    title: "Video Editing",
    description:
      "Dynamic social media videos using CapCut, fast-paced editing, transitions, AI-generated overlays, and engaging short-form content.",
  },
  {
    icon: "Palette",
    title: "Graphic Design & Layout",
    description:
      "Creative layouts using Canva, Figma, Adobe Express, and Adobe Photoshop.",
  },
  {
    icon: "PenLine",
    title: "Digital Content Creation",
    description:
      "Scriptwriting, creative content planning, visual storytelling, and social media campaign assets.",
  },
];

const ALL_TAB_CATEGORY_ORDER: PortfolioCategory[] = [
  "Full-Stack Web Development",
  "AI Arts",
  "UI/UX Design",
  "Video Editing",
];

export const PORTFOLIO = [
  {
    id: 10,
    title: "SMS Enabled Residential Property Management System",
    category: "Full-Stack Web Development" as PortfolioCategory,
    description:
      "Progressive web app for Carreon Compound with tenant lifecycle monitoring, SkySMS notifications, rental analytics, and OpenTimestamps verification of payment records.",
    tools: ["React.js", "Node.js", "PostgreSQL", "OpenTimestamps"],
    image: propertyManagementPreview,
    liveUrl: "https://client-evhxtgk3w-jomel-tomeos-projects.vercel.app/",
    embedLive: false,
    color: "from-neutral-700/18 to-stone-600/12",
  },
  {
    id: 6,
    title: "Vira Rosales Portfolio",
    category: "Full-Stack Web Development" as PortfolioCategory,
    description:
      "Designed and developed a responsive, visually engaging portfolio website using Vite React and Tailwind CSS. Focused on mobile-first design, performance optimization, and seamless user experience to showcase creative work.",
    tools: ["React.js", "Framer Motion", "Tailwind CSS"],
    image: viraPortfolioPreview,
    liveUrl: "https://vira-rosales-portfolio.netlify.app/",
    color: "from-neutral-700/18 to-stone-600/12",
  },
  {
    id: 11,
    title: "Typography Art",
    category: "AI Arts" as PortfolioCategory,
    description:
      "Watercolor lettering series that folds New York landmarks, skyline silhouettes, and street life into bold graphic type.",
    tools: ["ChatGPT Pro", "DALL-E", "Prompt Engineering"],
    image: typographyGallery[0],
    gallery: typographyGallery,
    color: "from-stone-700/20 to-stone-600/14",
  },
  {
    id: 12,
    title: "Whimsical Granny Arts",
    category: "AI Arts" as PortfolioCategory,
    description:
      "Character series of joyful elderly figures in watercolor, with consistent styling, festive props, and a sticker-like finish on black.",
    tools: ["ChatGPT Pro", "DALL-E", "Prompt Engineering"],
    image: whimsicalGrannyGallery[0],
    gallery: whimsicalGrannyGallery,
    color: "from-stone-700/20 to-stone-600/14",
  },
  {
    id: 13,
    title: "Plague Gothic",
    category: "AI Arts" as PortfolioCategory,
    description:
      "Dark fantasy character studies blending plague-doctor iconography, weathered leather, and high-contrast atmospheric lighting.",
    tools: ["ChatGPT Pro", "DALL-E", "Prompt Engineering"],
    image: plagueGothicGallery[0],
    gallery: plagueGothicGallery,
    color: "from-stone-700/20 to-stone-600/14",
  },
  {
    id: 8,
    title: "Online Enrollment Management System",
    category: "UI/UX Design" as PortfolioCategory,
    description:
      "Figma UI/UX design for an online enrollment platform with clear student registration flows, course management screens, and admin-friendly layouts.",
    tools: ["Figma", "Prototyping", "Wireframing"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    liveUrl:
      "https://www.figma.com/design/mabjrZYYYEOIObN8KpTT3V/Online-Enrollment-Management-System?node-id=0-1",
    color: "from-stone-600/18 to-neutral-600/12",
  },
  {
    id: 9,
    title: "Restaurant Landing Page",
    category: "UI/UX Design" as PortfolioCategory,
    description:
      "Figma UI/UX design for a restaurant landing page — wireframing layout structure, high-fidelity mockups, and interactive prototyping for menu browsing, reservations, and hero-driven storytelling.",
    tools: ["Figma", "Wireframing", "Prototyping"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    liveUrl:
      "https://www.figma.com/design/iQXwNgQfptK99PFRw81pNr/Restaurant-Landing-Page?node-id=0-1",
    color: "from-stone-600/18 to-neutral-600/12",
  },
  {
    id: 4,
    title: "Documentary Interview",
    category: "Video Editing" as PortfolioCategory,
    description: "Interview-led documentary edit with paced cuts, clean audio, and cinematic framing.",
    tools: ["CapCut", "Color Grading", "Storytelling"],
    image: "https://i.ytimg.com/vi/RDH7g9n3uhU/hqdefault.jpg",
    videoId: "RDH7g9n3uhU",
    videoFormat: "landscape" as const,
    color: "from-neutral-800/20 to-stone-700/14",
  },
  {
    id: 7,
    title: "AI Animated Video",
    category: "Video Editing" as PortfolioCategory,
    description:
      "Vertical AI-animated short: ChatGPT to organize the script and prompts, Grok for text-to-image frames, Kling.AI for image-to-video, and ElevenLabs for the voiceover.",
    tools: ["ChatGPT", "Grok", "Kling.AI", "ElevenLabs"],
    image: "https://i.ytimg.com/vi/VSK1MnTSLds/hq2.jpg",
    videoId: "VSK1MnTSLds",
    videoFormat: "portrait" as const,
    color: "from-neutral-800/20 to-stone-700/14",
  },
];

function categoryRank(category: PortfolioCategory) {
  const index = ALL_TAB_CATEGORY_ORDER.indexOf(category);
  return index === -1 ? ALL_TAB_CATEGORY_ORDER.length : index;
}

export const PORTFOLIO_ALL = [...PORTFOLIO].sort(
  (a, b) => categoryRank(a.category) - categoryRank(b.category),
);

export const SKILL_GROUPS = [
  {
    title: "Full-Stack Web Development",
    role: "Full-Stack Web Developer",
    summary:
      "I ship responsive sites end to end — React on the front, Node or Django on the back, and MongoDB, PostgreSQL, Supabase, or Airtable for data.",
    focus: [
      "Product UI in React, TypeScript, and Tailwind",
      "APIs and server logic in Node, Express, or Django",
      "Data in MongoDB, PostgreSQL, Supabase, or Airtable",
    ],
    skills: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Python",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Node.js",
      "Express.js",
      "Django",
      "MongoDB",
      "PostgreSQL",
      "Supabase",
      "Airtable",
      "Postman",
    ],
    icon: "Terminal",
    color: "from-indigo-500 to-violet-600",
  },
  {
    title: "UI/UX Design",
    role: "UI/UX Designer",
    summary:
      "Figma is the practice — wireframes, layouts, and clickable prototypes before anything gets built.",
    focus: [
      "Interface structure and visual hierarchy in Figma",
      "Prototypes that can be reviewed before development",
    ],
    skills: ["Figma"],
    icon: "Layout",
    color: "from-rose-500 to-orange-500",
  },
  {
    title: "AI & Automation",
    role: "Prompt Engineer / AI Practitioner",
    summary:
      "I use prompt engineering with Claude, Cursor, Lovable, and DALL-E to generate visuals, draft faster, and ship apps from prompts.",
    focus: [
      "AI-generated visuals with DALL-E",
      "Faster writing and coding with Claude and Cursor",
      "App builds from prompts with Lovable",
    ],
    skills: ["Prompt Engineering", "Claude AI", "Cursor AI", "Lovable", "DALL-E"],
    icon: "Brain",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Design Tools",
    role: "Visual Designer",
    summary:
      "Canva, Adobe Express, and Photoshop for campaign graphics, social assets, and image finishing.",
    focus: [
      "Campaign and social layouts in Canva and Adobe Express",
      "Image finishing in Photoshop",
    ],
    skills: ["Canva", "Adobe Express", "Adobe Photoshop"],
    icon: "Palette",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Video Editing",
    role: "Video Editor",
    summary:
      "CapCut for fast social cuts, transitions, and short-form storytelling.",
    focus: ["Short-form edits and platform-ready exports in CapCut"],
    skills: ["CapCut"],
    icon: "Clapperboard",
    color: "from-cyan-500 to-blue-600",
  },
];

export const SKILLS_OVERVIEW = {
  title: "Independent roles",
  summary:
    "These are separate practices, not stages of one job. A project might need web, UI, AI, graphics, or video — sometimes more than one, never as a fixed sequence.",
};

export const AWARDS = [
  {
    title: "Dean's List Multiple Semesters",
    year: "2024, 2025, 2026",
    icon: "Award",
  },
  {
    title: "IT Quiz Bee Champion",
    year: "2024–2025",
    icon: "Trophy",
  },
  {
    title: "Academic Excellence Award",
    year: "2021, 2022, 2023",
    icon: "Star",
  },
  {
    title: "Researcher of the Year",
    year: "2022–2023",
    icon: "BookOpen",
  },
  {
    title: "Cisco Networking Academy Certification / Training",
    year: "Certified",
    icon: "Shield",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the client's needs, goals, and visual direction.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Design",
    description: "Create layouts, wireframes, AI concepts, and visual drafts.",
    icon: "PenTool",
  },
  {
    step: "03",
    title: "Develop",
    description: "Build clean, responsive, and functional digital experiences.",
    icon: "Code",
  },
  {
    step: "04",
    title: "Edit",
    description: "Enhance videos, visuals, transitions, and final creative assets.",
    icon: "Scissors",
  },
  {
    step: "05",
    title: "Deliver",
    description: "Organize, finalize, and present polished outputs with attention to detail.",
    icon: "Rocket",
  },
];

import anniePhoto from "../assets/testimonials/annie.jpg";
import maydrickPhoto from "../assets/testimonials/maydrick.jpg";
import redelPhoto from "../assets/testimonials/redel.jfif";
import reinaPhoto from "../assets/testimonials/reina.jpg";
import viraPhoto from "../assets/testimonials/vira.png";

export const TESTIMONIALS = [
  {
    id: 6,
    quote:
      "I really appreciate how easy he was to work with. It genuinely felt like he took a static design and turned it into a fully functioning, interactive webpage. He also gave consistent updates throughout the process, which made everything feel reassuring. I never felt hesitant asking for changes or additions because he was always kind and accommodating.",
    name: "Love Maydrick",
    role: "Electrical Engineer Student",
    project: "UI/UX Design & Frontend Development",
    image: maydrickPhoto,
  },
  {
    id: 7,
    quote:
      "He constantly checked in to ask for my preferences and made sure my portfolio reflected exactly what I wanted. The updates were consistent and the communication was great. The work he delivered was so impressive that I happily paid extra—it was absolutely worth it.",
    name: "Vira Rosales",
    role: "Senior Instructional Design & Project Manager",
    project: "Portfolio Website",
    image: viraPhoto,
  },
  {
    id: 1,
    quote:
      "Jomel consistently delivers stunning AI-generated visuals that align perfectly with our brand identity. His prompt engineering skills and attention to detail elevated our entire creative workflow at Snize Design.",
    name: "Redel Bautista",
    role: "Graphic Designer",
    project: "AI Art & Brand Imagery",
    image: redelPhoto,
  },
  {
    id: 8,
    quote:
      "Managing Compound manually for years was overwhelming. When he offered to build a property management system, I wasn't sure what to expect, but the result was beyond anything I imagined. He created a platform that handles tenant lifecycle monitoring, rental analytics, and SMS API integration for instant notifications. The Opentimestamps verification feature really stood out to me because it gave me peace of mind knowing my records are securely time-stamped and tamper-proof. He constantly asked for my input and made sure the system worked the way I needed it to. The updates were consistent, and he was always patient with my questions. The final product has completely transformed how I run my property.",
    name: "Annie Carreon",
    role: "Property Owner",
    project: "FULL-STACK WEB DEVELOPMENT",
    image: anniePhoto,
  },
  {
    id: 9,
    quote:
      "He is so nice and easy to work with.",
    name: "Reina Canieda",
    role: "Artist",
    project: "Video Editing",
    image: reinaPhoto,
  },
];
