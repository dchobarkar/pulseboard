"use client";

import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="glass-card transition-fade-in p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-emerald-500/20 p-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-white mb-2">
          You&apos;re Logged Out
        </h1>
        <p className="text-sm text-zinc-400 mb-6">
          You have been successfully logged out of PulseBoard. Thank you for
          using our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Dashboard
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700/60 px-6 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5"
          >
            Sign In Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
