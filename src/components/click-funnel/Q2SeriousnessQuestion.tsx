import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { QuestionCard } from '../survey/QuestionCard';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  "Yes, I'm ready to get started",
  "I'm exploring my options",
  "Just browsing for now",
];

export function Q2SeriousnessQuestion() {
  const { data, updateData, setCurrentQuestion, setIsDisqualified } = useClickFunnel();

  const handleSelect = (option: string) => {
    updateData('seriousness', option);
    if (option === 'Just browsing for now') {
      setTimeout(() => setIsDisqualified(true), 300);
    } else {
      setTimeout(() => setCurrentQuestion(3), 300);
    }
  };

  return (
    <QuestionCard question="Are you serious about upgrading your online presence?">
      <p className="text-muted-foreground mb-6 text-sm">
        We only take on a handful of projects each month to guarantee quality.
      </p>
      <div className="space-y-3">
        {options.map(option => (
          <AnswerOption
            key={option}
            label={option}
            selected={data.seriousness === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionCard>
  );
}
