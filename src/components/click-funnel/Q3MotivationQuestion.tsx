import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { ClickFunnelQuestionCard } from './ClickFunnelQuestionCard';
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
    <ClickFunnelQuestionCard
      question="What's the #1 reason you want a new website?"
      subtitle="Pick the one that hits closest to home."
    >
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
    </ClickFunnelQuestionCard>
  );
}
