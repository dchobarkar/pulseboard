"use client";

import { useState, ReactNode } from "react";

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ content, children, position = "top" }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 ${positionClasses[position]} whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1 text-xs text-zinc-200 shadow-lg border border-zinc-700/60 pointer-events-none`}
        >
          {content}
          <div
            className={`absolute ${
              position === "top"
                ? "top-full left-1/2 -translate-x-1/2 border-t-zinc-700/60 border-l-transparent border-r-transparent border-b-transparent"
                : position === "bottom"
                  ? "bottom-full left-1/2 -translate-x-1/2 border-b-zinc-700/60 border-l-transparent border-r-transparent border-t-transparent"
                  : position === "left"
                    ? "left-full top-1/2 -translate-y-1/2 border-l-zinc-700/60 border-t-transparent border-b-transparent border-r-transparent"
                    : "right-full top-1/2 -translate-y-1/2 border-r-zinc-700/60 border-t-transparent border-b-transparent border-l-transparent"
            } border-4`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
