"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Keyboard, X } from "lucide-react";

interface KeyboardShortcut {
  keys: string[];
  description: string;
  category: string;
}

interface KeyboardShortcutsDropdownProps {
  align?: "left" | "right";
}

const shortcuts: KeyboardShortcut[] = [
  {
    keys: ["/"],
    description: "Focus search",
    category: "Navigation",
  },
  {
    keys: ["⌘", "K"],
    description: "Focus search (Mac)",
    category: "Navigation",
  },
  {
    keys: ["Ctrl", "K"],
    description: "Focus search (Windows/Linux)",
    category: "Navigation",
  },
  {
    keys: ["G", "U"],
    description: "Go to Users",
    category: "Navigation",
  },
  {
    keys: ["G", "A"],
    description: "Go to Analytics",
    category: "Navigation",
  },
  {
    keys: ["G", "B"],
    description: "Go to Billing",
    category: "Navigation",
  },
  {
    keys: ["G", "R"],
    description: "Go to Reports",
    category: "Navigation",
  },
  {
    keys: ["G", "S"],
    description: "Go to Settings",
    category: "Navigation",
  },
  {
    keys: ["?"],
    description: "Show keyboard shortcuts",
    category: "Help",
  },
];

const groupedShortcuts = shortcuts.reduce(
  (acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  },
  {} as Record<string, KeyboardShortcut[]>,
);

const KeyboardShortcutsDropdown = ({
  align = "right",
}: KeyboardShortcutsDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      // Calculate position
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          right: window.innerWidth - rect.right,
        });
      }
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  const dropdownContent = open ? (
    <div
      ref={dropdownRef}
      className="fixed w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-zinc-700/60 bg-zinc-900/95 shadow-xl backdrop-blur transition-opacity"
      role="menu"
      style={{
        top: `${position.top}px`,
        right: align === "right" ? `${position.right}px` : "auto",
        left: align === "left" ? `${position.right}px` : "auto",
        zIndex: 9999,
        maxHeight: "calc(100vh - 100px)",
      }}
    >
      <div className="flex items-center justify-between border-b border-zinc-800/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-500/10 p-1.5">
            <Keyboard className="h-4 w-4 text-indigo-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Keyboard Shortcuts
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded p-1 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-125 overflow-y-auto p-4">
        <div className="space-y-4">
          {Object.entries(groupedShortcuts).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                {category}
              </h3>
              <div className="space-y-1.5">
                {items.map((shortcut) => (
                  <div
                    key={`${shortcut.category}-${shortcut.description}`}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 px-3 rounded-lg border border-zinc-700/60 bg-zinc-900/50 hover:bg-zinc-900/80 transition-colors"
                  >
                    <span className="text-xs sm:text-sm text-zinc-300 shrink-0">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                      {shortcut.keys.length > 1 ? (
                        <>
                          {shortcut.keys.slice(0, -1).map((key, keyIndex) => (
                            <div
                              key={keyIndex}
                              className="flex items-center gap-1 sm:gap-1.5"
                            >
                              <kbd className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-zinc-700/60 bg-zinc-950/50 text-[10px] sm:text-xs font-medium text-zinc-300 shadow-sm whitespace-nowrap">
                                {key}
                              </kbd>
                              <span className="text-[10px] sm:text-xs text-zinc-500">
                                then
                              </span>
                            </div>
                          ))}
                          <kbd className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-zinc-700/60 bg-zinc-950/50 text-[10px] sm:text-xs font-medium text-zinc-300 shadow-sm whitespace-nowrap">
                            {shortcut.keys[shortcut.keys.length - 1]}
                          </kbd>
                        </>
                      ) : (
                        <kbd className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-zinc-700/60 bg-zinc-950/50 text-[10px] sm:text-xs font-medium text-zinc-300 shadow-sm whitespace-nowrap">
                          {shortcut.keys[0]}
                        </kbd>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-zinc-800/60">
          <p className="text-[10px] sm:text-xs text-zinc-500 text-center">
            Press{" "}
            <kbd className="px-1 sm:px-1.5 py-0.5 rounded border border-zinc-700/60 bg-zinc-950/50 text-[10px] sm:text-xs font-medium text-zinc-400">
              ?
            </kbd>{" "}
            anytime to open this help
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 border border-zinc-700/60 bg-zinc-900/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-indigo-300 transition-colors"
          aria-label="Keyboard shortcuts"
          aria-expanded={open}
        >
          <Keyboard className="h-4 w-4" />
          <span className="hidden sm:inline">Shortcuts</span>
          <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded border border-zinc-700/60 bg-zinc-950/50 text-[10px] font-medium text-zinc-400">
            ?
          </kbd>
        </button>
      </div>
      {typeof window !== "undefined" &&
        createPortal(dropdownContent, document.body)}
    </>
  );
};

export default KeyboardShortcutsDropdown;
