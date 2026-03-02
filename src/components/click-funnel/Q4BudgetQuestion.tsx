import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { ClickFunnelQuestionCard } from './ClickFunnelQuestionCard';
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
    <ClickFunnelQuestionCard
      question="Do you have at least R1,000 to invest in your website rebuild?"
      subtitle="This helps us make sure we can deliver real value for your budget."
    >
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
    </ClickFunnelQuestionCard>
  );
}
