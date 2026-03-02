import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { QuestionCard } from '../survey/QuestionCard';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  "I want to outshine my competitors",
  "I want a website I'm proud to show customers",
  "I need more leads and sales from my site",
  "My current website is embarrassing",
  "I want to look as professional as I really am",
];

export function Q3MotivationQuestion() {
  const { data, updateData, setCurrentQuestion } = useClickFunnel();

  const handleSelect = (option: string) => {
    updateData('motivation', option);
    setTimeout(() => setCurrentQuestion(4), 300);
  };

  return (
    <QuestionCard question="What's the #1 reason you want a new website?">
      <p className="text-muted-foreground mb-6 text-sm">
        Pick the one that hits closest to home.
      </p>
      <div className="space-y-3">
        {options.map(option => (
          <AnswerOption
            key={option}
            label={option}
            selected={data.motivation === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionCard>
  );
}
