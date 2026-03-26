"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder to avoid layout shift
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 text-nier-dark hover:text-nier-red hover:bg-nier-dark/5 transition-colors relative group flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={18} strokeWidth={1.5} />
      ) : (
        <Moon size={18} strokeWidth={1.5} />
      )}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-nier-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </button>
  );
}
