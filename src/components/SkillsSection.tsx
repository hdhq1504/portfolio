"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: ["ReactJS", "Next.js"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "RESTful API"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "SQL Server"],
  },
  {
    title: "Core Concepts",
    skills: [
      "OOP",
      "RBAC",
      "API Integration",
      "System Design",
      "Problem Solving",
    ],
  },
  {
    title: "Tools & Others",
    skills: ["Git/GitHub", "Figma", "English (Intermediate)"],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-16 md:py-32 lg:py-40"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-muted/20" />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-24"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight">
            Skills &
            <br />
            <span className="text-foreground/30">Technologies</span>
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-heading font-bold">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="px-4 py-2 bg-muted rounded-full text-sm font-medium cursor-pointer"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
