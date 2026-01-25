import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

import NotFound from "./pages/NotFound";
import Realisations from "./pages/Realisations";
import ProjectDetail from "./pages/ProjectDetail";
import Service from "./pages/Service";
import SectorDetail from "./pages/SectorDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/a-propos" element={<About />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

          {/* New Routes */}
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/realisations/:id" element={<ProjectDetail />} />
          <Route path="/service" element={<Service />} />
          <Route path="/solutions/:sector" element={<SectorDetail />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
