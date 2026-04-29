"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Marquee from "@/components/Marquee";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-4"
    >
      {/* Marquee divider */}
      <Marquee
        text="ABOUT ME"
        speed={40}
        className="py-12 md:py-16"
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight">
            Who I Am
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left - Bio */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/80 mb-6">
              Recent IT graduate with hands-on experience in JavaScript and
              backend development through internship and projects.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              Seeking to grow in enterprise workflow automation and system
              design. Interested in problem-solving, ready for full-time work
              and long-term commitment.
            </p>
            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-3 text-lg font-medium cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Decorative frame container */}
            <div className="relative p-4">
              {/* Outer gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-foreground via-transparent to-foreground/30 p-[2px]">
                <div className="w-full h-full rounded-3xl bg-background" />
              </div>
              {/* Inner accent border */}
              <div className="absolute inset-2 rounded-2xl border border-dashed border-muted-foreground/30" />

              {/* Profile image */}
              <div className="relative w-64 md:w-80 lg:w-96 aspect-4/5 rounded-2xl overflow-hidden bg-muted">
                <Image
                  src="/about.png"
                  alt="Ho Duc Hoang Quan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 16rem, (max-width: 1024px) 20rem, 24rem"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
