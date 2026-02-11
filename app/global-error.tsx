"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    // Log error to error reporting service in production
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white antialiased">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 mb-4">
                <AlertTriangle className="h-8 w-8 text-rose-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                Application Error
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 mb-4">
                A critical error occurred. Please refresh the page or contact support if the problem persists.
              </p>
              {error.digest && (
                <p className="text-xs text-zinc-500 font-mono mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
