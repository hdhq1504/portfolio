"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (!isHovering) {
        cursorX = mouseX;
        cursorY = mouseY;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animate = () => {
      if (!cursor || !cursorDot) return;

      // Smooth cursor following with lag
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Dot follows more quickly
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      cursor.style.transform = `translate(${cursorX - (isHovering ? 40 : 20)}px, ${cursorY - (isHovering ? 40 : 20)}px)`;
      cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

      requestAnimationFrame(animate);
    };

    const intervalId = requestAnimationFrame(animate);

    // Detect hoverable elements
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        "a, button, [data-cursor]",
      ) as HTMLElement;
      if (hoverable) {
        setIsHovering(true);
        const text = hoverable.getAttribute("data-cursor-text");
        setCursorText(text);
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor]")) {
        setIsHovering(false);
        setCursorText(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(intervalId);
    };
  }, [isHovering]);

  return (
    <>
      {/* Cursor Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <motion.div
          className={`
            relative flex items-center justify-center
            rounded-full bg-white dark:bg-black
            transition-all duration-300 ease-out
            ${isHovering ? "w-20 h-20" : "w-10 h-10"}
            ${isClicking ? "scale-75" : "scale-100"}
          `}
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-xs font-medium text-black dark:text-white whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}

          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border border-white/30 dark:border-black/30 animate-spin-slow" />
        </motion.div>
      </div>

      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="w-2 h-2 rounded-full bg-black dark:bg-white" />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        a,
        button {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
