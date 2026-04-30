"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "work",
        "skills",
        "experience",
        "education",
        "about",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-2"
      >
        <div
          className={cn(
            "mx-auto transition-all duration-500 flex items-center py-2",
            isScrolled && !isMobile
              ? "justify-center px-4 md:px-6 max-w-xl bg-background/90 backdrop-blur-md border border-border/50 shadow-sm rounded-full"
              : "justify-between px-6 md:px-12 max-w-[1600px]",
          )}
        >
          {/* When scrolled: center everything (only on desktop) */}
          <AnimatePresence mode="wait">
            {isScrolled && !isMobile ? (
              <motion.div
                key="centered"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                {/* Desktop Navigation - Centered */}
                <ul className="hidden lg:flex items-center gap-6">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={cn(
                          "relative text-sm font-medium tracking-wide transition-colors duration-300 group cursor-pointer",
                          activeSection === item.label.toLowerCase()
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        data-cursor-text={`Go to ${item.label}`}
                      >
                        {item.label}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300",
                            activeSection === item.label.toLowerCase()
                              ? "w-full"
                              : "w-0 group-hover:w-full",
                          )}
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Theme Toggle - Centered */}
                <motion.button
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-text="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            ) : (
              /* When NOT scrolled: original layout */
              <motion.nav
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between gap-4 w-full"
              >
                {/* Logo */}
                <motion.a
                  href="#"
                  className="relative z-50 group cursor-pointer shrink-0"
                  whileHover={{ scale: 1.02 }}
                  data-cursor-text="Home"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold tracking-tight font-heading text-foreground">
                      Q
                    </span>
                    <span className="w-2 h-2 rounded-full bg-foreground" />
                  </div>
                </motion.a>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={cn(
                          "relative text-sm font-medium tracking-wide transition-colors duration-300 group cursor-pointer",
                          activeSection === item.label.toLowerCase()
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        data-cursor-text={`Go to ${item.label}`}
                      >
                        {item.label}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300",
                            activeSection === item.label.toLowerCase()
                              ? "w-full"
                              : "w-0 group-hover:w-full",
                          )}
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Right side - Theme toggle + CTA */}
                <div className="flex items-center gap-4 shrink-0">
                  {/* Theme Toggle */}
                  <motion.button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-text="Toggle theme"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {theme === "dark" ? (
                          <Sun className="w-4 h-4" />
                        ) : (
                          <Moon className="w-4 h-4" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>

                  {/* CTA Button - Desktop */}
                  <motion.a
                    href="mailto:hoquan15042004@gmail.com"
                    className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    data-cursor-text="Say Hello"
                  >
                    Let&apos;s Talk
                  </motion.a>

                  {/* Mobile Menu Button */}
                  <motion.button
                    className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-text={isMobileMenuOpen ? "Close" : "Menu"}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-lg lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "text-4xl font-heading font-bold transition-colors cursor-pointer",
                    activeSection === item.label.toLowerCase()
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                  data-cursor-text={`Go to ${item.label}`}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                href="mailto:hoquan15042004@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-4 px-8 py-3 text-lg font-medium bg-foreground text-background rounded-full cursor-pointer"
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
