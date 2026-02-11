"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

import Button from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  const router = useRouter();

  useEffect(() => {
    // Log error to error reporting service in production
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="glass-card max-w-md w-full p-6 sm:p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 mb-4">
            <AlertCircle className="h-8 w-8 text-rose-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
            Something went wrong!
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mb-4">
            We encountered an unexpected error. Please try again or return to
            the dashboard.
          </p>
          {error.digest && (
            <p className="text-xs text-zinc-500 font-mono mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="primary" icon={RefreshCw} onClick={reset}>
            Try Again
          </Button>
          <Button
            variant="secondary"
            icon={Home}
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
