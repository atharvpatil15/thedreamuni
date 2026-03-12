"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

export default function ClerkAuthWall({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  useEffect(() => {
    if (isSignedIn) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the click is on a Clerk component (classes starting with 'cl-')
      // or inside a portal where Clerk usually renders modals
      const isClerkClick = target.closest(".cl-root") || 
                           target.closest("[class*='cl-']") ||
                           target.closest(".cl-portal");

      if (!isClerkClick) {
        openSignIn();
      }
    };

    window.addEventListener("click", handleClick, true);
    return () => window.removeEventListener("click", handleClick, true);
  }, [isSignedIn, openSignIn]);

  return <>{children}</>;
}
