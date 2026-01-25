import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl font-bold text-gradient mb-4">404</div>
          <h1 className="text-2xl font-bold mb-4">Page non trouvée</h1>
          <p className="text-muted-foreground mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" asChild>
              <Link to="/">
                <Home size={18} />
                Retour à l'accueil
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft size={18} />
              Page précédente
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
