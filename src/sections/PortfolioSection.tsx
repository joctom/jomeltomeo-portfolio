import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import ProtectedImage, { preventImageSave } from "../components/ProtectedImage";
import SectionHeading from "../components/SectionHeading";
import { PORTFOLIO, PORTFOLIO_ALL, PROJECT_FILTERS } from "../data/constants";
import { EASE } from "../utils/motion";

type Project = (typeof PORTFOLIO)[number];

function projectGallery(project: Project) {
  if ("gallery" in project && Array.isArray(project.gallery) && project.gallery.length > 0) {
    return project.gallery;
  }
  return [project.image];
}

function youtubeEmbedSrc(videoId: string) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function isFigmaUrl(url: string) {
  return url.includes("figma.com");
}

function figmaEmbedSrc(url: string) {
  const params = new URLSearchParams({
    embed_host: "share",
    url,
  });
  return `https://www.figma.com/embed?${params.toString()}`;
}

function ProjectMedia({
  project,
  imageSrc,
  galleryIndex = 0,
  galleryCount = 1,
  onPrev,
  onNext,
}: {
  project: Project;
  imageSrc?: string;
  galleryIndex?: number;
  galleryCount?: number;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isPortrait = project.videoFormat === "portrait";
  const showGalleryNav = galleryCount > 1 && onPrev && onNext;
  const displaySrc = imageSrc ?? project.image;

  useEffect(() => {
    setImageLoaded(false);
  }, [displaySrc]);

  const canEmbedLive = Boolean(project.liveUrl) && project.embedLive !== false;

  if (canEmbedLive && project.liveUrl) {
    const embedSrc = isFigmaUrl(project.liveUrl)
      ? figmaEmbedSrc(project.liveUrl)
      : project.liveUrl;

    return (
      <div className="overflow-hidden rounded-t-2xl bg-bg-secondary">
        <div className="aspect-video w-full">
          <iframe
            src={embedSrc}
            title={project.title}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (project.videoId) {
    return (
      <div
        className={`flex justify-center overflow-hidden rounded-t-2xl bg-bg-secondary ${
          isPortrait ? "py-4 md:py-6" : ""
        }`}
      >
        <div
          className={
            isPortrait
              ? "aspect-[9/16] h-[min(68vh,560px)] max-w-full"
              : "aspect-video w-full"
          }
        >
          <iframe
            src={youtubeEmbedSrc(project.videoId)}
            title={project.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`protected-image relative overflow-hidden rounded-t-3xl bg-bg-secondary ${
        showGalleryNav ? "aspect-square sm:aspect-[4/3]" : "aspect-video"
      }`}
      onContextMenu={preventImageSave}
    >
      <motion.div
        className="absolute inset-0 bg-surface"
        initial={{ opacity: 1 }}
        animate={{ opacity: imageLoaded ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />
      <AnimatePresence mode="wait">
        <motion.img
          key={displaySrc}
          src={displaySrc}
          alt={
            showGalleryNav
              ? `${project.title} ${galleryIndex + 1} of ${galleryCount}`
              : project.title
          }
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full ${showGalleryNav ? "object-contain" : "object-cover"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE.out }}
          draggable={false}
          onContextMenu={preventImageSave}
        />
      </AnimatePresence>
      <div className="protected-image-shield" aria-hidden="true" />
      {!showGalleryNav && (
        <div className={`absolute inset-0 z-[2] bg-gradient-to-t ${project.color} to-transparent mix-blend-overlay`} />
      )}
      {showGalleryNav && (
        <>
          <button
            type="button"
            onClick={onPrev}
            className="absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition-transform hover:scale-105"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition-transform hover:scale-105"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
          <span className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
            {galleryIndex + 1} / {galleryCount}
          </span>
        </>
      )}
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const images = projectGallery(project);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    setGalleryIndex(0);
  }, [project.id]);

  const goTo = (next: number) => {
    setGalleryIndex((next + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length < 2) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setGalleryIndex((index) => (index - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setGalleryIndex((index) => (index + 1) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-4 pt-24 md:p-8 md:pt-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, pointerEvents: "auto" }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-overlay-heavy backdrop-blur-sm" />
      <motion.div
        className="card-surface relative z-10 my-auto max-h-[calc(100dvh-7rem)] w-full max-w-3xl overflow-y-auto rounded-2xl"
        initial={{ scale: 0.96, y: 28, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 28, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE.dramatic }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-badge text-fg transition-colors hover:bg-overlay"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <ProjectMedia
          project={project}
          imageSrc={images[galleryIndex]}
          galleryIndex={galleryIndex}
          galleryCount={images.length}
          onPrev={() => goTo(galleryIndex - 1)}
          onNext={() => goTo(galleryIndex + 1)}
        />

        <motion.div
          className="p-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
          }}
        >
          <motion.span
            className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE.out } },
            }}
          >
            {project.category}
          </motion.span>
          <motion.h3
            className="mt-4 text-3xl font-medium text-fg"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.out } },
            }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="mt-3 leading-relaxed text-text-muted"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.out } },
            }}
          >
            {project.description}
          </motion.p>
          <motion.div
            className="mt-6"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.out } },
            }}
          >
            <p className="mb-3 text-sm font-medium text-fg">Tools Used</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-stroke px-3 py-1 text-xs text-text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
          {project.liveUrl && (
            <motion.div
              className="mt-8"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.out } },
              }}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface-hover"
              >
                {isFigmaUrl(project.liveUrl) ? "Open in Figma" : "Visit Live Site"}
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModalPortal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {project ? (
        <ProjectModal key={project.id} project={project} onClose={onClose} />
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export default function PortfolioSection() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeFilter =
    PROJECT_FILTERS.find((filter) => filter.path === pathname) ?? PROJECT_FILTERS[0];

  const projects = useMemo(
    () =>
      activeFilter.category
        ? PORTFOLIO.filter((project) => project.category === activeFilter.category)
        : PORTFOLIO_ALL,
    [activeFilter],
  );

  return (
    <section id="projects" className="section-padding section-surface">
      <div className="section-container">
        <SectionHeading
          label="Projects"
          title="Selected Works"
          subtitle="Choose a discipline to browse the work."
        />

        <div className="skills-filters">
          {PROJECT_FILTERS.map((filter) => {
            const isActive = filter.id === activeFilter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  if (filter.path !== pathname) {
                    navigate(filter.path, { replace: true });
                  }
                }}
                className={`skills-filter ${isActive ? "is-active" : ""}`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="card-surface group cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
                data-cursor
                data-cursor-label={project.videoId ? "Play" : project.liveUrl ? "Open" : "View"}
                data-cursor-variant="hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-subtle">
                  <ProtectedImage
                    src={project.image}
                    alt={project.title}
                    wrapperClassName="h-full w-full"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {project.liveUrl && !project.videoId && (
                    <span className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                        <ArrowUpRight size={18} />
                      </span>
                    </span>
                  )}
                  {project.videoId && (
                    <span className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                      </span>
                    </span>
                  )}
                  <span className="absolute top-3 left-3 z-[3] rounded-md border border-stroke bg-badge px-2.5 py-1 text-[10px] font-medium tracking-wide text-fg uppercase backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-medium text-fg">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-muted">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-stroke px-2 py-0.5 text-[10px] text-text-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModalPortal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
