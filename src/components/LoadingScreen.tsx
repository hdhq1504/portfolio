"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for more realistic feel
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Start exit animation after a brief pause
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 400);

      // Hide loading screen after exit animation
      const hideTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating geometric shapes */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-foreground/2"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-foreground/2"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                 linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated initials logo */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Outer ring */}
              <motion.div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-foreground/10 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {/* Inner ring */}
                <motion.div
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-foreground/20 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Logo container */}
                  <motion.div
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-foreground flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="text-background text-2xl md:text-3xl font-heading font-bold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      HD
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Pulsing dots */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-foreground"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-foreground/50"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

            {/* Loading text with reveal animation */}
            <motion.div
              className="overflow-hidden mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.p
                className="text-lg md:text-xl font-heading tracking-[0.3em] uppercase text-foreground/60"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Ho Duc Hoang Quan
              </motion.p>
            </motion.div>

            {/* Progress bar container */}
            <div className="w-64 md:w-80 h-[2px] bg-foreground/10 rounded-full overflow-hidden">
              {/* Progress fill */}
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Percentage counter */}
            <motion.div
              className="mt-4 font-mono text-sm text-foreground/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Loading line animation */}
            <motion.div
              className="absolute bottom-20 md:bottom-32 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="w-px h-8 bg-foreground/20"
                animate={{
                  scaleY: [0, 1, 0],
                  y: [-4, 0, -4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-12 h-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="w-full h-full text-foreground/20"
            >
              <path d="M0 24V0H24" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-8 right-8 w-12 h-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="w-full h-full text-foreground/20"
            >
              <path d="M48 24V0H24" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-8 w-12 h-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="w-full h-full text-foreground/20"
            >
              <path d="M0 24V48H24" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="w-full h-full text-foreground/20"
            >
              <path d="M48 24V48H24" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
