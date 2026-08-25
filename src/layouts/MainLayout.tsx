import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import IntroOverlay from "../components/IntroOverlay";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IntroProvider } from "../context/IntroContext";
import { scrollToRoute } from "../utils/smoothScroll";

function RouteScrollSync() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const instant = isInitialLoad.current;
    isInitialLoad.current = false;

    // Clicks scroll immediately from the nav. This effect only handles
    // first paint / deep links and the browser back/forward buttons.
    if (!instant && navigationType !== "POP") return;

    const timer = window.setTimeout(() => {
      scrollToRoute(pathname, instant);
    }, instant ? 50 : 0);

    return () => window.clearTimeout(timer);
  }, [pathname, navigationType]);

  return null;
}

export default function MainLayout() {
  return (
    <IntroProvider>
      <div className="relative">
        <AnimatedBackground />
        <IntroOverlay />
        <Navbar />
        <main className="relative z-0">
          <Outlet />
        </main>
        <Footer />
        <RouteScrollSync />
      </div>
    </IntroProvider>
  );
}
