import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};
