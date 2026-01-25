import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FinalCTA() {
  return (
    <section
      className="py-32 bg-brand-blue relative overflow-hidden flex items-center justify-center text-center"
      data-theme="dark"
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-45 animate-pulse" />

      <div className="container-custom relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white font-mont mb-8 tracking-tight">
          Prêt à passer au <br /> niveau supérieur ?
        </h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Ne laissez pas vos concurrents prendre l'avance. Obtenez votre plan
          d'action personnalisé dès maintenant.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button
            size="lg"
            className="h-16 px-10 bg-white text-brand-blue hover:bg-blue-50 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/contact">Je veux mon audit offert</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 px-10 border-2 border-white/30 text-white hover:bg-white/10 rounded-full text-xl font-medium"
            asChild
          >
            <Link to="/service">Explorer les services</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-blue-200 opacity-80">
          *Réponse sous 24h ouvrées. Engagement de confidentialité garanti.
        </p>
      </div>
    </section>
  );
}
