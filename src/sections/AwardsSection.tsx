import { GlassCard } from "../components/SectionHeading";
import { AWARDS } from "../data/constants";
import {
  Award as AwardIcon,
  Trophy,
  Star as StarIcon,
  BookOpen,
  Shield,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const awardIconMap: Record<string, LucideIcon> = {
  Award: AwardIcon,
  Trophy,
  Star: StarIcon,
  BookOpen,
  Shield,
};

export function AwardsSection() {
  return (
    <section id="awards" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="Achievements"
          title="Awards & Recognition"
          subtitle="Academic honors, competitions, and professional certifications."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((award, i) => {
            const Icon = awardIconMap[award.icon] || AwardIcon;
            return (
              <GlassCard key={award.title} delay={i * 0.06} cursorLabel="View">
                <div className="flex items-start gap-4">
                  <div className="icon-box h-10 w-10 shrink-0 text-accent">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold leading-snug text-fg">
                      {award.title}
                    </h3>
                    <p className="mt-2 text-xs text-text-muted">{award.year}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
