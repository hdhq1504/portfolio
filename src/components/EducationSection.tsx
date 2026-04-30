"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GraduationCap, Award } from "lucide-react";

const educations = [
  {
    major: "Information Technology",
    school: "Ho Chi Minh City University of Industry and Trade (HUIT)",
    degree: "Bachelor's Degree",
    duration: "2022 - 2026",
    gpa: "3.31/4.0",
  },
];

const awards = [
  {
    title: "Student Scientific Research Competition",
    prize: "Consolation Prize",
    date: "February 2025",
    description:
      "Recognized for research and innovation in information technology.",
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 md:py-32 lg:py-40"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/20 via-background to-background" />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight">
            Education
            <br />
            <span className="text-foreground/30">& Awards</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Education */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-10 border border-border rounded-3xl hover:border-foreground/20 transition-colors"
          >
            <h3 className="text-xl md:text-2xl font-heading font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              Education
            </h3>
            <div className="space-y-6">
              {educations.map((education, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <span className="text-sm text-muted-foreground mb-2 block">
                    {education.duration}
                  </span>
                  <h4 className="text-xl md:text-2xl font-heading font-bold mb-2">
                    {education.major}
                  </h4>
                  <p className="text-lg font-medium text-foreground/70 mb-2">
                    {education.degree}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    {education.school}
                  </p>
                  <p className="border inline-block px-3 py-1 rounded-full bg-muted mt-2">
                    GPA: {education.gpa}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Awards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 md:p-10 border border-border rounded-3xl hover:border-foreground/20 transition-colors"
          >
            <h3 className="text-xl md:text-2xl font-heading font-bold mb-8 flex items-center gap-3">
              <Award className="w-6 h-6" />
              Awards
            </h3>
            <div className="space-y-6">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <span className="text-sm text-muted-foreground mb-2 block">
                    {award.date}
                  </span>
                  <h4 className="text-xl md:text-2xl font-heading font-bold mb-2">
                    {award.title}
                  </h4>
                  <p className="text-lg font-medium text-foreground/70">
                    {award.prize}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    {award.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
