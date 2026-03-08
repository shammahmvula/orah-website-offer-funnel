import { forwardRef } from "react";
import { motion } from "framer-motion";

interface SalesAgentsCTAProps {
  onBookDemo: () => void;
}

const SalesAgentsCTA = forwardRef<HTMLDivElement, SalesAgentsCTAProps>(({ onBookDemo }, ref) => {
  return (
    <section className="relative z-10 py-32 px-6">
      {/* Bold closing statement */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="text-primary-foreground/20">AI is here.</span>{" "}
          <span className="text-primary-foreground/40">Most will react.</span>
          <br />
          <span className="text-[hsl(82,85%,55%)]">The few with a plan will lead.</span>
        </motion.h2>
      </div>

      {/* CTA box */}
      <div ref={ref} className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-primary-foreground/50 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Book a free 15-minute demo and see your AI sales agent in action — built for your business, your market, your team.
          </p>
          <button
            onClick={onBookDemo}
            className="inline-block px-10 py-4 bg-[hsl(82,85%,55%)] text-[hsl(240,25%,4%)] font-bold text-base rounded-lg hover:brightness-110 transition-all"
          >
            Book Your Free Demo →
          </button>
          <p className="text-primary-foreground/25 text-xs mt-4">No commitment. No card required.</p>
        </motion.div>
      </div>
    </section>
  );
});

SalesAgentsCTA.displayName = "SalesAgentsCTA";

export default SalesAgentsCTA;
