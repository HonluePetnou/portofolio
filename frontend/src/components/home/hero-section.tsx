"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Code,
  Briefcase,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen py-20 overflow-hidden"
    >
      {/* Background Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] mix-blend-screen animate-pulse animation-delay-2000" />
      </div>

      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center max-w-7xl w-full relative z-10 px-4">
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left space-y-8"
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
                <span className="absolute -inset-2 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-xl rounded-full" />
                <span className="relative bg-gradient-to-r from-neon-blue via-violet-400 to-neon-purple bg-clip-text text-transparent animate-gradient-x">
                  Frédéric Armel
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl">
              I have{" "}
              <span className="text-white font-semibold">
                4+ years of experience
              </span>{" "}
              building scalable applications and robust software solutions for
              startups and enterprise clients.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-neon-purple/30 group"
            >
              <div className="p-3 rounded-xl bg-neon-purple/10 group-hover:bg-neon-purple/20 transition-colors">
                <Code className="w-6 h-6 text-neon-purple" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white leading-none mb-1">
                  10+
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Projects
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-neon-blue/30 group"
            >
              <div className="p-3 rounded-xl bg-neon-blue/10 group-hover:bg-neon-blue/20 transition-colors">
                <Briefcase className="w-6 h-6 text-neon-blue" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white leading-none mb-1">
                  4+
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Years Exp
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_35px_rgba(14,165,233,0.5)] transition-all duration-300"
              >
                Let's Talk - Book a Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <a href="/cv.pdf" download>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:border-white/20"
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* Right Side - Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative perspective-1000"
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
            <div className="glass-card p-6 space-y-6 max-w-sm mx-auto backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl shadow-black/50">
              {/* Profile Image with Ring */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-br from-neon-purple to-neon-blue">
                <div className="relative w-full aspect-3/4 rounded-[20px] overflow-hidden bg-gray-900 border-4 border-black/50">
                  <Image
                    src="/me-pro.png"
                    alt="Frédéric Armel Petnou"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority
                  />
                </div>
              </div>

              {/* Role Badge and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-transparent border border-neon-blue/20 flex items-center justify-center">
                    <Code className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div className="text-left">
                    <div className="text-base font-bold text-white tracking-wide">
                      ENGINEER & QA
                    </div>
                    <div className="text-xs font-medium text-neon-blue">
                      Focus on Quality
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  ONLINE
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Python", "Tailwind"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Mail, href: "mailto:contact@example.com" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 group flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements behind card */}
          <div className="absolute top-10 -right-10 w-24 h-24 bg-neon-blue/30 rounded-full blur-2xl animate-pulse delay-700" />
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-neon-purple/30 rounded-full blur-2xl animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
