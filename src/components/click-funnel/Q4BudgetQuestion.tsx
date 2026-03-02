import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { QuestionCard } from '../survey/QuestionCard';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  "Yes, I'm ready to invest",
  "Not right now",
];

export function Q4BudgetQuestion() {
  const { data, updateData, setCurrentQuestion, setIsDisqualified } = useClickFunnel();

  const handleSelect = (option: string) => {
    updateData('budget', option);
    if (option === 'Not right now') {
      setTimeout(() => setIsDisqualified(true), 300);
    } else {
      setTimeout(() => setCurrentQuestion(5), 300);
    }
  };

  return (
    <QuestionCard question="Do you have at least R1,000 to invest in your website rebuild?">
      <p className="text-muted-foreground mb-6 text-sm">
        This helps us make sure we can deliver real value for your budget.
      </p>
      <div className="space-y-3">
        {options.map(option => (
          <AnswerOption
            key={option}
            label={option}
            selected={data.budget === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionCard>
  );
}
