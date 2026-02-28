import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  'Just starting (0–1 years)',
  'Getting established (1–3 years)',
  'Experienced (3–10 years)',
  'Industry veteran (10+ years)',
];

export function Q3BusinessAgeQuestion() {
  const { updateData, setCurrentQuestion, personalizeText } = useIndustryFunnel();

  const handleSelect = (option: string) => {
    updateData('businessAge', option);
    setTimeout(() => setCurrentQuestion(4), 300);
  };

  return (
    <IndustryQuestionCard
      question={personalizeText("How long have you been running your {industry} business?")}
    >
      <div className="space-y-3">
        {options.map(o => (
          <AnswerOption key={o} label={o} onClick={() => handleSelect(o)} />
        ))}
      </div>
    </IndustryQuestionCard>
  );
}
