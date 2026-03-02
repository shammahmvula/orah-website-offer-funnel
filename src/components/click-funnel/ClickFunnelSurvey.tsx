import { AnimatePresence } from 'framer-motion';
import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { ProgressBar } from '../survey/ProgressBar';
import { ClickFunnelLayout } from './ClickFunnelLayout';
import { Q1HeardAboutQuestion } from './Q1HeardAboutQuestion';
import { Q2SeriousnessQuestion } from './Q2SeriousnessQuestion';
import { Q3MotivationQuestion } from './Q3MotivationQuestion';
import { Q4BudgetQuestion } from './Q4BudgetQuestion';
import { Q5ContactQuestion } from './Q5ContactQuestion';
import { ClickFunnelSuccessPage } from './ClickFunnelSuccessPage';
import { ClickFunnelDisqualifiedPage } from './ClickFunnelDisqualifiedPage';

const TOTAL_QUESTIONS = 5;

export function ClickFunnelSurvey() {
  const { currentQuestion, isCompleted, isDisqualified } = useClickFunnel();

  if (isCompleted) return <ClickFunnelSuccessPage />;
  if (isDisqualified) return <ClickFunnelDisqualifiedPage />;

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1: return <Q1HeardAboutQuestion />;
      case 2: return <Q2SeriousnessQuestion />;
      case 3: return <Q3MotivationQuestion />;
      case 4: return <Q4BudgetQuestion />;
      case 5: return <Q5ContactQuestion />;
      default: return <Q1HeardAboutQuestion />;
    }
  };

  return (
    <ClickFunnelLayout>
      <div className="w-full max-w-lg mx-auto">
        <div className="mb-4 bg-white/10 backdrop-blur-sm rounded-xl py-3 px-4">
          <div className="max-w-lg mx-auto">
            <p className="text-sm text-primary-foreground/70 mb-2 text-center">
              Question {currentQuestion} of {TOTAL_QUESTIONS} • {Math.round((currentQuestion / TOTAL_QUESTIONS) * 100)}% Complete
            </p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentQuestion / TOTAL_QUESTIONS) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {renderQuestion()}
        </AnimatePresence>
      </div>
    </ClickFunnelLayout>
  );
}
