"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

import Button from "@/components/ui/Button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-6xl sm:text-8xl font-bold text-white mb-2">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-2">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            icon={Home}
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
