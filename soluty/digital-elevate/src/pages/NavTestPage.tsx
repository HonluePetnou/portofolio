import { Layout } from "@/components/layout/Layout";
import { Navbar1 } from "@/components/layout/nav-variants/Navbar1";
import { Navbar2 } from "@/components/layout/nav-variants/Navbar2";
import { Navbar3 } from "@/components/layout/nav-variants/Navbar3";
import { Navbar4 } from "@/components/layout/nav-variants/Navbar4";
import { Navbar5 } from "@/components/layout/nav-variants/Navbar5";
import { HeroSection } from "@/components/home/HeroSection";

interface NavTestPageProps {
  variant: 1 | 2 | 3 | 4 | 5;
}

const NavTestPage = ({ variant }: NavTestPageProps) => {
  const renderNavbar = () => {
    switch (variant) {
      case 1:
        return <Navbar1 />;
      case 2:
        return <Navbar2 />;
      case 3:
        return <Navbar3 />;
      case 4:
        return <Navbar4 />;
      case 5:
        return <Navbar5 />;
      default:
        return <Navbar1 />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {renderNavbar()}
      {/* Placeholder Content similar to Index */}
      <HeroSection />

      <div className="container mx-auto px-4 py-20 text-white min-h-screen">
        <h2 className="text-4xl font-bold mb-8">
          Navigation Variant {variant}
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mb-10">
          This is a preview of navigation variant #{variant}. <br />
          Scroll down to see scroll behaviors if applicable.
        </p>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-white/5 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavTestPage;
