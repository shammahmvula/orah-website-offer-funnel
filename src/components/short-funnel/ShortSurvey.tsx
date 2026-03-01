import { AnimatePresence } from 'framer-motion';
import { useShortFunnel } from '@/contexts/ShortFunnelContext';
import { ProgressBar } from '../survey/ProgressBar';
import { ShortIndustryQuestion } from './ShortIndustryQuestion';
import { ShortRevenueQuestion } from './ShortRevenueQuestion';
import { ShortInvestmentQuestion } from './ShortInvestmentQuestion';
import { ShortMotivationQuestion } from './ShortMotivationQuestion';
import { ShortDepositQuestion } from './ShortDepositQuestion';
import { ShortContactQuestion } from './ShortContactQuestion';

const TOTAL_QUESTIONS = 6;

export function ShortSurvey() {
  const { currentQuestion } = useShortFunnel();

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1: return <ShortIndustryQuestion />;
      case 2: return <ShortRevenueQuestion />;
      case 3: return <ShortInvestmentQuestion />;
      case 4: return <ShortMotivationQuestion />;
      case 5: return <ShortDepositQuestion />;
      case 6: return <ShortContactQuestion />;
      default: return <ShortIndustryQuestion />;
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
