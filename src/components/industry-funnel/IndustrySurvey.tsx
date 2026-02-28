import { AnimatePresence } from 'framer-motion';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { ProgressBar } from '../survey/ProgressBar';
import { Q1IndustryQuestion } from './Q1IndustryQuestion';
import { Q2LocationQuestion } from './Q2LocationQuestion';
import { Q3BusinessAgeQuestion } from './Q3BusinessAgeQuestion';
import { Q4WebsiteSituationQuestion } from './Q4WebsiteSituationQuestion';
import { Q5FrustrationQuestion } from './Q5FrustrationQuestion';
import { Q6InvestmentQuestion } from './Q6InvestmentQuestion';
import { Q7StyleQuestion } from './Q7StyleQuestion';
import { Q8FeaturesQuestion } from './Q8FeaturesQuestion';
import { Q9MotivationQuestion } from './Q9MotivationQuestion';
import { Q10ContactQuestion } from './Q10ContactQuestion';
import { IndustryResultsPage } from './IndustryResultsPage';
import { IndustryDisqualifiedPage } from './IndustryDisqualifiedPage';

const TOTAL_QUESTIONS = 10;

export function IndustrySurvey() {
  const { currentQuestion, isDisqualified, isCompleted } = useIndustryFunnel();

  if (isCompleted) return <IndustryResultsPage />;
  if (isDisqualified) return <IndustryDisqualifiedPage />;

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1: return <Q1IndustryQuestion />;
      case 2: return <Q2LocationQuestion />;
      case 3: return <Q3BusinessAgeQuestion />;
      case 4: return <Q4WebsiteSituationQuestion />;
      case 5: return <Q5FrustrationQuestion />;
      case 6: return <Q6InvestmentQuestion />;
      case 7: return <Q7StyleQuestion />;
      case 8: return <Q8FeaturesQuestion />;
      case 9: return <Q9MotivationQuestion />;
      case 10: return <Q10ContactQuestion />;
      default: return <Q1IndustryQuestion />;
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
