"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { User, Building2, Bell, Shield, Settings as SettingsIcon } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "preferences", label: "Preferences", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
] as const;

export function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("profile");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam as (typeof tabs)[number]["id"]);
    }
  }, [searchParams]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Settings</h1>
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

      <div className="glass-card transition-fade-in p-4 sm:p-6">
        {activeTab === "profile" && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Profile</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">
                  Display name
                </label>
                <input
                  type="text"
                  defaultValue="Alex Chen"
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Email</label>
                <input
                  type="email"
                  defaultValue="alex@example.com"
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Save
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
                <select className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none">
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
                <select className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none">
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
                <select className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-900/50 px-4 py-3">
                <div>
                  <span className="text-sm text-zinc-200">Dark Mode</span>
                  <p className="text-xs text-zinc-500 mt-0.5">Use dark theme</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-focus:outline-none" />
                </label>
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Save Preferences
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
                defaultValue="Acme Inc"
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Save
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
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-focus:outline-none" />
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Save
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
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Update password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
