"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { User, Building2, Bell, Shield, Settings as SettingsIcon, ExternalLink } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { DEFAULT_SETTINGS, type SettingsData, SETTINGS_TABS } from "@/data/settings";
import { STORAGE_KEYS } from "@/data/constants";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "preferences", label: "Preferences", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
] as const;

export function SettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("profile");
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const saveMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings((prev) => ({ ...prev, ...parsed }));
        } catch {
          // Silently fail - use default settings
        }
      }
      
      // Load theme from localStorage and sync
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as "dark" | "light" | null;
      if (savedTheme) {
        setSettings((prev) => ({
          ...prev,
          preferences: { ...prev.preferences, theme: savedTheme },
        }));
      }
    }
  }, []);

  // Sync theme with document and localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(settings.preferences.theme);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.THEME, settings.preferences.theme);
    }
  }, [settings.preferences.theme]);

  // Listen for theme changes from navbar
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.THEME && e.newValue) {
        setSettings((prev) => ({
          ...prev,
          preferences: { ...prev.preferences, theme: e.newValue as "dark" | "light" },
        }));
      }
    };

    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) as "dark" | "light" | null;
      if (currentTheme && currentTheme !== settings.preferences.theme) {
        setSettings((prev) => ({
          ...prev,
          preferences: { ...prev.preferences, theme: currentTheme },
        }));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Check for theme changes periodically (since same-tab localStorage changes don't trigger storage event)
    const interval = setInterval(handleThemeChange, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [settings.preferences.theme]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam as (typeof tabs)[number]["id"]);
    }
  }, [searchParams]);

  const handleSave = async (section: keyof SettingsData) => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Save to localStorage
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
        let existing = {};
        try {
          existing = saved ? JSON.parse(saved) : {};
        } catch {
          // If corrupted, start fresh
          existing = {};
        }
        localStorage.setItem(
          STORAGE_KEYS.APP_SETTINGS,
          JSON.stringify({
            ...existing,
            [section]: settings[section],
          })
        );
      }

      setSaveMessage({ type: "success", text: "Settings saved successfully!" });
      saveMessageTimeoutRef.current = setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage({ type: "error", text: "Failed to save settings" });
      saveMessageTimeoutRef.current = setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = settings.preferences.theme === "dark" ? "light" : "dark";
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, theme: newTheme },
    }));
    // Trigger storage event for navbar sync
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
      // Dispatch custom event for same-tab sync
      window.dispatchEvent(new Event("themechange"));
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <Breadcrumbs />
        <h1 className="mt-2 text-xl sm:text-2xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Profile, workspace, and preferences
        </p>
      </div>

      <div className="flex gap-1 rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-1 sm:gap-2 rounded-md px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors sm:flex-initial whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-zinc-800/80 text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {saveMessage && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            saveMessage.type === "success"
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
              : "border-rose-500/50 bg-rose-500/10 text-rose-400"
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      <div className="glass-card transition-fade-in p-4 sm:p-6">
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Profile</h2>
              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-900/50 px-3 py-1.5 text-xs sm:text-sm text-zinc-300 hover:bg-white/5 transition-colors"
              >
                View Full Profile
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Display name
                </label>
                <input
                  type="text"
                  value={settings.profile.displayName}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, displayName: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Email</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, email: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSave("profile")}
              disabled={isSaving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Language
                </label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, language: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Timezone
                </label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, timezone: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                >
                  <option>Pacific Time (PT)</option>
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Date Format
                </label>
                <select
                  value={settings.preferences.dateFormat}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, dateFormat: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-900/50 px-4 py-3">
                <div>
                  <span className="text-sm text-zinc-200">Theme</span>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {settings.preferences.theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.preferences.theme === "dark"}
                    onChange={handleThemeToggle}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-focus:outline-none transition-colors" />
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSave("preferences")}
              disabled={isSaving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        )}

        {activeTab === "workspace" && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Workspace</h2>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Workspace name
              </label>
              <input
                type="text"
                value={settings.workspace.name}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    workspace: { ...prev.workspace, name: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => handleSave("workspace")}
              disabled={isSaving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Notifications</h2>
            <div className="space-y-3">
              {[
                { id: "email", label: "Email notifications" },
                { id: "push", label: "Push notifications" },
                { id: "weekly", label: "Weekly digest" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-900/50 px-4 py-3"
                >
                  <span className="text-sm text-zinc-200">{item.label}</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={settings.notifications[item.id as keyof typeof settings.notifications]}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            [item.id]: e.target.checked,
                          },
                        }))
                      }
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-focus:outline-none" />
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleSave("notifications")}
              disabled={isSaving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Security</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Current password
                </label>
                <input
                  type="password"
                  value={settings.security.currentPassword}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: { ...prev.security, currentPassword: e.target.value },
                    }))
                  }
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  New password
                </label>
                <input
                  type="password"
                  value={settings.security.newPassword}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: { ...prev.security, newPassword: e.target.value },
                    }))
                  }
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                handleSave("security");
                // Clear password fields after save
                setSettings((prev) => ({
                  ...prev,
                  security: { currentPassword: "", newPassword: "" },
                }));
              }}
              disabled={isSaving || !settings.security.currentPassword || !settings.security.newPassword}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Updating..." : "Update password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
