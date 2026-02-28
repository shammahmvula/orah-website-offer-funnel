import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IndustryQuestionCardProps {
  question: string;
  subhead?: string;
  children: ReactNode;
}

export function IndustryQuestionCard({ question, subhead, children }: IndustryQuestionCardProps) {
  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto px-4 py-8"
    >
      <div className="card-premium space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {question}
          </h2>
          {subhead && (
            <p className="text-muted-foreground mt-2 text-base">{subhead}</p>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
}
