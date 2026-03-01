import { useState } from 'react';
import { QuestionCard } from '../survey/QuestionCard';
import { useShortFunnel } from '@/contexts/ShortFunnelContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ShortIndustryQuestion() {
  const { surveyData, updateSurveyData, setCurrentQuestion } = useShortFunnel();
  const [value, setValue] = useState(surveyData.industry);

  const handleContinue = () => {
    if (value.trim()) {
      const formatted = value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
      updateSurveyData('industry', formatted);
      setTimeout(() => setCurrentQuestion(2), 200);
    }
  };

  return (
    <QuestionCard
      question="Let's make sure we can help you."
      preText="What type of business do you run?"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. Plumbing, Dental Practice, Hair Salon..."
        className="h-12"
        onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
      />
      <Button
        onClick={handleContinue}
        disabled={!value.trim()}
        className="w-full h-12 mt-4 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold disabled:opacity-50"
      >
        Continue →
      </Button>
    </QuestionCard>
  );
}
