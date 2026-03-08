import { motion } from "framer-motion";
import trustedLogos from "@/assets/trusted-logos.png";

interface SalesAgentsHeroProps {
  onScrollToCTA: () => void;
}

const SalesAgentsHero = ({ onScrollToCTA }: SalesAgentsHeroProps) => {
  return (
    <section className="relative z-10 min-h-screen flex items-center px-6 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(82,85%,55%)] animate-pulse" />
            <span className="text-[hsl(82,85%,55%)] text-xs tracking-[0.2em] uppercase font-medium">
              Now Available in South Africa
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-black leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Scale revenue with{" "}
            <span
              className="italic text-[hsl(82,85%,55%)]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              autonomous
            </span>{" "}
            sales agents.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-primary-foreground/55 text-base md:text-lg max-w-md mb-8 leading-relaxed"
          >
            Deploy AI workers that prospect, engage, and book meetings automatically. Focus your team on closing, not chasing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={onScrollToCTA}
              className="px-6 py-3 bg-[hsl(82,85%,55%)] text-[hsl(240,25%,4%)] font-semibold text-sm rounded-lg hover:brightness-110 transition-all"
            >
              Book Demo
            </button>
            <button
              onClick={onScrollToCTA}
              className="px-6 py-3 border border-primary-foreground/20 text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary-foreground/5 transition-all flex items-center gap-2"
            >
              Hear The AI <span className="text-xs">↗</span>
            </button>
          </motion.div>
        </div>

        {/* Right - Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="relative bg-[hsl(240,15%,8%)] border border-primary-foreground/10 rounded-2xl p-1 shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-primary-foreground/5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-44 border-r border-primary-foreground/5 p-4 space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-[hsl(82,85%,55%)]/10 rounded-lg border border-[hsl(82,85%,55%)]/20">
                  <span className="text-[hsl(82,85%,55%)] text-xs">⚡</span>
                  <span className="text-[hsl(82,85%,55%)] text-xs font-medium">Live Analytics</span>
                </div>
                {["Overview", "Pipeline", "Agents", "Workflows", "Integration"].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-2 text-primary-foreground/40 text-xs">
                    <span className="w-3.5 h-3.5 rounded bg-primary-foreground/10" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/40 text-xs">Revenue Forecast</span>
                  <span className="text-primary-foreground/30 text-[10px] bg-primary-foreground/5 px-2 py-0.5 rounded">Q1 2026</span>
                </div>
                <p className="text-3xl font-black text-primary-foreground tracking-tight">R892,104<span className="text-primary-foreground/30 text-lg">.50</span></p>
                <div className="flex items-center gap-2">
                  <span className="text-[hsl(82,85%,55%)] text-xs font-semibold">+12.4%</span>
                  <span className="text-primary-foreground/30 text-[10px]">vs last month</span>
                </div>

                {/* Mini chart */}
                <div className="h-16 flex items-end gap-1 pt-4">
                  {[35, 42, 38, 55, 48, 62, 58, 72, 68, 80, 75, 88].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-[hsl(82,85%,55%)]"
                      style={{ height: `${h}%`, opacity: 0.3 + (i / 12) * 0.7 }}
                    />
                  ))}
                </div>

                {/* Active deals card */}
                <div className="bg-primary-foreground/[0.03] border border-primary-foreground/5 rounded-xl p-4 mt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-primary-foreground/40 text-[10px] mb-1">Active Deals</p>
                      <p className="text-xl font-bold text-primary-foreground">1,248 <span className="text-[hsl(82,85%,55%)] text-xs font-medium">+85 this week</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Trusted logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="max-w-4xl mx-auto mt-20 px-6"
      >
        <p className="text-primary-foreground/25 text-[10px] tracking-[0.2em] uppercase text-center mb-6">
          Deployed across leading teams
        </p>
        <img
          src={trustedLogos}
          alt="Trusted by AnimeTattoos, Warrior Pipeline, AgencyLab, EasyGrow, GymLaunch, Impression"
          className="w-full max-w-3xl mx-auto opacity-50 hover:opacity-70 transition-opacity"
        />
      </motion.div>
    </section>
  );
};

export default SalesAgentsHero;
