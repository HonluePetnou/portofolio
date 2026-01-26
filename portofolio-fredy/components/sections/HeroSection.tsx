"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-secondary/10 rounded-l-[100px] z-0 hidden lg:block" />

      <div className="container mx-auto px-8 md:px-24 lg:px-40 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block border border-primary/20 rounded-lg px-4 py-2 bg-white shadow-sm">
              <span className="text-primary font-bold">Hello There!</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-primary leading-tight">
              Lead <span className="text-secondary">Creative Strategist</span>
              <br />& Digital Marketer
            </h1>
            <p className="text-xl font-semibold text-secondary">
              CO-FONDATEUR | SOLUTY AGENCY
            </p>

            <p className="text-gray-600 text-lg max-w-lg">
              Co-fondateur de Soluty Agency, j’évolue à l’intersection précise
              entre le design d’impact, la stratégie marketing et l’intelligence
              des données. Je ne me contente pas de rendre votre entreprise
              visible ; je la rends performante.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#portfolio"
                className="flex items-center gap-2 bg-primary text-white rounded-full px-8 py-3 font-semibold hover:bg-primary/90 transition-all group"
              >
                View My Portfolio
                <div className="bg-secondary p-1 rounded-full text-primary group-hover:bg-white transition-colors">
                  <Play size={12} fill="currentColor" />
                </div>
              </Link>

              <Link
                href="#contact"
                className="flex items-center gap-2 border-2 border-primary text-primary rounded-full px-8 py-3 font-semibold hover:bg-secondary hover:border-secondary hover:text-primary transition-all"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Yellow Circle Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] bg-secondary rounded-full z-0" />

            {/* Person Image (Placeholder) */}
            {/* Person Image */}
            <div className="relative z-10 w-[350px] lg:w-[450px] h-[450px] lg:h-[550px] bg-gray-200 rounded-b-full overflow-hidden border-b-4 border-primary">
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop"
                alt="Portrait"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-1/4 right-0 lg:right-10 bg-primary text-white px-4 py-2 rounded-lg text-sm z-20 shadow-lg"
            >
              Creative Strategist
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 left-0 lg:left-10 bg-primary text-white px-4 py-2 rounded-lg text-sm z-20 shadow-lg"
            >
              Digital Marketer
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-10 left-0 right-0 hidden lg:block">
        {/* Can add the yellow bar with stats here if needed, or separate section */}
      </div>
    </section>
  );
}
