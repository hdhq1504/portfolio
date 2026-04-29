"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/hdhq1504",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/hoduchoangquan",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-foreground text-background overflow-hidden"
    >
      {/* Top gradient line */}
      <div className="h-px bg-linear-to-r from-transparent via-muted-foreground/30 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20 mb-4">
          {/* Left - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-1 mb-4">
              <span className="text-3xl font-bold tracking-tight font-heading">
                Q
              </span>
              <span className="w-2 h-2 rounded-full bg-background/30" />
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              Ho Duc Hoang Quan
            </h3>
            <p className="text-background/60 mb-6 max-w-sm">
              Frontend Developer crafting digital experiences with attention to
              detail and clean code.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:hoquan15042004@gmail.com"
                className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors group"
              >
                <Mail className="w-4 h-4" />
                <span>hoquan15042004@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-background/60 mb-3">
                <MapPin className="w-4 h-4" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
            </div>
          </motion.div>

          {/* Center - Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h4 className="text-sm font-medium uppercase tracking-wider text-background/40 mb-6">
              Navigation
            </h4>
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-lg font-medium text-background/60 hover:text-background transition-colors group"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Right - Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h4 className="text-sm font-medium uppercase tracking-wider text-background/40 mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 hover:bg-background/5 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="mailto:hoquan15042004@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-full font-medium text-sm hover:scale-105 transition-transform"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-muted-foreground/30"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Ho Duc Hoang Quan. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-background/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-background/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </footer>
  );
}
