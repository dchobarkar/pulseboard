"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({ trigger, items, align = "right", className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="focus:outline-none"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {trigger}
      </button>
      {open && (
        <div
          className={`absolute top-full z-50 mt-2 min-w-[160px] rounded-lg border border-zinc-700/60 bg-zinc-900/95 py-1 shadow-xl backdrop-blur transition-opacity ${align === "right" ? "right-0" : "left-0"}`}
          role="menu"
        >
          {items.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                role="menuitem"
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                role="menuitem"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
