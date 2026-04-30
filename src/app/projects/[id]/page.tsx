"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { getProjectById, projects } from "@/data/projectsData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GallerySlider from "@/components/GallerySlider";

export default function ProjectDetailPage() {
  const params = useParams();
  const project = getProjectById(params.id as string);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Project Not Found
          </h1>
          <Link
            href="/#work"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.08), transparent)",
            }}
          />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to projects</span>
            </Link>
          </motion.div>

          {/* Project header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {project.year}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                {project.category}
              </span>
              {project.role && <span>{project.role}</span>}
              {project.duration && <span>{project.duration}</span>}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight mb-6">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-full font-medium hover:bg-foreground/5 transition-colors"
            >
              {/* <Github className="w-4 h-4" /> */}
              Source Code
            </a>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 md:pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-12"
            >
              {/* Overview */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                  Overview
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="whitespace-pre-line">
                    {project.longDescription || project.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                    Key Features
                  </h2>
                  <ul className="space-y-4">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Tech stack */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-sm rounded-full bg-foreground/10 border border-foreground/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project info */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Project Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span>{project.category}</span>
                  </div>
                  {project.role && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <span>{project.role}</span>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{project.duration}</span>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </div>

          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                Gallery
              </h2>
              <GallerySlider images={project.images} title={project.title} />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
