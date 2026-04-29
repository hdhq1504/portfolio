"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Briefcase } from "lucide-react";
import Marquee from "@/components/Marquee";

const experiences = [
  {
    role: "Frontend Developer Intern",
    company: "LAZINET Applied Technology Company Limited",
    duration: "Jul 2025 - Sep 2025",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-4"
    >
      {/* Marquee divider */}
      <Marquee text="WORK EXPERIENCE" speed={40} className="py-12 md:py-16" />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight">
            Work
            <br />
            <span className="text-foreground/30">Experience</span>
          </h2>
        </motion.div>

        {/* Experience timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-border" />

          {/* Experience items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className="relative pl-20 md:pl-28"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-8 top-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground text-background flex items-center justify-center">
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 border border-border rounded-2xl hover:border-foreground/20 transition-colors bg-background">
                  <span className="text-sm text-muted-foreground mb-2 block">
                    {exp.duration}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                    {exp.role}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {exp.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
