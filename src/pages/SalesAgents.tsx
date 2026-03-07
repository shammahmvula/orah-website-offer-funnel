import { useRef } from "react";
import StarBackground from "@/components/website/StarBackground";
import orahLogo from "@/assets/orah-logo.png";
import { Link } from "react-router-dom";
import SalesAgentsHero from "@/components/sales-agents/SalesAgentsHero";
import SalesAgentsTypingPitch from "@/components/sales-agents/SalesAgentsTypingPitch";
import SalesAgentsPlatform from "@/components/sales-agents/SalesAgentsPlatform";
import SalesAgentsProcess from "@/components/sales-agents/SalesAgentsProcess";
import SalesAgentsTestimonials from "@/components/sales-agents/SalesAgentsTestimonials";
import SalesAgentsPricing from "@/components/sales-agents/SalesAgentsPricing";
import SalesAgentsFAQ from "@/components/sales-agents/SalesAgentsFAQ";
import SalesAgentsCTA from "@/components/sales-agents/SalesAgentsCTA";

const SalesAgents = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen w-full text-primary-foreground">
      <StarBackground />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-cosmic-dark/80 backdrop-blur-md border-b border-primary-foreground/5">
        <div className="flex items-center gap-3">
          <img src={orahLogo} alt="ORAH" className="w-8 h-8" />
          <span className="font-bold text-lg tracking-wide text-primary-foreground">ORAH</span>
        </div>
        <button
          onClick={scrollToCTA}
          className="px-5 py-2 bg-[hsl(82,85%,55%)] text-[hsl(240,25%,4%)] text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Get Started
        </button>
      </nav>

      <SalesAgentsHero onScrollToCTA={scrollToCTA} />
      <SalesAgentsTypingPitch />
      <SalesAgentsPlatform />
      <SalesAgentsProcess />
      <SalesAgentsTestimonials />
      <SalesAgentsPricing onScrollToCTA={scrollToCTA} />
      <SalesAgentsFAQ />
      <SalesAgentsCTA ref={ctaRef} />

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-primary-foreground/25 text-xs border-t border-primary-foreground/5">
        <span>
          © 2025 ORAH ·{" "}
          <Link to="/website/privacy-policy" className="hover:text-primary-foreground transition-colors">
            Privacy Policy
          </Link>
        </span>
      </footer>
    </main>
  );
};

export default SalesAgents;
