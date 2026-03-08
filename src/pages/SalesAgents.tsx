import { useRef, useState } from "react";
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
import SalesAgentsBookingModal from "@/components/sales-agents/SalesAgentsBookingModal";

const SalesAgents = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

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
          onClick={openModal}
          className="px-5 py-2 bg-[hsl(82,85%,55%)] text-[hsl(240,25%,4%)] text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Get Started
        </button>
      </nav>

      <SalesAgentsHero onScrollToCTA={openModal} />
      <SalesAgentsTypingPitch />
      <SalesAgentsPlatform />
      <SalesAgentsProcess />
      <SalesAgentsTestimonials />
      <SalesAgentsPricing onScrollToCTA={openModal} />
      <SalesAgentsFAQ />
      <SalesAgentsCTA ref={ctaRef} onBookDemo={openModal} />

      <SalesAgentsBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary-foreground/5">
        {/* Big Email */}
        <div className="text-center py-16 md:py-24">
          <a
            href="mailto:growth@getorah.co.za"
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary-foreground tracking-tight hover:opacity-80 transition-opacity"
          >
            GROWTH@GETORAH.CO.ZA
          </a>
          <p className="text-primary-foreground/40 text-sm mt-3">Cape Town, South Africa</p>
        </div>

        {/* Footer Links */}
        <div className="border-t border-primary-foreground/5 px-6 md:px-16 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src={orahLogo} alt="ORAH" className="w-6 h-6" />
                <span className="font-bold text-primary-foreground text-sm">ORAH</span>
              </div>
              <p className="text-primary-foreground/40 text-sm leading-relaxed max-w-xs">
                The unfair advantage for high-performance South African businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-primary-foreground/40 text-sm">
                <li><button onClick={openModal} className="hover:text-primary-foreground transition-colors">Features</button></li>
                <li><button onClick={openModal} className="hover:text-primary-foreground transition-colors">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-primary-foreground/40 text-sm">
                <li><a href="mailto:growth@getorah.co.za" className="hover:text-primary-foreground transition-colors">Contact</a></li>
                <li><button onClick={openModal} className="text-[hsl(82,85%,55%)] hover:brightness-110 transition-all">Book Demo</button></li>
                <li><Link to="/website/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/5 px-6 py-6 text-center text-primary-foreground/25 text-xs">
          © 2025 ORAH. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default SalesAgents;
