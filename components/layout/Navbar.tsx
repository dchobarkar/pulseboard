"use client";

import { Search, Bell, Sun, Moon, User, Menu } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { useState, useEffect } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as "dark" | "light" | null;
      return saved || "dark";
    }
    return "dark";
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const userMenuItems = [
    { label: "Profile", onClick: () => {} },
    { label: "Preferences", onClick: () => {} },
    { label: "Logout", onClick: () => {} },
  ];

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-zinc-800/60 bg-zinc-950/50 px-3 backdrop-blur sm:gap-4 sm:px-4 md:px-6">
      <div className="flex flex-1 items-center gap-2 sm:gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            aria-label="Search"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <Dropdown
          trigger={
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/30 text-indigo-300 ring-1 ring-indigo-500/30">
              <User className="h-4 w-4" />
            </span>
          }
          items={userMenuItems}
          align="right"
        />
      </div>
    </header>
  );
}
