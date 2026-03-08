import n8nLogo from "@/assets/logos/n8n-logo.png";
import zapierLogo from "@/assets/logos/zapier-logo.png";
import anthropicLogo from "@/assets/logos/anthropic-logo.png";
import retellLogo from "@/assets/logos/retell-logo.png";
import { motion } from "framer-motion";

const logos = [
  { src: n8nLogo, alt: "n8n" },
  { src: zapierLogo, alt: "Zapier" },
  { src: anthropicLogo, alt: "Anthropic" },
  { src: retellLogo, alt: "Retell AI" },
];

const SalesAgentsLogoStrip = () => {
  return (
    <section className="relative z-10 -mt-8 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-primary-foreground/30 text-xs tracking-[0.2em] uppercase mb-8">
          Powered by industry-leading tools
        </p>
        <div className="flex items-center justify-center gap-12 sm:gap-20 flex-wrap">
          {logos.map((logo, i) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-12 sm:h-14 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesAgentsLogoStrip;
