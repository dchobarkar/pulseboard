import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const Card = ({ children, className = "", padding = "md" }: CardProps) => {
  const paddingStyles = {
    sm: "p-3",
    md: "p-4",
    lg: "p-5 sm:p-6",
  };

  return (
    <div
      className={`glass-card transition-fade-in ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

const CardHeader = ({
  title,
  description,
  actions,
  className = "",
}: CardHeaderProps) => {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`}>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-zinc-300">{title}</h3>
        {description && (
          <p className="mt-1 text-xs text-zinc-500">{description}</p>
        )}
      </div>
      {actions && <div className="ml-4">{actions}</div>}
    </div>
  );
};

export default Card;
export { CardHeader };
