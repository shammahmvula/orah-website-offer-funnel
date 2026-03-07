import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, Zap, TrendingUp, Clock, Phone, MessageSquare, ChevronDown, Check } from "lucide-react";
import StarBackground from "@/components/website/StarBackground";
import TypingEffect from "@/components/website/TypingEffect";
import orahLogo from "@/assets/orah-logo.png";
import { Link } from "react-router-dom";

const stats = [
  { value: "5×", label: "More conversations per rep", icon: MessageSquare },
  { value: "24/7", label: "Always-on outreach", icon: Clock },
  { value: "73%", label: "Lower cost per lead", icon: TrendingUp },
  { value: "<2min", label: "Average response time", icon: Zap },
];

const features = [
  {
    title: "Instant Lead Response",
    description: "Your AI agent responds to every inbound lead within seconds — no more lost opportunities from slow follow-ups.",
    icon: Phone,
  },
  {
    title: "Automated Outbound",
    description: "Send personalised WhatsApp and email sequences at scale. Your AI agent never forgets to follow up.",
    icon: MessageSquare,
  },
  {
    title: "Qualification on Autopilot",
    description: "Your AI asks the right questions, scores leads, and only sends qualified prospects to your sales team.",
    icon: Bot,
  },
  {
    title: "CRM Integration",
    description: "Syncs with your existing tools — HubSpot, Salesforce, Google Sheets, or any CRM you already use.",
    icon: TrendingUp,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "R4,500",
    period: "/month",
    description: "For solo reps and small teams getting started",
    features: ["1 AI sales agent", "500 conversations/month", "WhatsApp + Email", "Basic CRM sync", "Business hours support"],
    popular: false,
  },
  {
    name: "Growth",
    price: "R9,500",
    period: "/month",
    description: "For growing teams ready to scale outreach",
    features: ["3 AI sales agents", "2,000 conversations/month", "WhatsApp + Email + SMS", "Advanced CRM integration", "Custom scripts & flows", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large sales orgs with complex needs",
    features: ["Unlimited agents", "Unlimited conversations", "All channels", "Dedicated account manager", "Custom AI training", "SLA guarantee"],
    popular: false,
  },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const SalesAgents = () => {
  const [typingDone, setTypingDone] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen w-full text-primary-foreground">
      <StarBackground />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-cosmic-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src={orahLogo} alt="ORAH" className="w-8 h-8" />
          <span className="font-bold text-lg tracking-wide text-primary-foreground">ORAH</span>
        </div>
        <button
          onClick={scrollToCTA}
          className="px-5 py-2 bg-cosmic-purple text-primary-foreground text-sm font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-primary-foreground/50 text-sm md:text-base tracking-widest uppercase mb-4"
        >
          AI-Powered Sales for South African Teams
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight max-w-4xl mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Your Sales Team
          <br />
          Never <span className="italic text-cosmic-purple" style={{ fontFamily: "'Playfair Display', serif" }}>Sleeps</span> Again.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-primary-foreground/55 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
        >
          AI sales agents that respond, qualify, and book meetings for your team — on WhatsApp, email, and phone — 24/7.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={scrollToCTA}
          className="px-8 py-4 bg-cosmic-purple text-primary-foreground font-semibold text-lg rounded-lg glow-white hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          See How It Works →
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </section>

      {/* Typing Pitch */}
      <Section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-primary-foreground/30 text-xs font-mono">ai-agent.log</span>
            </div>
            <TypingEffect
              text="Right now, your competitors are responding to leads in under 60 seconds. Your team? They're in meetings, on lunch, or asleep. Every minute a lead waits, the chance of conversion drops by 50%. That's not a stat — that's your revenue walking out the door. Our AI agents don't wait. They respond instantly, qualify intelligently, and book meetings while your team focuses on closing."
              speed={25}
              onComplete={() => setTypingDone(true)}
              className="[&_p]:text-primary-foreground/80 [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-relaxed [&_p]:font-mono"
            />
            {typingDone && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-cosmic-purple font-semibold text-sm font-mono"
              >
                → Ready to deploy. Waiting for your command._
              </motion.p>
            )}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
            >
              <stat.icon className="w-6 h-6 text-cosmic-purple mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-black text-primary-foreground mb-1">{stat.value}</p>
              <p className="text-primary-foreground/50 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-black text-center mb-4 tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            What Your AI Agent <span className="italic text-cosmic-purple" style={{ fontFamily: "'Playfair Display', serif" }}>Actually</span> Does
          </h2>
          <p className="text-primary-foreground/50 text-center max-w-lg mx-auto mb-14">
            Not another chatbot. A trained sales agent that understands your business and closes deals.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-cosmic-purple/30 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-cosmic-purple mb-4" />
                <h3 className="text-lg font-bold text-primary-foreground mb-2">{feature.title}</h3>
                <p className="text-primary-foreground/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-black text-center mb-4 tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-primary-foreground/50 text-center max-w-lg mx-auto mb-14">
            No setup fees. No long-term contracts. Cancel anytime.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative p-8 rounded-2xl border backdrop-blur-sm ${
                  plan.popular
                    ? "bg-cosmic-purple/10 border-cosmic-purple/40 scale-[1.02]"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cosmic-purple text-primary-foreground text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-primary-foreground mb-1">{plan.name}</h3>
                <p className="text-primary-foreground/40 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-primary-foreground">{plan.price}</span>
                  <span className="text-primary-foreground/40 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-primary-foreground/70">
                      <Check className="w-4 h-4 text-cosmic-purple flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToCTA}
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-cosmic-purple text-primary-foreground hover:scale-105"
                      : "bg-white/10 text-primary-foreground hover:bg-white/15"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="relative z-10 py-24 px-6">
        <div ref={ctaRef} className="max-w-lg mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-black mb-4 tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ready to <span className="italic text-cosmic-purple" style={{ fontFamily: "'Playfair Display', serif" }}>Automate</span> Your Sales?
          </h2>
          <p className="text-primary-foreground/50 mb-8 max-w-md mx-auto">
            Book a free 15-minute demo and see your AI sales agent in action — built for your business.
          </p>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-cosmic-purple text-primary-foreground font-semibold text-lg rounded-lg glow-white hover:scale-105 transition-all duration-200"
          >
            Book Your Free Demo →
          </a>
          <p className="text-primary-foreground/30 text-xs mt-4">No commitment. No card required.</p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-primary-foreground/30 text-xs border-t border-white/5">
        <span>© 2025 ORAH · <Link to="/website/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></span>
      </footer>
    </main>
  );
};

export default SalesAgents;
