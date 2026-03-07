import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TypingEffect from "@/components/website/TypingEffect";

const SalesAgentsTypingPitch = () => {
  const [typingDone, setTypingDone] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative z-10 py-24 px-6"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-primary-foreground/[0.03] border border-primary-foreground/8 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            <span className="ml-3 text-primary-foreground/25 text-[10px] font-mono tracking-wider">ai-agent.log</span>
          </div>
          <TypingEffect
            text="Right now, your competitors are responding to leads in under 60 seconds. Your team? They're in meetings, on lunch, or asleep. Every minute a lead waits, the chance of conversion drops by 50%. That's not a stat — that's your revenue walking out the door. Our AI agents don't wait. They respond instantly, qualify intelligently, and book meetings while your team focuses on closing."
            speed={25}
            onComplete={() => setTypingDone(true)}
            className="[&_p]:text-primary-foreground/70 [&_p]:text-sm [&_p]:md:text-base [&_p]:leading-relaxed [&_p]:font-mono"
          />
          {typingDone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-[hsl(82,85%,55%)] font-semibold text-xs font-mono"
            >
              → Ready to deploy. Waiting for your command._
            </motion.p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SalesAgentsTypingPitch;
