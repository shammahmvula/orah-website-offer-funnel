import { AnimatePresence } from 'framer-motion';
import { useSurvey } from '@/contexts/SurveyContext';
import { ProgressBar } from './survey/ProgressBar';
import { LocationQuestion } from './survey/questions/LocationQuestion';
import { BusinessAgeQuestion } from './survey/questions/BusinessAgeQuestion';
import { RevenueQuestion } from './survey/questions/RevenueQuestion';
import { IndustryQuestion } from './survey/questions/IndustryQuestion';
import { SituationQuestion } from './survey/questions/SituationQuestion';
import { InvestmentQuestion } from './survey/questions/InvestmentQuestion';
import { MotivationQuestion } from './survey/questions/MotivationQuestion';
import { ContactQuestion } from './survey/questions/ContactQuestion';

const TOTAL_QUESTIONS = 8;

export function Survey() {
  const { currentQuestion } = useSurvey();

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1: return <LocationQuestion />;
      case 2: return <BusinessAgeQuestion />;
      case 3: return <RevenueQuestion />;
      case 4: return <IndustryQuestion />;
      case 5: return <SituationQuestion />;
      case 6: return <InvestmentQuestion />;
      case 7: return <MotivationQuestion />;
      case 8: return <ContactQuestion />;
      default: return <LocationQuestion />;
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
