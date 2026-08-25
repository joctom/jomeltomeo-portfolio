import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { PERSONAL } from "../data/constants";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="About"
          title="Professional Profile"
          subtitle="A multidisciplinary professional combining creative design with technical execution."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <motion.aside
            className="card-surface p-6 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="meta-label mb-2">Name</p>
            <p className="mb-6 text-sm leading-relaxed text-fg">{PERSONAL.name}</p>
            <p className="meta-label mb-2">Location</p>
            <p className="mb-6 text-sm leading-relaxed text-fg">{PERSONAL.location}</p>

            <p className="meta-label mb-3">Core Disciplines</p>
            <ul className="space-y-2">
              {PERSONAL.roles.map((role) => (
                <li
                  key={role}
                  className="text-sm text-text-muted before:mr-2 before:text-accent-light before:content-['—']"
                >
                  {role}
                </li>
              ))}
            </ul>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-5 text-sm leading-7 text-text-muted md:text-base">
              <p>
                I work at the intersection of artificial intelligence, visual design, and modern web
                development, with hands-on experience across multiple digital disciplines. My
                practice covers prompt engineering, interface design, and full-stack execution for
                brands and creative teams.
              </p>
              <p>
                From AI-generated art and advanced prompt workflows to responsive web applications,
                Figma UI/UX prototypes, and video content, I bring a multidisciplinary approach to
                every project.
              </p>
              <p>
                My experience spans AI art creation, prompt engineering, UI/UX layout design, video
                editing, full-stack web development, digital asset organization, and office coordination.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "4+", label: "Disciplines" },
                { value: "7+", label: "Projects" },
                { value: "5+", label: "Awards" },
                { value: "2+", label: "Years Exp." },
              ].map((stat) => (
                <div key={stat.label} className="card-surface px-4 py-5 text-center">
                  <p className="text-2xl font-medium text-fg">{stat.value}</p>
                  <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
