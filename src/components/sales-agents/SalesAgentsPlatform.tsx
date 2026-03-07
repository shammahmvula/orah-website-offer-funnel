import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Globe, Code, Phone, MessageSquare } from "lucide-react";

const capabilities = [
  { icon: Zap, label: "Instant Deployment", desc: "Go from signup to active prospecting in under 5 minutes." },
  { icon: Shield, label: "Enterprise Security", desc: "Your data stays protected with bank-grade encryption." },
  { icon: Globe, label: "SA Optimised", desc: "Built for South African time zones, currencies, and networks." },
  { icon: Code, label: "API First", desc: "Full programmatic access to every feature." },
  { icon: Phone, label: "WhatsApp Native", desc: "Your agent speaks the channel your customers live on." },
  { icon: MessageSquare, label: "Multi-Channel", desc: "Email, SMS, WhatsApp, and phone — all from one agent." },
];

const SalesAgentsPlatform = () => {
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
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-[hsl(82,85%,55%)] text-xs tracking-[0.2em] uppercase font-medium mb-3">01. Platform</p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Automate your entire<br />
              revenue stack.
            </h2>
          </div>
          <p className="text-primary-foreground/45 text-sm md:text-base max-w-sm leading-relaxed">
            Deploy autonomous agents, intelligent workflows, and smart routing to scale your sales motion without adding headcount.
          </p>
        </div>

        {/* Separator */}
        <div className="h-px bg-primary-foreground/10 mb-12" />

        {/* Core Engine */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[hsl(82,85%,55%)] text-xs">⚙</span>
            <span className="text-[hsl(82,85%,55%)] text-xs tracking-[0.15em] uppercase font-medium">Core Engine</span>
          </div>
          <h3
            className="text-2xl md:text-3xl font-black tracking-tight mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Built for speed.
          </h3>
          <p className="text-primary-foreground/45 text-sm max-w-md leading-relaxed">
            Engineered to handle enterprise volume without losing the human touch. Our architecture scales with your demand.
          </p>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 border border-primary-foreground/8 rounded-xl hover:border-[hsl(82,85%,55%)]/20 transition-colors group"
            >
              <cap.icon className="w-5 h-5 text-primary-foreground/30 group-hover:text-[hsl(82,85%,55%)] transition-colors mb-3" />
              <p className="text-sm font-semibold text-primary-foreground mb-1">{cap.label}</p>
              <p className="text-primary-foreground/35 text-xs leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SalesAgentsPlatform;
