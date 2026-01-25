import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Message envoyé !",
      description:
        "Nous avons bien reçu votre demande et vous répondrons sous 24h.",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative pt-44 pb-32 bg-brand-navy overflow-hidden"
        data-theme="dark"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            alt="Contact Workplace"
            className="w-full h-full object-cover opacity-20 contrast-125"
          />
          <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brand-orange" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200/60">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-mont text-white leading-tight mb-8">
              Contactez <span className="text-brand-orange">Nous</span>
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed max-w-xl">
              Prêt à transformer vos ambitions en réalité ? Discutons de votre
              prochain projet et voyons comment nous pouvons vous aider à
              dominer votre marché.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-24 bg-white" data-theme="light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <span className="text-sm font-bold text-brand-orange uppercase tracking-widest block">
                  / COMMENÇONS UN PROJET /
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold font-mont text-brand-navy leading-tight">
                  Nous sommes prêts à transformer vos idées en réalité numérique
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
                  Que vous ayez un projet précis ou que vous souhaitiez explorer
                  les opportunités offertes par les nouvelles technologies,
                  notre équipe d'experts est là pour vous accompagner.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold font-mont text-brand-navy uppercase tracking-wide">
                    Centre d'appels
                  </h4>
                  <div className="space-y-2 text-slate-600 font-medium">
                    <p className="hover:text-brand-orange transition-colors cursor-pointer">
                      +33 1 23 45 67 89
                    </p>
                    <p className="hover:text-brand-orange transition-colors cursor-pointer">
                      +33 1 98 76 54 32
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold font-mont text-brand-navy uppercase tracking-wide">
                    Localisation
                  </h4>
                  <div className="text-slate-600 font-medium">
                    <p>75bis Avenue de la Grande Armée,</p>
                    <p>75116 Paris, France</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold font-mont text-brand-navy uppercase tracking-wide">
                    Email
                  </h4>
                  <div className="text-slate-600 font-medium">
                    <p className="hover:text-brand-orange transition-colors cursor-pointer">
                      hello@soluty.agency
                    </p>
                    <p className="hover:text-brand-orange transition-colors cursor-pointer">
                      contact@soluty.agency
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold font-mont text-brand-navy uppercase tracking-wide">
                    Réseaux Sociaux
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all shadow-sm"
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-50 p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <h3 className="text-2xl font-bold font-mont text-brand-navy mb-8">
                Parlons de votre projet
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Input
                    placeholder="Nom complet"
                    className="h-14 bg-white border-transparent focus:border-brand-orange rounded-xl px-6"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Adresse email pro"
                    className="h-14 bg-white border-transparent focus:border-brand-orange rounded-xl px-6"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Sujet"
                    className="h-14 bg-white border-transparent focus:border-brand-orange rounded-xl px-6"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="bg-white border-transparent focus:border-brand-orange rounded-xl px-6 min-h-[150px] pt-4"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-brand-navy hover:bg-brand-orange text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Envoyer le message
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white pb-24" data-theme="light">
        <div className="container-custom">
          <div className="h-[500px] w-full bg-slate-100 rounded-[2.5rem] overflow-hidden relative shadow-inner">
            {/* Mock Map Image */}
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop"
              alt="Map Location"
              className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Marker placeholder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                <MapPin size={24} />
              </div>
              <div className="mt-4 bg-white px-6 py-3 rounded-2xl shadow-2xl text-center border border-slate-100">
                <p className="font-bold text-brand-navy">Soluty Agency</p>
                <p className="text-xs text-slate-500">Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
