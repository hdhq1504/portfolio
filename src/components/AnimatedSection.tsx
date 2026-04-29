"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionVariants = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
    none: { y: 0, x: 0 },
  };

  const initial = {
    opacity: 0,
    ...directionVariants[direction],
  };

  const animate = isInView
    ? {
        opacity: 1,
        y: 0,
        x: 0,
      }
    : initial;

  return (
    <motion.section
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Animated text for text reveal effects
interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  splitBy?: "word" | "char";
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  splitBy = "word",
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const items = splitBy === "word" 
    ? children.split(" ") 
    : children.split("");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {splitBy === "word" ? item + "\u00A0" : item}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Staggered children animation
interface StaggeredListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: "fadeUp" | "fadeIn" | "scaleUp" | "slideInLeft";
}

export function StaggeredList({
  children,
  className = "",
  staggerDelay = 0.1,
  animation = "fadeUp",
}: StaggeredListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const childrenArray = Array.isArray(children) ? children : [children];

  const animationVariants = {
    fadeUp: {
      initial: { y: 40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scaleUp: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
    slideInLeft: {
      initial: { x: -40, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
  };

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, i) => (
        <motion.div
          key={i}
          initial={animationVariants[animation].initial}
          animate={isInView ? animationVariants[animation].animate : animationVariants[animation].initial}
          transition={{
            duration: 0.6,
            delay: i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
