import { motion } from "framer-motion";
import { Mail, Link2, FileText, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { PERSONAL, RESUME } from "../data/constants";

const contactItems: {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  action: string;
  href: string;
  cursorLabel: string;
  external?: boolean;
}[] = [
  {
    icon: Mail,
    label: "Email",
    title: PERSONAL.email,
    description: "Opens Gmail to send a message",
    action: "Send email",
    href: `mailto:${PERSONAL.email}`,
    cursorLabel: "Send",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    title: "Connect on LinkedIn",
    description: "Let's connect professionally",
    action: "Get in touch",
    href: PERSONAL.linkedin,
    cursorLabel: "Contact",
    external: true,
  },
  {
    icon: FileText,
    label: "Resume",
    title: "View Resume",
    description: "PDF version of my experience and credentials",
    action: "View PDF",
    href: RESUME.href,
    cursorLabel: "View",
    external: true,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10 max-w-5xl">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          subtitle="Reach out directly for collaborations, project inquiries, or creative opportunities."
          align="center"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.label}
                className="card-surface flex min-h-[260px] flex-col p-6 transition-colors duration-300 hover:border-stroke hover:bg-surface md:p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="icon-box mb-4 h-10 w-10">
                  <Icon size={18} className="text-accent-light" />
                </div>

                <p className="meta-label mb-2">{item.label}</p>

                <h3 className="mb-3 text-sm font-semibold leading-relaxed text-fg md:text-base">
                  {item.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>

                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent-light transition-colors hover:text-fg"
                  data-cursor
                  data-cursor-label={item.cursorLabel}
                >
                  {item.action}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
