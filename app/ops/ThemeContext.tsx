"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

// Real, working light/dark toggle -- scoped deliberately to the account menu and the
// Settings page (both new UI built alongside this toggle), not the whole dashboard.
// The rest of Kanso (Terminal, Company panel, Analytics, Agents Feed, Overlays, Chat)
// is ~5,000 lines of hardcoded dark-only inline styles with no CSS-variable layer --
// converting all of it in one pass would be a real risk to UI that already works
// correctly today, which is explicitly out of scope for this change. If the toggle
// ever needs to cover the full dashboard, that's a separate, much larger pass: give
// every existing panel its own token-based palette first, then wire this same context
// in.
export type Theme = "light" | "dark";

const THEME_KEY = "kanso_theme";

export const THEME_TOKENS = {
  dark: {
    bg: "#18181a",
    surface: "#1f1f21",
    surfaceRaised: "#232326",
    border: "#2d2d31",
    borderSoft: "#27272b",
    text: "#f2f2f5",
    textDim: "#9b9ba3",
    textFaint: "#6e6e77",
    accent: "#4ade80",
    danger: "#ff6666",
    hoverBg: "#2a2a2e",
  },
  light: {
    bg: "#f7f7f8",
    surface: "#ffffff",
    surfaceRaised: "#f0f0f2",
    border: "#e2e2e6",
    borderSoft: "#ececef",
    text: "#18181a",
    textDim: "#5f5f68",
    textFaint: "#8a8a92",
    accent: "#16a34a",
    danger: "#dc2626",
    hoverBg: "#eeeef1",
  },
} as const;

export type ThemeTokens = { [K in keyof typeof THEME_TOKENS.dark]: string };

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  tokens: ThemeTokens;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {
      // No persisted preference available -- stays on the default.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Not persisted this time, but still applies for the rest of this session.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, tokens: THEME_TOKENS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside a ThemeProvider");
  return ctx;
}
