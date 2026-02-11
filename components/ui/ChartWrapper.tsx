interface ChartWrapperProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartWrapper({
  title,
  children,
  className = "",
}: ChartWrapperProps) {
  return (
    <div className={`glass-card transition-fade-in p-3 sm:p-5 ${className}`}>
      {title && (
        <h3 className="mb-3 sm:mb-4 text-sm font-medium text-zinc-300">{title}</h3>
      )}
      <div className="min-h-[200px] sm:min-h-[240px] overflow-x-auto">{children}</div>
    </div>
  );
}
