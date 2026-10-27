"use client";

import { useEffect } from "react";

const setTheme = (theme: "light" | "dark") =>
  document.documentElement.setAttribute("data-theme", theme);

/** Sun/moon button that switches between light and dark and remembers the choice. */
export function ThemeToggle() {
  // Until the visitor picks a theme, keep following the device setting as it changes.
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      setTheme(dark.matches ? "dark" : "light");
    };
    dark.addEventListener("change", onChange);
    return () => dark.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // Both icons render; CSS shows the one for the current theme, so server and client markup match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="flex size-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-mist text-heading transition-colors hover:bg-ice"
    >
      <svg className="dark:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="hidden dark:block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
