import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { TESTIMONIALS } from "../data/constants";

function ClientAvatar({ name, image }: { name: string; image?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-accent/25 bg-gradient-to-br from-accent/20 to-accent/10 text-sm font-medium text-accent-light">
      {image ? (
        <img src={image} alt="" className="h-full w-full object-cover" draggable={false} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">{initials}</div>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  const goTo = (index: number) => {
    setActive((index + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="section-container relative">
        <SectionHeading
          label="Testimonials"
          title="Client Recommendations"
          subtitle="What clients and collaborators say about working together."
        />

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            className="glass relative overflow-hidden rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Quote
              size={64}
              className="absolute top-6 right-6 text-accent/10 md:top-8 md:right-8"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6">
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light">
                    {current.project}
                  </span>
                </div>

                <blockquote className="mb-8 text-lg leading-relaxed text-fg-secondary md:text-2xl md:leading-relaxed">
                  "{current.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <ClientAvatar name={current.name} image={current.image} />
                  <div>
                    <p className="text-lg font-medium text-fg">{current.name}</p>
                    <p className="text-sm text-text-muted">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between border-t border-subtle pt-8">
              <button
                onClick={() => goTo(active - 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-stroke text-text-muted transition-all hover:border-accent/25 hover:bg-accent/10 hover:text-fg"
                aria-label="Previous testimonial"
                data-cursor
                data-cursor-label="Explore"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-8 bg-accent"
                        : "w-2 bg-fg-subtle hover:bg-border-stroke-strong"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(active + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-stroke text-text-muted transition-all hover:border-accent/25 hover:bg-accent/10 hover:text-fg"
                aria-label="Next testimonial"
                data-cursor
                data-cursor-label="Explore"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
