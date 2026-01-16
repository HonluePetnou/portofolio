"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-20 scroll-mt-12 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            About <span className="text-neon-blue">Me</span>
          </h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
            Get to know more about who I am and what I do
          </p>

          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500 border-4 border-white/5">
                  <Image
                    src="/me.png"
                    alt="Mansah"
                    fill
                    className="object-cover object-center"
                  />
                  {/* Overlay Glow (Pure Blue) */}
                  <div className="absolute inset-0 bg-linear-to-t from-neon-blue/20 via-transparent to-transparent opacity-40" />
                </div>
              </motion.div>

              {/* Bio Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-neon-blue/20">
                      <Briefcase className="w-6 h-6 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Professional Focus
                      </h3>
                      <p className="text-muted dark:text-gray-300">
                        I'm a <strong>Senior Frontend Engineer & QA</strong>{" "}
                        with a strong product mindset. I don't just write code;
                        I think about the end-user, business value, and
                        long-term maintainability.
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-neon-blue/20">
                      <GraduationCap className="w-6 h-6 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Education & Philosophy
                      </h3>
                      <p className="text-muted dark:text-gray-300">
                        Engineering student at{" "}
                        <strong>ENSPD (2022–2027)</strong>. I believe Quality
                        Assurance is not a separate phase but a core feature of
                        the product development lifecycle.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-8 max-w-4xl mx-auto pt-8 border-t border-white/5"
            >
              <div className="text-center group">
                <div className="text-4xl font-bold text-neon-blue group-hover:scale-110 transition-transform duration-300">
                  4+
                </div>
                <div className="text-sm font-medium text-muted uppercase tracking-wider mt-1">
                  Years Exp
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-neon-purple group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
                <div className="text-sm font-medium text-muted uppercase tracking-wider mt-1">
                  Projects
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-sm font-medium text-muted uppercase tracking-wider mt-1">
                  Satisfaction
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
