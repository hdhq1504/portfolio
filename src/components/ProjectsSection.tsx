"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Marquee from "./Marquee";

const projects = [
  {
    id: 1,
    title: "HUIT Social Credits",
    description:
      "Student management system with face-recognition attendance, role-based access control (RBAC), activity approval workflows, and automated email notifications. PWA support for cross-platform mobile experience.",
    tags: ["ReactJS", "Node.js", "Express", "PostgreSQL", "Prisma"],
    year: "2025",
    category: "Final Year Project",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop",
    link: "https://github.com/hdhq1504/huit-social-credits",
  },
  {
    id: 2,
    title: "Note Taking App",
    description:
      "Real-time collaborative document system with hierarchical data structure, authentication & authorization with role-based access control, full-text search, and soft-delete system.",
    tags: ["Next.js", "TypeScript", "Convex", "Clerk"],
    year: "2026",
    category: "Personal Project",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=800&fit=crop",
    link: "https://github.com/hdhq1504/jotion-note-taking",
  },
  {
    id: 3,
    title: "NexTalk",
    description:
      "Collaborated with backend developer to build a real-time chat application with user authentication, real-time messaging, and message handling features.",
    tags: ["ReactJS", "Node.js", "Express", "RESTful API"],
    year: "2026",
    category: "Personal Project",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop",
    link: "https://github.com/hdhq1504/nextalk",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden">
      {/* Marquee divider */}
      <Marquee text="SELECTED WORK" speed={40} className="py-12 md:py-16" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 md:mb-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight">
              Featured
              <br />
              <span className="text-foreground/30">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground leading-relaxed">
            A curated selection of my recent work. Each project represents a
            unique challenge solved with creativity and technical excellence.
          </p>
        </div>
      </motion.div>

      {/* Projects list - Alternating layout */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectItem({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isItemInView = useInView(itemRef, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-border"
        initial={{ scaleX: 0 }}
        animate={isItemInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-16 md:pt-24 lg:pt-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Image container */}
          <motion.div
            className={`w-full lg:w-7/12 ${isEven ? "" : "lg:order-2"}`}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isItemInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden rounded-2xl md:rounded-3xl group"
            >
              {/* Image wrapper with overflow for scale effect */}
              <div className="overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-4/3 md:aspect-16/10 object-cover"
                  style={{ scale: imageScale, y: imageY }}
                />
              </div>

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500"
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
              />

              {/* View project indicator */}
              <motion.div
                className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ scale: 0, rotate: -90 }}
                animate={{
                  scale: isHovered ? 1 : 0,
                  rotate: isHovered ? 0 : -90,
                }}
              >
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
              </motion.div>

              {/* Category badge */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-background/80 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium cursor-pointer">
                  {project.category}
                </span>
              </div>
            </a>
          </motion.div>

          {/* Content */}
          <motion.div
            className={`w-full lg:w-5/12 ${isEven ? "" : "lg:order-1 lg:text-right"}`}
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            animate={isItemInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Project number */}
            <span className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold text-foreground/20 leading-none select-none">
              0{index + 1}
            </span>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4 md:mb-6 group-hover:text-foreground/70 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p
              className={`text-muted-foreground leading-relaxed mb-6 md:mb-8 max-w-lg ${isEven ? "" : "lg:ml-auto"}`}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div
              className={`flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 ${isEven ? "" : "lg:justify-end"}`}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium bg-muted rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta & CTA */}
            <div
              className={`flex items-center justify-between ${isEven ? "" : "lg:flex-row-reverse"}`}
            >
              <span className="text-sm text-muted-foreground">
                {project.year}
              </span>

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-foreground font-medium cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm md:text-base">View Project</span>
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Grid version - alternative layout
export function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
            Selected Work
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight">
            Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-4/3 overflow-hidden rounded-xl md:rounded-2xl bg-muted"
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />

              <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/60 mb-2 block">
                  {project.category} · {project.year}
                </span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-sm">View Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
