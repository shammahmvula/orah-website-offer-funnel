import { AnimatePresence } from 'framer-motion';
import { useShortFunnel } from '@/contexts/ShortFunnelContext';
import { ProgressBar } from '../survey/ProgressBar';
import { ShortRevenueQuestion } from './ShortRevenueQuestion';
import { ShortInvestmentQuestion } from './ShortInvestmentQuestion';
import { ShortMotivationQuestion } from './ShortMotivationQuestion';
import { ShortContactQuestion } from './ShortContactQuestion';

const TOTAL_QUESTIONS = 4;

export function ShortSurvey() {
  const { currentQuestion } = useShortFunnel();

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1: return <ShortRevenueQuestion />;
      case 2: return <ShortInvestmentQuestion />;
      case 3: return <ShortMotivationQuestion />;
      case 4: return <ShortContactQuestion />;
      default: return <ShortRevenueQuestion />;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-11">
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={TOTAL_QUESTIONS} />
      <AnimatePresence mode="wait">
        {renderQuestion()}
      </AnimatePresence>
    </div>
  );
}
