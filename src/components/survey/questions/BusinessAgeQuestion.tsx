import { QuestionCard } from '../QuestionCard';
import { AnswerOption } from '../AnswerOption';
import { useSurvey } from '@/contexts/SurveyContext';

const options = [
  "Just getting started (less than 1 year)",
  "1-3 years (building momentum)",
  "3-5 years (established)",
  "5-10 years (proven track record)",
  "10+ years (industry veteran)",
];

export function BusinessAgeQuestion() {
  const { updateSurveyData, setCurrentQuestion } = useSurvey();

  const handleSelect = (option: string) => {
    updateSurveyData('businessAge', option);
    setTimeout(() => setCurrentQuestion(3), 300);
  };

  return (
    <QuestionCard
      question="How long have you been running your business?"
      showBack
      onBack={() => setCurrentQuestion(1)}
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
