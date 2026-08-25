import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface IntroContextValue {
  introComplete: boolean;
  completeIntro: () => void;
}

const IntroContext = createContext<IntroContextValue | null>(null);

const INTRO_KEY = "portfolio-intro-seen";

function getIntroSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(getIntroSeen);

  const completeIntro = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const value = useMemo(
    () => ({ introComplete, completeIntro }),
    [introComplete, completeIntro],
  );

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within IntroProvider");
  }
  return context;
}
