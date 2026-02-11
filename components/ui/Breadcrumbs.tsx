"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTE_LABELS } from "@/data/constants";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/" },
    ...paths.map((path, index) => {
      const fullPath = "/" + paths.slice(0, index + 1).join("/");
      return {
        label: ROUTE_LABELS[fullPath] || path.charAt(0).toUpperCase() + path.slice(1),
        href: index < paths.length - 1 ? fullPath : undefined,
      };
    }),
  ];

  return (
    <nav className="flex items-center gap-1 text-xs sm:text-sm text-zinc-400">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-zinc-200 transition-colors"
      >
        <Home className="h-3 w-3 sm:h-4 sm:w-4" />
      </Link>
      {breadcrumbs.slice(1).map((crumb) => (
        <div key={crumb.href || crumb.label} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="hover:text-zinc-200 transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-zinc-200">{crumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
