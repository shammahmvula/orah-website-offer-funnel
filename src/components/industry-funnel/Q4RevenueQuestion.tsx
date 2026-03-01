import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  "Under R20,000/month",
  "R20,000 - R50,000/month",
  "R50,000 - R100,000/month",
  "R100,000 - R250,000/month",
  "R250,000+/month",
  "Prefer not to say",
];

export function Q4RevenueQuestion() {
  const { updateData, setCurrentQuestion, personalizeText } = useIndustryFunnel();

  const handleSelect = (option: string) => {
    updateData('monthlyRevenue', option);
    setTimeout(() => setCurrentQuestion(5), 300);
  };

  return (
    <IndustryQuestionCard
      question={personalizeText("Roughly, what does your {industry} business generate per month?")}
    >
      <div className="space-y-3">
        {options.map(o => (
          <AnswerOption key={o} label={o} onClick={() => handleSelect(o)} />
        ))}
      </div>
    </IndustryQuestionCard>
  );
}
