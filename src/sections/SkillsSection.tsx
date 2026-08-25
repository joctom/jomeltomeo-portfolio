import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AmpersandMark from "../components/AmpersandMark";
import SectionHeading from "../components/SectionHeading";
import SkillChip from "../components/SkillChip";
import { SKILL_GROUPS, SKILLS_OVERVIEW } from "../data/constants";

const FILTER_LABELS: Record<string, string> = {
  "Full-Stack Web Development": "Web Dev",
};

const FILTERS = [
  { id: "All", label: "All" },
  ...SKILL_GROUPS.map((group) => ({
    id: group.title,
    label: FILTER_LABELS[group.title] ?? group.title,
  })),
] as const;

const ALL_SKILLS = SKILL_GROUPS.flatMap((group) =>
  group.skills.map((skill) => ({ skill, category: group.title })),
);

function withAmpersandMark(text: string): ReactNode {
  if (!text.includes("&")) return text;
  return text.split("&").map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 && (
        <>
          <span className="sr-only">&</span>
          <AmpersandMark className="skills-flow-amp-mark" />
        </>
      )}
      {part}
    </span>
  ));
}

export default function SkillsSection() {
  const [active, setActive] = useState<(typeof FILTERS)[number]["id"]>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? ALL_SKILLS
        : ALL_SKILLS.filter((item) => item.category === active),
    [active],
  );

  const activeGroup = SKILL_GROUPS.find((group) => group.title === active);
  const sparseGrid = filtered.length > 0 && filtered.length <= 3;

  return (
    <section id="stacks" className="section-padding section-surface">
      <div className="section-container">
        <SectionHeading
          label="Stacks"
          title="Tools & Expertise"
          subtitle="The software stack and technologies I use to get work done."
        />

        <div className="skills-layout">
          <div className="skills-main">
            <div className="skills-filters">
              {FILTERS.map((filter) => {
                const isActive = active === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActive(filter.id)}
                    className={`skills-filter ${isActive ? "is-active" : ""}`}
                    aria-pressed={isActive}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <motion.div className={`skills-grid${sparseGrid ? " is-sparse" : ""}`}>
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <SkillChip key={item.skill} name={item.skill} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <aside className="skills-flow">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="skills-flow-body"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {active === "All" ? (
                  <>
                    <div className="skills-flow-head">
                      <div className="skills-flow-kicker">
                        <p className="meta-label">Roles</p>
                        <span className="skills-flow-count">
                          {String(SKILL_GROUPS.length).padStart(2, "0")} disciplines
                        </span>
                      </div>
                      <h3 className="skills-flow-title">{SKILLS_OVERVIEW.title}</h3>
                      <p className="skills-role-lead">{SKILLS_OVERVIEW.summary}</p>
                    </div>
                    <ul className="skills-roles">
                      {SKILL_GROUPS.map((group) => (
                        <li key={group.title}>
                          <button
                            type="button"
                            className="skills-role-row"
                            onClick={() => setActive(group.title)}
                          >
                            <span className="skills-role-name">
                              {FILTER_LABELS[group.title] ?? group.title}
                            </span>
                            <span className="skills-role-title">{group.role}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <div className="skills-flow-head">
                      <div className="skills-flow-kicker">
                        <p className="meta-label">Role</p>
                      </div>
                      <h3 className="skills-flow-title">{withAmpersandMark(activeGroup?.title ?? "")}</h3>
                      <p className="skills-flow-tool">{activeGroup?.role}</p>
                    </div>
                    <p className="skills-role-lead">{activeGroup?.summary}</p>
                    <ul className="skills-focus">
                      {activeGroup?.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="skills-role-tools">
                      {activeGroup?.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
