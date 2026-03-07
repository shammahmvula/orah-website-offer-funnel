import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    company: "PropTech Co",
    quote: "Our outbound motion was always strong under the hood, but we struggled to scale it efficiently. Now with ORAH, the workflow feels sharp, autonomous, and incredibly intuitive — it's transformed our sales process.",
    name: "Thabo Molefe",
    role: "Head of Sales",
  },
  {
    company: "FinServe SA",
    quote: "We knew our product was solid, but our reach didn't reflect that. After deploying ORAH, meetings got easier to book, and prospects finally understood the value proposition instantly.",
    name: "Ayesha Patel",
    role: "CEO",
  },
  {
    company: "LogiFlow",
    quote: "We came in with a manual process and left with a system that feels completely aligned with our growth targets. ORAH really understood our market and turned that into measurable pipeline.",
    name: "Jacques van Wyk",
    role: "VP of Growth",
  },
];

const metrics = [
  { value: "60%", label: "Follow-up time reduction" },
  { value: "R2.3M", label: "Annual efficiency savings" },
  { value: "5×", label: "Pipeline growth" },
  { value: "95%", label: "Lead-to-reply accuracy" },
  { value: "4.6×", label: "Conversation frequency" },
  { value: "<2min", label: "Avg response time" },
];

const SalesAgentsTestimonials = () => {
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
        <p className="text-[hsl(82,85%,55%)] text-xs tracking-[0.2em] uppercase font-medium mb-3">03. Results</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Loved by modern<br />sales teams.
          </h2>
          <p className="text-primary-foreground/45 text-sm max-w-sm leading-relaxed">
            See how high-growth South African companies are scaling with ORAH.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-primary-foreground/[0.03] border border-primary-foreground/8 rounded-2xl flex flex-col"
            >
              <p className="text-primary-foreground/20 font-bold text-xs tracking-wider mb-4">⚡ {t.company}</p>
              <span className="text-[hsl(82,85%,55%)]/30 text-4xl font-serif leading-none mb-3">"</span>
              <p className="text-primary-foreground/60 text-sm leading-relaxed flex-1 -mt-2">{t.quote}</p>
              <div className="mt-6 pt-4 border-t border-primary-foreground/5">
                <p className="text-primary-foreground text-sm font-semibold">{t.name}</p>
                <p className="text-primary-foreground/30 text-xs">{t.role}, {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-center p-4 bg-primary-foreground/[0.03] border border-primary-foreground/8 rounded-xl"
            >
              <p className="text-xl md:text-2xl font-black text-primary-foreground mb-1">{m.value}</p>
              <p className="text-primary-foreground/35 text-[10px] md:text-xs leading-tight">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SalesAgentsTestimonials;
