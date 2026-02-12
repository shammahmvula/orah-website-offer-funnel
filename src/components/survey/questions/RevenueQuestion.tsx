import { QuestionCard } from '../QuestionCard';
import { AnswerOption } from '../AnswerOption';
import { useSurvey } from '@/contexts/SurveyContext';

const options = [
  "Under R20,000/month",
  "R20,000 - R50,000/month",
  "R50,000 - R100,000/month",
  "R100,000 - R250,000/month",
  "R250,000+/month",
  "Prefer not to say",
];

export function RevenueQuestion() {
  const { updateSurveyData, setCurrentQuestion } = useSurvey();

  const handleSelect = (option: string) => {
    updateSurveyData('monthlyRevenue', option);
    setTimeout(() => setCurrentQuestion(4), 300);
  };

  return (
    <QuestionCard
      question="Roughly, what does your business generate per month?"
    >
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
