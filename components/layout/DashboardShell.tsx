"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useKeyboardShortcuts({
    onShowShortcuts: () => {
      // Trigger the shortcuts dropdown by simulating a click on the button
      if (typeof window !== "undefined") {
        const shortcutsButton = document.querySelector('[aria-label="Keyboard shortcuts"]') as HTMLButtonElement | null;
        if (shortcutsButton) {
          shortcutsButton.click();
        }
      }
    },
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onShowShortcuts={() => {
            // This will be called when shortcuts button is clicked
            // The actual opening is handled by Navbar's internal state
          }}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
