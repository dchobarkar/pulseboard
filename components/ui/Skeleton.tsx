"use client";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-zinc-800/50";
  
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label="Loading..."
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-4 sm:p-5">
      <Skeleton className="h-4 w-24 mb-3" variant="text" />
      <Skeleton className="h-8 w-32 mb-2" variant="text" />
      <Skeleton className="h-3 w-20" variant="text" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-4 pb-2 border-b border-zinc-800/60">
        <Skeleton className="h-4 flex-1" variant="text" />
        <Skeleton className="h-4 flex-1" variant="text" />
        <Skeleton className="h-4 flex-1" variant="text" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <Skeleton className="h-4 flex-1" variant="text" />
          <Skeleton className="h-4 flex-1" variant="text" />
          <Skeleton className="h-4 flex-1" variant="text" />
        </div>
      ))}
    </div>
  );
}
