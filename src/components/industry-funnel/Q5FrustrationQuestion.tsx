import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  'New competitors getting more calls than me',
  'Phone used to ring more than it does now',
  'Customers find me by word-of-mouth but not Google',
  'Need better online presence but don\'t know where to start',
];

export function Q5FrustrationQuestion() {
  const { updateData, setCurrentQuestion } = useIndustryFunnel();

  const handleSelect = (option: string) => {
    updateData('frustration', option);
    setTimeout(() => setCurrentQuestion(6), 300);
  };

  return (
    <IndustryQuestionCard question="What's your biggest frustration right now?">
      <div className="space-y-3">
        {options.map(o => (
          <AnswerOption key={o} label={o} onClick={() => handleSelect(o)} />
        ))}
      </div>
    </IndustryQuestionCard>
  );
}
