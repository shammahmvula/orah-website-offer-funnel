import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { QuestionCard } from '../survey/QuestionCard';
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
    <QuestionCard question="How did you find us?">
      <p className="text-muted-foreground mb-6 text-sm">
        We'd love to know what brought you here.
      </p>
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
    </QuestionCard>
  );
}
