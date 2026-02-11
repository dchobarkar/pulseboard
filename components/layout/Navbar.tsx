"use client";

import { Search, Sun, Moon, User, Menu } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { NotificationsDropdown } from "@/components/ui/NotificationsDropdown";
import { KeyboardShortcutsDropdown } from "@/components/ui/KeyboardShortcutsModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initialNotifications, type Notification } from "@/data/notifications";
import { STORAGE_KEYS } from "@/data/constants";

interface NavbarProps {
  onMenuClick?: () => void;
  onShowShortcuts?: () => void;
}

export function Navbar({ onMenuClick, onShowShortcuts }: NavbarProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME) as "dark" | "light" | null;
      return saved || "dark";
    }
    return "dark";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      // Dispatch custom event for same-tab sync
      window.dispatchEvent(new Event("themechange"));
    }
  }, [theme]);

  // Listen for theme changes from settings page
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) as "dark" | "light" | null;
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.THEME && e.newValue) {
        setTheme(e.newValue as "dark" | "light");
      }
    };

    window.addEventListener("themechange", handleThemeChange);
    window.addEventListener("storage", handleStorageChange);
    
    // Check for theme changes periodically (since same-tab localStorage changes don't trigger storage event)
    const interval = setInterval(handleThemeChange, 100);

    return () => {
      window.removeEventListener("themechange", handleThemeChange);
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [theme]);

  const handleLogout = () => {
    router.push("/logout");
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const userMenuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Preferences", href: "/settings?tab=preferences" },
    { label: "Logout", onClick: handleLogout },
  ];

  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-zinc-800/60 bg-zinc-950/50 px-3 backdrop-blur sm:gap-4 sm:px-4 md:px-6">
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
            placeholder="Search... (Press / or ⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            aria-label="Search"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <KeyboardShortcutsDropdown align="right" />
        {/* Alert Indicator */}
        <button
          type="button"
          onClick={() => {
            // Scroll to top or show alerts
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="relative rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
          title="System alerts"
        >
          <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-zinc-950 animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-rose-400" />
        </button>
        <NotificationsDropdown
          notifications={notifications}
          onDismiss={handleDismissNotification}
          onMarkAllRead={handleMarkAllRead}
          align="right"
        />
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
