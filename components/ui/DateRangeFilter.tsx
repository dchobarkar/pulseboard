"use client";

interface DateRangeOption {
  label: string;
  value: string;
}

interface DateRangeFilterProps {
  options: readonly DateRangeOption[] | DateRangeOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DateRangeFilter({
  options,
  selectedValue,
  onChange,
  className = "",
}: DateRangeFilterProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-lg border px-3 py-1.5 text-xs sm:text-sm transition-colors ${
            selectedValue === option.value
              ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
              : "border-zinc-700/60 bg-zinc-900/50 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
