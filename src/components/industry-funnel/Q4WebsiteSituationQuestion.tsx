import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  '🚫 No website yet',
  '😬 Embarrassingly outdated',
  '📉 Doesn\'t bring customers',
  '😎 Decent but want better',
];

export function Q4WebsiteSituationQuestion() {
  const { updateData, setCurrentQuestion, personalizeText } = useIndustryFunnel();

  const handleSelect = (option: string) => {
    updateData('websiteSituation', option);
    setTimeout(() => setCurrentQuestion(6), 300);
  };

  return (
    <IndustryQuestionCard
      question={personalizeText("What's the current state of your {industry} website?")}
      subhead="Be honest — we've seen it all."
    >
      <div className="space-y-3">
        {options.map(o => (
          <AnswerOption key={o} label={o} onClick={() => handleSelect(o)} />
        ))}
      </div>
    </IndustryQuestionCard>
  );
}
