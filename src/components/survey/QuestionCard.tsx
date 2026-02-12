import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface QuestionCardProps {
  question: string;
  preText?: string;
  children: ReactNode;
}

export function QuestionCard({ question, preText, children }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-7.5rem)] pt-6 pb-12 px-4"
    >
      <div className="max-w-lg mx-auto">
        <div className="card-premium">
          {preText && (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {preText}
            </p>
          )}
          <h2 className="font-serif text-2xl text-foreground mb-6">
            {question}
          </h2>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
