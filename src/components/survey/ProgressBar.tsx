import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function ProgressBar({ currentQuestion, totalQuestions }: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-card border-b border-border py-3 px-4">
      <div className="max-w-lg mx-auto">
        <p className="text-sm text-muted-foreground mb-2 text-center">
          Question {currentQuestion} of {totalQuestions} • {Math.round(progress)}% Complete
        </p>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
