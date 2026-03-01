import { AnimatePresence } from 'framer-motion';
import { useFunnel2 } from '@/contexts/Funnel2Context';
import { ProgressBar } from '../survey/ProgressBar';
import { Funnel2IndustryQuestion } from './Funnel2IndustryQuestion';
import { Funnel2RevenueQuestion } from './Funnel2RevenueQuestion';
import { Funnel2InvestmentQuestion } from './Funnel2InvestmentQuestion';
import { Funnel2MotivationQuestion } from './Funnel2MotivationQuestion';
import { Funnel2DepositQuestion } from './Funnel2DepositQuestion';
import { Funnel2ContactQuestion } from './Funnel2ContactQuestion';

const TOTAL_QUESTIONS = 6;

export function Funnel2Survey() {
  const { currentQuestion } = useFunnel2();

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1: return <Funnel2IndustryQuestion />;
      case 2: return <Funnel2RevenueQuestion />;
      case 3: return <Funnel2InvestmentQuestion />;
      case 4: return <Funnel2MotivationQuestion />;
      case 5: return <Funnel2DepositQuestion />;
      case 6: return <Funnel2ContactQuestion />;
      default: return <Funnel2IndustryQuestion />;
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
