import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How is this different from a chatbot?",
    a: "Chatbots wait for customers to come to them and follow rigid scripts. Our AI sales agents proactively reach out to leads, hold natural conversations across WhatsApp, email, and phone, qualify prospects, and book meetings — just like a real SDR would.",
  },
  {
    q: "Will this work for my industry?",
    a: "We've built AI agents for property, financial services, SaaS, logistics, and more. If your sales process involves qualifying leads and booking meetings, our agents can handle it. We customise every agent to your specific industry language and sales flow.",
  },
  {
    q: "How long until we see results?",
    a: "Most teams see their first AI-booked meeting within the first week. Full ROI typically happens within 30 days as the agent learns your best-performing scripts and optimises automatically.",
  },
  {
    q: "What happens to leads the AI can't handle?",
    a: "The AI knows its limits. Complex or high-value conversations are immediately escalated to your human reps with full context — the lead never knows the difference. Your team gets warm, qualified handoffs.",
  },
  {
    q: "Do we need a big tech team to set this up?",
    a: "No. We handle the entire setup. You give us access to your CRM and messaging channels, and we configure, train, and deploy your AI agent. Most teams are live within 48 hours.",
  },
  {
    q: "Is our data safe?",
    a: "Absolutely. We use bank-grade encryption, never share data between clients, and comply with POPIA. Your customer conversations and data are yours — always.",
  },
];

const SalesAgentsFAQ = () => {
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
      <div className="max-w-3xl mx-auto">
        <p className="text-[hsl(82,85%,55%)] text-xs tracking-[0.2em] uppercase font-medium mb-3 text-center">05. FAQ</p>
        <h2
          className="text-3xl md:text-4xl font-black tracking-tight text-center mb-3"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          You've got questions.
        </h2>
        <p className="text-primary-foreground/45 text-sm text-center mb-12">We've got answers.</p>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-primary-foreground/8 rounded-xl px-5 bg-primary-foreground/[0.02] data-[state=open]:border-[hsl(82,85%,55%)]/20"
            >
              <AccordionTrigger className="text-sm font-sans font-medium text-primary-foreground/80 hover:text-primary-foreground py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-primary-foreground/45 text-sm leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

export default SalesAgentsFAQ;
