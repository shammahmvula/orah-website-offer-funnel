import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface QuestionCardProps {
  question: string;
  preText?: string;
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

export function QuestionCard({ question, preText, children, showBack, onBack }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-7.5rem)] pt-6 pb-12 px-4"
    >
      <div className="max-w-lg mx-auto">
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
        )}

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
