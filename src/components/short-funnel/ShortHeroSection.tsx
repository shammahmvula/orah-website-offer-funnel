import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useShortFunnel } from '@/contexts/ShortFunnelContext';

const valueStack = [
  "Mobile-optimized for every device",
  "Done in 7 days or less",
  "Flexible payment options available",
];

export function ShortHeroSection() {
  const { setShowSurvey } = useShortFunnel();
  const [isLoading, setIsLoading] = useState(false);

  const handleCTA = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSurvey(true);
    }, 500);
  };

  return (
    <section className="min-h-screen pt-16 pb-12 px-4 flex flex-col justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-lg mx-auto w-full">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-center leading-tight mb-4">
          Still embarrassed to show customers your website?
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-muted-foreground text-center text-lg mb-8">
          We're building bespoke websites for 50 South African businesses. No templates. No subscriptions. Just a stunning website in 7 days.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="card-premium text-left mb-8 space-y-3">
          <p className="text-foreground font-semibold text-sm">Why businesses choose us over DIY:</p>
          <ul className="text-sm text-muted-foreground space-y-1 pl-4">
            <li>• Agencies charge <span className="text-foreground font-semibold">5–10x more</span> for the same result</li>
            <li>• DIY takes <span className="text-foreground font-semibold">months</span> and still looks homemade</li>
            <li>• We deliver a <span className="text-foreground font-semibold">professional, bespoke website</span> in just 7 days</li>
          </ul>
          <p className="text-accent font-bold text-sm pt-2 border-t border-border">
            Apply in 2 minutes to see if you qualify for our limited offer.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-3 mb-8">
          {valueStack.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-success" />
              </div>
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <button onClick={handleCTA} disabled={isLoading} className="btn-primary disabled:opacity-90">
            {isLoading ? "CHECKING AVAILABILITY..." : "SEE IF YOU QUALIFY →"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
