import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "R4,500",
    period: "/month",
    description: "Perfect for solo reps getting started.",
    features: ["1 AI sales agent", "500 conversations/month", "WhatsApp + Email", "Basic CRM sync", "Business hours support"],
    popular: false,
  },
  {
    name: "Growth",
    price: "R9,500",
    period: "/month",
    description: "For scaling teams that need more power.",
    features: ["3 AI sales agents", "2,000 conversations/month", "WhatsApp + Email + SMS", "Advanced CRM integration", "Custom scripts & flows", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large sales orgs with complex needs.",
    features: ["Unlimited agents", "Unlimited conversations", "All channels", "Dedicated account manager", "Custom AI training", "SLA guarantee"],
    popular: false,
  },
];

interface SalesAgentsPricingProps {
  onScrollToCTA: () => void;
}

const SalesAgentsPricing = ({ onScrollToCTA }: SalesAgentsPricingProps) => {
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
        <p className="text-[hsl(82,85%,55%)] text-xs tracking-[0.2em] uppercase font-medium mb-3">04. Pricing</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Transparent pricing.
          </h2>
          <p className="text-primary-foreground/45 text-sm max-w-sm leading-relaxed">
            Start small and scale as you grow. No hidden fees. No setup costs. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`relative p-7 rounded-2xl border flex flex-col ${
                plan.popular
                  ? "bg-[hsl(82,85%,55%)]/[0.06] border-[hsl(82,85%,55%)]/30"
                  : "bg-primary-foreground/[0.03] border-primary-foreground/8"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 px-3 py-1 bg-[hsl(82,85%,55%)] text-[hsl(240,25%,4%)] text-[10px] font-bold rounded-full tracking-wider uppercase">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-primary-foreground mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{plan.name}</h3>
              <p className="text-primary-foreground/35 text-xs mb-5">{plan.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-black text-primary-foreground">{plan.price}</span>
                <span className="text-primary-foreground/35 text-sm">{plan.period}</span>
              </div>

              <div className="h-px bg-primary-foreground/8 mb-5" />

              <p className="text-primary-foreground/40 text-[10px] tracking-wider uppercase font-medium mb-3">What's included</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-primary-foreground/60">
                    <Check className="w-3.5 h-3.5 text-[hsl(82,85%,55%)] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onScrollToCTA}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-[hsl(82,85%,55%)] text-[hsl(240,25%,4%)] hover:brightness-110"
                    : "bg-primary-foreground/8 text-primary-foreground hover:bg-primary-foreground/12"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SalesAgentsPricing;
