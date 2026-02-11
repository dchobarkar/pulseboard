"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function useKeyboardShortcuts() {
  const router = useRouter();
  const gKeyPressedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
        return;
      }

      // Handle G key sequences
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        gKeyPressedRef.current = true;
        
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set timeout to reset G key state
        timeoutRef.current = setTimeout(() => {
          gKeyPressedRef.current = false;
        }, 1000);

        // Listen for the next key
        const handleNextKey = (nextEvent: KeyboardEvent) => {
          if (gKeyPressedRef.current) {
            switch (nextEvent.key.toLowerCase()) {
              case "u":
                e.preventDefault();
                router.push("/users");
                break;
              case "a":
                e.preventDefault();
                router.push("/analytics");
                break;
              case "b":
                e.preventDefault();
                router.push("/billing");
                break;
              case "r":
                e.preventDefault();
                router.push("/reports");
                break;
              case "s":
                e.preventDefault();
                router.push("/settings");
                break;
            }
            gKeyPressedRef.current = false;
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }
          document.removeEventListener("keydown", handleNextKey);
        };

        document.addEventListener("keydown", handleNextKey, { once: true });
        return;
      }

      // / for search
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
        return;
      }

      // ? for help (show shortcuts)
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        // Could show a modal with shortcuts
        console.log("Keyboard shortcuts:\n/ - Search\nG + U - Users\nG + A - Analytics\nG + B - Billing\nG + R - Reports\nG + S - Settings");
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [router]);
}
