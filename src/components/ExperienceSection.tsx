"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Frontend Developer",
    company: "LAZINET Applied Technology Company Limited",
    duration: "Jul 2025 - Sep 2025",
    highlights: [
      "Collaborated with a backend developer to build a real-time chat application",
      "Developed user interface and integrated RESTful APIs for messaging features",
      "Implemented core functionalities including real-time messaging, user authentication, and message handling",
      "Worked under mentor guidance and participated in product demo sessions",
    ],
    technologies: ["ReactJS", "Node.js", "Express", "RESTful API"],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 lg:py-40"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />

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

                  {/* Highlights */}
                  <ul className="space-y-3 mb-6">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
