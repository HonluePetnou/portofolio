"use client";

import { motion } from "framer-motion";
import { MoveRight, Palette, Layout, Smartphone, Globe } from "lucide-react";

const services = [
  {
    icon: <Palette className="w-8 h-8 text-white" />,
    title: "UI/UX Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: <Layout className="w-8 h-8 text-white" />,
    title: "Application Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: <Globe className="w-8 h-8 text-white" />,
    title: "Website Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
];

const marqueeItems = [
  "App Design",
  "Website Design",
  "Dashboard",
  "Wireframe",
  "Prototyping",
  "User Research",
];

export function ServicesSection() {
  return (
    <section className="relative pb-32" id="services">
      {/* Marquee Bar */}
      <div className="bg-secondary py-6 overflow-hidden">
        <div className="flex gap-12 animate-infinite-scroll whitespace-nowrap justify-center items-center">
          {/* Simple static list for now, can be marquee later */}
          <div className="flex gap-12 font-bold text-primary text-xl items-center">
            {marqueeItems.map((item, index) => (
              <div key={index} className="flex items-center gap-12">
                <span>{item}</span>
                <span className="text-2xl">*</span>
              </div>
            ))}
            {marqueeItems.map((item, index) => (
              <div key={`dup-${index}`} className="flex items-center gap-12">
                <span>{item}</span>
                <span className="text-2xl">*</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 md:px-24 lg:px-40 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-gray-500 font-medium uppercase tracking-wider">
            - Services
          </span>
          <div className="flex justify-between items-end mt-2">
            <h2 className="text-4xl font-bold text-primary">
              Services I Provide
            </h2>
            <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
              View All Services <MoveRight size={16} />
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <a
                href="#"
                className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Learn more <MoveRight size={16} className="text-secondary" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
