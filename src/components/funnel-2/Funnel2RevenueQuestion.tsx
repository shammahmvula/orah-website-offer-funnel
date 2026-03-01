import { QuestionCard } from '../survey/QuestionCard';
import { AnswerOption } from '../survey/AnswerOption';
import { useFunnel2 } from '@/contexts/Funnel2Context';

const options = [
  "Under R20,000/month",
  "R20,000 - R50,000/month",
  "R50,000 - R100,000/month",
  "R100,000 - R250,000/month",
  "R250,000+/month",
];

export function Funnel2RevenueQuestion() {
  const { updateSurveyData, setCurrentQuestion, personalizeText } = useFunnel2();

  const handleSelect = (option: string) => {
    updateSurveyData('monthlyRevenue', option);
    setTimeout(() => setCurrentQuestion(3), 300);
  };

  return (
    <QuestionCard question={personalizeText("Roughly, what does your {industry} business generate per month?")}>
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
