type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-zinc-700/80 text-zinc-200 border-zinc-600",
  success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
  warning: "bg-amber-500/20 text-amber-400 border-amber-500/40",
  error: "bg-rose-500/20 text-rose-400 border-rose-500/40",
  info: "bg-blue-500/20 text-blue-400 border-blue-500/40",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
