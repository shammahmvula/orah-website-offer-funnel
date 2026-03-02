import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { ClickFunnelQuestionCard } from './ClickFunnelQuestionCard';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  'Facebook or Instagram',
  'Google Search',
  'A friend or colleague',
  'I saw your work online',
  'Other',
];

export function Q1HeardAboutQuestion() {
  const { data, updateData, setCurrentQuestion } = useClickFunnel();

  const handleSelect = (option: string) => {
    updateData('heardAbout', option);
    setTimeout(() => setCurrentQuestion(2), 300);
  };

  return (
    <ClickFunnelQuestionCard
      question="How did you find us?"
      subtitle="We'd love to know what brought you here."
    >
      <div className="space-y-3">
        {options.map(option => (
          <AnswerOption
            key={option}
            label={option}
            selected={data.heardAbout === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </ClickFunnelQuestionCard>
  );
}
