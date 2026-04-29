"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentText, setCurrentText] = useState(0);

  const titles = ["Frontend Developer", "UI Engineer", "Creative Coder"];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -150]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotate titles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        {/* Large decorative circle */}
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(38,38,35,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full border border-foreground/5"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-foreground/5 rotate-45"
          animate={{
            y: [0, 20, 0],
            rotate: [45, 135, 45],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Indigo gradient at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          background: "linear-gradient(to top, rgba(99, 102, 241, 0.15), transparent)",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-48 md:h-72 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-40 md:h-60 pointer-events-none"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <motion.div
        ref={textRef}
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 md:mb-12"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wide text-muted-foreground">
            Available for work
          </span>
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="perspective-1000"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            }}
          >
            <h1 className="text-[12vw] md:text-[10vw] lg:text-[7vw] font-heading font-bold tracking-tighter leading-[0.9]">
              Ho Duc Hoang Quan
            </h1>
          </motion.div>
        </div>

        {/* Rotating subtitle */}
        <div className="h-12 md:h-16 overflow-hidden mt-6 md:mt-8">
          <motion.p
            key={currentText}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-3xl lg:text-4xl font-heading text-muted-foreground"
          >
            {titles[currentText]}
          </motion.p>
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 mt-10 md:mt-14"
        >
          <motion.a
            href="#work"
            className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium text-lg transition-all duration-300"
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Projects</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="#about"
            className="group flex items-center gap-2 text-foreground font-medium text-lg"
            whileHover={{ x: 5 }}
          >
            <span>Learn more</span>
            <span className="text-muted-foreground text-sm">about me</span>
          </motion.a>
        </motion.div>

        {/* Social links - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex items-center gap-4 mt-10 md:mt-20"
        >
          <a
            href="https://github.com/hdhq1504"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          >
            GitHub
          </a>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <a
            href="https://linkedin.com/in/hoduchoangquan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
