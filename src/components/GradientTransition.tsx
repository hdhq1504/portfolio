"use client";

import { motion } from "motion/react";

interface GradientTransitionProps {
  direction?: "bottom" | "top";
}

export default function GradientTransition({
  direction = "bottom",
}: GradientTransitionProps) {
  return (
    <div
      className={`absolute left-0 right-0 pointer-events-none ${
        direction === "bottom" ? "bottom-0" : "top-0"
      }`}
      style={{ height: "400px" }}
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            direction === "bottom"
              ? "linear-gradient(to top, rgba(99, 102, 241, 0.12) 0%, transparent 100%)"
              : "linear-gradient(to bottom, rgba(99, 102, 241, 0.12) 0%, transparent 100%)",
        }}
      />

      {/* Animated blob - indigo */}
      <motion.div
        className="absolute left-[5%] w-[900px] h-[600px]"
        animate={{
          opacity: [0.35, 0.6, 0.35],
          y: direction === "bottom" ? [0, -25, 0] : [0, 25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Animated blob - violet */}
      <motion.div
        className="absolute right-[10%] w-[700px] h-[500px]"
        animate={{
          opacity: [0.25, 0.5, 0.25],
          y: direction === "bottom" ? [0, 20, 0] : [0, -20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.18) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
