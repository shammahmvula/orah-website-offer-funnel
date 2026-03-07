import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "1",
    title: "Connect",
    description: "We plug into your existing CRM, WhatsApp, and email systems. Your AI agent learns your product, objection handling, and ideal customer profile in hours — not weeks.",
  },
  {
    num: "2",
    title: "Deploy",
    description: "Your AI agent goes live across all channels. It responds to inbound leads instantly, runs personalised outbound sequences, and qualifies every prospect automatically.",
  },
  {
    num: "3",
    title: "Close",
    description: "Qualified meetings land on your reps' calendars. Your team focuses on what they do best — closing deals — while the AI handles everything before the handshake.",
  },
];

const SalesAgentsProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative z-10 py-28 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-[hsl(82,85%,55%)] text-xs tracking-[0.2em] uppercase font-medium mb-3">02. How It Works</p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Our process consists of{" "}
          <span className="italic text-[hsl(82,85%,55%)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            three things…
          </span>
        </h2>
        <p className="text-primary-foreground/45 text-sm max-w-lg mb-16 leading-relaxed">
          By the time we step back, it's not a project anymore — it's just how your sales team operates.
        </p>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-6 md:gap-10 p-6 md:p-8 bg-primary-foreground/[0.03] border border-primary-foreground/8 rounded-2xl hover:border-[hsl(82,85%,55%)]/20 transition-colors"
            >
              <span
                className="text-5xl md:text-7xl font-black text-[hsl(82,85%,55%)]/15 leading-none select-none flex-shrink-0"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {step.num}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-primary-foreground/45 text-sm md:text-base leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SalesAgentsProcess;
