import { useState, useEffect, type MouseEvent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { isNavActive, NAV_LINKS } from "../data/constants";
import { scrollToRoute } from "../utils/smoothScroll";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const handleNavigate = (path: string) => {
    setMobileOpen(false);
    scrollToRoute(path);
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") event.preventDefault();
    handleNavigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group relative px-2 py-2 text-[12px] font-medium tracking-wide whitespace-nowrap transition-colors duration-300 xl:px-3 xl:text-[13px] ${
      isActive ? "text-fg" : "text-text-muted hover:text-fg-secondary"
    }`;

  return (
    <>
      <motion.header
        className="pointer-events-none fixed top-0 right-0 left-0 z-50 px-4 pt-5 md:px-6 md:pt-6"
        initial={{ y: -28, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <nav
          className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-500 md:px-4 md:py-3 ${
            scrolled ? "nav-bar-scrolled" : "nav-bar"
          }`}
        >
          <Link
            to="/"
            onClick={handleHomeClick}
            className="group shrink-0"
            data-cursor
            data-cursor-label="Home"
          >
            <span className="brand-mark" aria-label="Mel.">
              <span className="brand-mark-name">Mel</span>
              <span className="brand-mark-dot" aria-hidden />
            </span>
          </Link>

          <ul className="hidden items-center lg:flex">
            {NAV_LINKS.map((link, i) => (
              <li key={link.path} className="flex items-center">
                {i > 0 && <span className="mx-1 h-3 w-px bg-divider" aria-hidden />}
                <NavLink
                  to={link.path}
                  onClick={() => handleNavigate(link.path)}
                  className={() =>
                    navLinkClass({ isActive: isNavActive(link.path, pathname) })
                  }
                >
                  {() => {
                    const isActive = isNavActive(link.path, pathname);
                    return (
                      <>
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.span
                            className="absolute bottom-1 left-3 right-3 h-px origin-left bg-accent/70"
                            layoutId="activeNav"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="absolute bottom-1 left-3 right-3 h-px scale-x-0 bg-stroke-strong opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                      </>
                    );
                  }}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                onClick={() => handleNavigate("/contact")}
                className="group hidden items-center gap-2 rounded-xl border border-stroke bg-surface px-4 py-2 text-sm font-medium text-fg transition-all duration-300 hover:border-accent/25 hover:bg-accent/5 xl:inline-flex"
                data-cursor
                data-cursor-label="Connect"
                data-cursor-variant="magnetic"
              >
                <span>Get in touch</span>
                <ArrowUpRight
                  size={14}
                  className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-stroke bg-surface text-fg transition-colors hover:border-stroke-strong hover:bg-surface-hover lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-overlay backdrop-blur-md lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="nav-mobile-panel fixed top-[5.5rem] right-4 left-4 z-50 overflow-hidden rounded-2xl border backdrop-blur-2xl lg:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <div className="border-b border-subtle px-5 py-4">
                <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase">Navigation</p>
                <p className="mt-1 text-sm text-fg-secondary">Jump to a discipline</p>
              </div>

              <ul className="p-3">
                {NAV_LINKS.map((link, i) => {
                  const isActive = isNavActive(link.path, pathname);
                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => handleNavigate(link.path)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors ${
                          isActive
                            ? "bg-accent/10 text-fg"
                            : "text-text-muted hover:bg-surface hover:text-fg"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-accent/80">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-medium">{link.menuLabel ?? link.label}</span>
                        </span>
                        {isActive && (
                          <span className="accent-dot h-1.5 w-1.5 rounded-full" />
                        )}
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="border-t border-subtle p-3">
                <Link
                  to="/contact"
                  onClick={() => handleNavigate("/contact")}
                  className="flex items-center justify-between rounded-xl border border-stroke bg-surface px-4 py-3.5 text-fg"
                >
                  <span className="font-medium">Get in touch</span>
                  <ArrowUpRight size={16} className="text-accent-light" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
