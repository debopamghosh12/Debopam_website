import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

type ViewTransitionDocument = Document & {
  startViewTransition: (callback: () => void) => { ready: Promise<void> };
};

function supportsViewTransitions(doc: Document): doc is ViewTransitionDocument {
  return typeof (doc as Partial<ViewTransitionDocument>).startViewTransition === "function";
}

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (originX?: number, originY?: number) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = useCallback(
    (originX?: number, originY?: number) => {
      const next: Theme = theme === "dark" ? "light" : "dark";

      const apply = () => {
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // storage unavailable (private browsing, etc.) — theme just won't persist
        }
        setTheme(next);
      };

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        apply();
        return;
      }

      if (supportsViewTransitions(document)) {
        if (originX !== undefined && originY !== undefined) {
          document.documentElement.style.setProperty(
            "--theme-toggle-x",
            `${originX}px`
          );
          document.documentElement.style.setProperty(
            "--theme-toggle-y",
            `${originY}px`
          );
        }
        document.startViewTransition(apply);
        return;
      }

      // Fallback for browsers without the View Transitions API: a manual
      // opacity crossfade on the app root instead of the circular wipe.
      const root = document.getElementById("root");
      if (!root) {
        apply();
        return;
      }
      root.style.transition = "opacity 0.25s ease";
      root.style.opacity = "0";
      window.setTimeout(() => {
        apply();
        requestAnimationFrame(() => {
          root.style.opacity = "1";
        });
      }, 250);
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
