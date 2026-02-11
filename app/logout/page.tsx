"use client";

import { useEffect, useState } from "react";
import { LogOut, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      setIsLoggingOut(false);
      setIsLoggedOut(true);
      
      // Redirect to logged out page after showing success
      setTimeout(() => {
        router.push("/logged-out");
      }, 1500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoggedOut) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4">
        <div className="glass-card transition-fade-in p-8 text-center max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-emerald-500/20 p-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Logged Out</h1>
          <p className="text-sm text-zinc-400 mb-6">
            You have been successfully logged out of your account.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4">
      <div className="glass-card transition-fade-in p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-indigo-500/20 p-3">
            <LogOut className="h-8 w-8 text-indigo-400 animate-pulse" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-white mb-2">Logging Out</h1>
        <p className="text-sm text-zinc-400 mb-6">
          Please wait while we securely log you out...
        </p>
        <div className="flex justify-center">
          <div className="h-1 w-32 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
