"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Module-level ref for scrollTo function
let lenisInstance: Lenis | null = null;

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}

// Custom hook to use Lenis instance
export function useLenis() {
  return lenisInstance;
}

// Helper function for smooth scrolling
export function scrollTo(target: string | number | HTMLElement, options?: { duration?: number }) {
  lenisInstance?.scrollTo(target, {
    duration: options?.duration ?? 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
}
