import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowDown } from 'lucide-react';
import { useSurvey } from '@/contexts/SurveyContext';

const valueStack = [
  "Custom bespoke design (normally R20,000+)",
  "Mobile-optimized for every device",
  "Done in 7 days or less",
  "FREE design mockup worth R3,500",
  "One-time payment - no monthly fees ever",
];

export function HeroSection() {
  const { setShowSurvey } = useSurvey();
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
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-center leading-tight mb-4"
        >
          Still embarrassed to show customers your website?
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-center text-lg mb-8"
        >
          We're building bespoke websites for 50 South African businesses at 75% off. No templates. No subscriptions. Just a stunning website in 7 days.
        </motion.p>

        {/* Price Anchor Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-premium text-center mb-8"
        >
          <span className="text-muted-foreground line-through text-xl">R20,000</span>
          <ArrowDown className="w-5 h-5 mx-auto my-2 text-muted-foreground" />
          <span className="block text-accent text-4xl font-bold font-serif">R5,000 once-off</span>
        </motion.div>

        {/* Price Justification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="card-premium text-left mb-8 space-y-3"
        >
          <p className="text-foreground font-semibold text-sm">Think about what R5,000 really costs you:</p>
          <p className="text-muted-foreground text-sm">
            If your business makes R50,000/month, that's <span className="text-foreground font-semibold">3 DAYS</span> of revenue.
          </p>
          <p className="text-muted-foreground text-sm">
            For a website that could bring you customers for the next <span className="text-foreground font-semibold">5–10 years</span>.
          </p>
          <p className="text-foreground font-semibold text-sm mt-2">Compare that to hiring:</p>
          <ul className="text-sm text-muted-foreground space-y-1 pl-4">
            <li>• Junior developer: <span className="text-foreground">R180,000/year</span></li>
            <li>• Agency project: <span className="text-foreground">R25,000–R50,000</span></li>
            <li className="space-y-1">
              <span>• DIY + your time <span className="italic">(well let's see... so that's)</span>:</span>
              <ul className="pl-4 text-muted-foreground space-y-0.5 mt-1">
                <li>→ 47 hours watching YouTube tutorials</li>
                <li>→ 3 weeks choosing between Wix, WordPress & Squarespace</li>
                <li>→ R800/year for a page builder you'll cancel</li>
                <li>→ 6 months of <span className="italic">"I'll finish it this weekend"</span></li>
              </ul>
              <p className="text-foreground font-semibold mt-1">And after ALL that? Your customers can still tell you made it yourself.</p>
            </li>
          </ul>
          <p className="text-accent font-bold text-sm pt-2 border-t border-border">
            R5,000 once-off isn't an expense. It's the cheapest marketing asset you'll ever own.
          </p>
        </motion.div>

        {/* Value Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          {valueStack.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-success" />
              </div>
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={handleCTA}
            disabled={isLoading}
            className="btn-primary disabled:opacity-90"
          >
            {isLoading ? "CHECKING AVAILABILITY..." : "SEE IF YOU QUALIFY →"}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
