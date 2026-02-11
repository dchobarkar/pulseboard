"use client";

import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  placeholder = "Search...",
  className = "",
  ...props
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/50 pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors"
        {...props}
      />
    </div>
  );
}
