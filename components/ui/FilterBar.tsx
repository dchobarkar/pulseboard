import { ReactNode } from "react";

interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

const FilterBar = ({ children, className = "" }: FilterBarProps) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {children}
    </div>
  );
};

interface FilterSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  className?: string;
}

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "All",
  className = "",
}: FilterSelectProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <label className="text-xs text-zinc-400 whitespace-nowrap">
          {label}:
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-zinc-700/60 bg-zinc-900/50 px-3 py-1.5 text-xs sm:text-sm text-white focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { FilterBar, FilterSelect };
