import { QuestionCard } from '../survey/QuestionCard';
import { AnswerOption } from '../survey/AnswerOption';
import { useShortFunnel } from '@/contexts/ShortFunnelContext';

const options = [
  "Under R20,000/month",
  "R20,000 - R50,000/month",
  "R50,000 - R100,000/month",
  "R100,000 - R250,000/month",
  "R250,000+/month",
  "Prefer not to say",
];

export function ShortRevenueQuestion() {
  const { updateSurveyData, setCurrentQuestion } = useShortFunnel();

  const handleSelect = (option: string) => {
    updateSurveyData('monthlyRevenue', option);
    setTimeout(() => setCurrentQuestion(2), 300);
  };

  return (
    <QuestionCard question="Roughly, what does your business generate per month?">
      <div className="space-y-3">
        {options.map((option) => (
          <AnswerOption
            key={option}
            label={option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionCard>
  );
}
