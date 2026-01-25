"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Download,
  Code,
  Briefcase,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  MoreHorizontal,
  Minus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const roles = ["Software Engineer", "QA Engineer", "Full Stack Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showAllSocials, setShowAllSocials] = useState(false);

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "Github" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
    { icon: Twitter, href: "https://twitter.com", label: "X" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  ];

  const visibleSocials = showAllSocials ? socialLinks : socialLinks.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen pt-16 pb-20 scroll-mt-12 overflow-hidden"
    >
      {/* Background Spotlights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] mix-blend-screen animate-pulse animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8 flex flex-col items-center lg:items-start"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
              </span>
              Available for new opportunities
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                Hi, I'm{" "}
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-neon-blue/20 blur-xl rounded-full" />
                  <span className="relative text-neon-blue">Mansah</span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl">
                I have{" "}
                <span className="text-foreground font-semibold">
                  4+ years of experience
                </span>{" "}
                building scalable applications and robust software solutions for
                startups and enterprise clients.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card flex items-center gap-4 px-6 py-4 transition-colors hover:border-neon-blue/30 group"
              >
                <div className="p-3 rounded-xl bg-neon-blue/10 group-hover:bg-neon-blue/20 transition-colors">
                  <Code className="w-6 h-6 text-neon-blue" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-foreground leading-none mb-1">
                    10+
                  </div>
                  <div className="text-sm font-medium text-muted">Projects</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card flex items-center gap-4 px-6 py-4 transition-colors hover:border-neon-purple/30 group"
              >
                <div className="p-3 rounded-xl bg-neon-purple/10 group-hover:bg-neon-purple/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-neon-purple" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-neon-purple leading-none mb-1">
                    4+
                  </div>
                  <div className="text-sm font-medium text-muted">
                    Years Exp
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-neon-blue text-white font-bold text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_35px_rgba(14,165,233,0.5)] transition-all duration-300"
                >
                  Let's Talk - Book a Call
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
              <a href="/cv.pdf" download>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-8 py-4 rounded-full border border-glass-border bg-glass-bg text-foreground font-semibold hover:bg-glass-highlight transition-all hover:border-neon-blue/30"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </motion.button>
              </a>
            </div>
          </motion.div>

          {/* Right Side - Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative perspective-1000 w-full max-w-[450px] mx-auto lg:ml-auto"
          >
            {/* Floating Animation Wrapper */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-20"
            >
              {/* Main Card Container */}
              <div className="relative aspect-4/5 w-full rounded-[40px] overflow-hidden border-2 border-black/5 dark:border-white/5 bg-white dark:bg-gray-900 shadow-2xl">
                {/* Profile Image */}
                <Image
                  src="/me-pro.png"
                  alt="Mansah"
                  fill
                  className="object-cover object-center scale-110"
                  priority
                />

                {/* Overlay Gradient (keeping subtle readability) */}
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent dark:from-gray-900/90 dark:via-transparent dark:to-transparent" />

                {/* Bottom Glass Card Info */}
                <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-white/95 dark:bg-black/40 backdrop-blur-2xl border border-black/5 dark:border-white/10 p-5 shadow-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-neon-blue/10 dark:bg-neon-blue/20">
                        <Code className="w-5 h-5 text-neon-blue" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight">
                          Software Engineer
                        </h3>
                        {/* Rotating Role Text */}
                        <div className="h-4 overflow-hidden relative w-32">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentRoleIndex}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-xs font-semibold text-gray-500 dark:text-gray-400 absolute w-full truncate"
                            >
                              {roles[currentRoleIndex]}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    <div className="text-neon-blue font-bold text-sm bg-neon-blue/10 px-3 py-1 rounded-full border border-neon-blue/20">
                      Available
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {["React", "TS", "Python", "C", "SQL"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-200 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Social Icons - Right Side */}
              <div className="absolute top-8 right-4 md:-right-8 lg:-right-12 flex flex-col gap-3 z-30">
                <AnimatePresence mode="popLayout">
                  {visibleSocials.map((social, index) => (
                    <motion.a
                      key={social.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border border-black/5 dark:border-white/10 hover:bg-neon-blue hover:border-neon-blue hover:scale-110 transition-all shadow-lg group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}

                  {/* Toggle Button */}
                  <motion.button
                    key="toggle"
                    onClick={() => setShowAllSocials(!showAllSocials)}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-all shadow-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {showAllSocials ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <MoreHorizontal className="w-5 h-5" />
                    )}
                  </motion.button>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Name Display below card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 text-center"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Honlue Petnou Frederic Armel
              </h2>
            </motion.div>

            {/* Decorative Background Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neon-blue/5 blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
