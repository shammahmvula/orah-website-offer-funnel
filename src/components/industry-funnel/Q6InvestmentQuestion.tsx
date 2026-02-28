import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { AnswerOption } from '../survey/AnswerOption';

const options = [
  { label: "✅ Yes, I'm ready", disqualify: false },
  { label: "🤔 Maybe, if the design is right", disqualify: false },
  { label: "❌ No, just browsing", disqualify: true },
];

export function Q6InvestmentQuestion() {
  const { updateData, setCurrentQuestion, setIsDisqualified, personalizeText } = useIndustryFunnel();

  const handleSelect = (option: typeof options[0]) => {
    updateData('investmentReady', option.label);
    if (option.disqualify) {
      setIsDisqualified(true);
    } else {
      setTimeout(() => setCurrentQuestion(7), 300);
    }
  };

  return (
    <IndustryQuestionCard
      question="Real talk: We only work with serious business owners."
    >
      <p className="text-muted-foreground text-base leading-relaxed">
        {personalizeText("A bespoke {industry} website normally costs R20,000+. We're offering it for R5,000. Our designer creates your custom mockup first — FREE. You only pay once you love it.")}
      </p>
      <p className="text-foreground font-semibold mt-4 mb-2">
        If you love the design, are you ready to invest R5,000?
      </p>
      <div className="space-y-3">
        {options.map(o => (
          <AnswerOption key={o.label} label={o.label} onClick={() => handleSelect(o)} />
        ))}
      </div>
    </IndustryQuestionCard>
  );
}
