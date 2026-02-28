import { useState } from 'react';
import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function Q9MotivationQuestion() {
  const { data, updateData, setCurrentQuestion, personalizeText } = useIndustryFunnel();
  const [charCount, setCharCount] = useState(data.motivation.length);
  const maxChars = 300;

  const handleChange = (value: string) => {
    if (value.length <= maxChars) {
      updateData('motivation', value);
      setCharCount(value.length);
    }
  };

  return (
    <IndustryQuestionCard
      question={personalizeText("Why is now the right time to upgrade your {industry} website?")}
    >
      <Textarea
        value={data.motivation}
        onChange={e => handleChange(e.target.value)}
        placeholder="e.g. I'm tired of losing customers to competitors with better websites..."
        className="min-h-[120px] resize-none rounded-xl border-primary/20"
        maxLength={maxChars}
      />
      <p className="text-sm text-muted-foreground text-right mt-1">
        {charCount}/{maxChars}
      </p>
      <Button
        onClick={() => {
          if (data.motivation.trim()) setCurrentQuestion(10);
        }}
        disabled={!data.motivation.trim()}
        className="btn-primary mt-2"
      >
        Continue →
      </Button>
    </IndustryQuestionCard>
  );
}
