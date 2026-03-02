import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ClickFunnelQuestionCardProps {
  question: string;
  subtitle?: string;
  children: ReactNode;
}

export function ClickFunnelQuestionCard({ question, subtitle, children }: ClickFunnelQuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg"
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="font-serif text-xl md:text-2xl text-foreground mb-2 leading-snug">
          {question}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {subtitle}
          </p>
        )}
        {!subtitle && <div className="mb-5" />}
        {children}
      </div>
    </motion.div>
  );
}
