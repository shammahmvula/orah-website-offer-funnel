import { useState } from "react";
import { Link } from "react-router-dom";
import StarBackground from "@/components/website/StarBackground";
import HorizonCurve from "@/components/website/HorizonCurve";
import QuizModal from "@/components/website/QuizModal";
import orahLogo from "@/assets/orah-logo.png";

const WebsiteIndex = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center text-primary-foreground">
        <StarBackground />
        <HorizonCurve />

        {/* Logo */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-3 animate-fade-up">
          <img src={orahLogo} alt="ORAH" className="w-10 h-10 md:w-12 md:h-12" />
          <span className="text-primary-foreground font-bold text-lg md:text-xl tracking-wide">ORAH</span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
          <p
            className="text-primary-foreground/60 text-lg md:text-xl tracking-wide mb-3 animate-fade-up"
            style={{ animationDelay: "0.1s", fontFamily: "'Inter', sans-serif" }}
          >
            While You Read This,
          </p>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-foreground leading-[1.1] mb-8 animate-fade-up tracking-tight"
            style={{ animationDelay: "0.2s", fontFamily: "'Inter', sans-serif" }}
          >
            Your Competitor Just<br />
            Got <span className="italic text-cosmic-purple" style={{ fontFamily: "'Inter', sans-serif" }}>Another</span> Customer.
          </h1>

          <p
            className="text-primary-foreground/70 text-base md:text-lg leading-relaxed max-w-xl mb-10 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Every missed call, every lost review, every invisible search result...
            it's all money walking to someone else. We make sure they walk to you instead.
          </p>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="px-8 py-4 bg-cosmic-purple text-primary-foreground font-semibold text-lg rounded-lg glow-white hover:scale-105 hover:glow-white-hover transition-all duration-200 cursor-pointer animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Stop Losing Customers →
          </button>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-6 left-0 right-0 text-center text-primary-foreground/35 text-[10px] animate-fade-up flex flex-col gap-1.5" style={{ animationDelay: "0.5s" }}>
          <span>© 2025 ORAH  ·  <Link to="/website/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></span>
          <span className="opacity-70">Not affiliated with Meta/Facebook</span>
        </footer>
      </main>

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
};

export default WebsiteIndex;
