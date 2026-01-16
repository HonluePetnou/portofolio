"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 scroll-mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Get In <span className="text-neon-blue">Touch</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Let's collaborate on your next project
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors group"
                >
                  <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-neon-blue/50 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>contact@example.com</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors group"
                >
                  <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-neon-blue/50 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors group"
                >
                  <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-neon-blue/50 transition-colors">
                    <Github className="h-5 w-5" />
                  </div>
                  <span>GitHub Profile</span>
                </a>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-2 rounded-full bg-white/5 border border-white/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span>Douala, Cameroon (GMT+1)</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 text-center bg-neon-blue/5 border-neon-blue/10">
              <p className="text-sm text-gray-300">
                <strong className="text-white">
                  Available for remote work worldwide
                </strong>
                <br />
                Open to new opportunities and collaborations
              </p>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Send a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all placeholder:text-gray-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all placeholder:text-gray-600"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all placeholder:text-gray-600 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="button"
                className="w-full bg-neon-blue text-white font-bold py-3 rounded-lg hover:bg-neon-blue/90 shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all flex items-center justify-center gap-2"
              >
                Send Message <Send className="h-4 w-4" />
              </button>
            </form>
          </GlassCard>
        </div>
      </motion.div>
    </section>
  );
}
