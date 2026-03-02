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
        <div className="mb-4">
          <ProgressBar currentQuestion={currentQuestion} totalQuestions={TOTAL_QUESTIONS} />
        </div>
        <AnimatePresence mode="wait">
          {renderQuestion()}
        </AnimatePresence>
      </div>
    </ClickFunnelLayout>
  );
}
