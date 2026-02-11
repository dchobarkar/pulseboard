import { Suspense } from "react";

import SettingsContent from "./SettingsContent";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">
              Settings
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Profile, workspace, and preferences
            </p>
          </div>
          <div className="glass-card transition-fade-in p-4 sm:p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-zinc-800 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-24"></div>
                <div className="h-10 bg-zinc-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
};

export default Page;
