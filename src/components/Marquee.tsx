"use client";

import { motion } from "motion/react";

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export default function Marquee({
  text,
  speed = 30,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const duplicatedText = `${text} · ${text} · ${text} · ${text}`;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="inline-block text-[8vw] md:text-[6vw] lg:text-[5vw] font-heading font-bold tracking-tight uppercase text-foreground/5 hover:text-foreground/10 transition-colors cursor-default">
          {duplicatedText}
        </span>
      </motion.div>
    </div>
  );
}

// Horizontal scroll marquee
export function HorizontalMarquee({
  children,
  speed = 40,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="flex gap-8 shrink-0">{children}</div>
        <div className="flex gap-8 shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}

// Text reveal marquee (words appear one by one)
export function TextRevealMarquee({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex flex-wrap gap-x-4 gap-y-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// Infinite scroll marquee with pause on hover
export function InfiniteMarquee({
  items,
  speed = 30,
  separator = "·",
}: {
  items: string[];
  speed?: number;
  separator?: string;
}) {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className="relative group">
      <div className="overflow-hidden py-4">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          <span className="text-sm md:text-base font-medium tracking-wide text-muted-foreground pr-8">
            {content}
          </span>
          <span className="text-sm md:text-base font-medium tracking-wide text-muted-foreground pr-8">
            {content}
          </span>
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}

