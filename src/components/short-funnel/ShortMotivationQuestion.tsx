import { useState } from 'react';
import { QuestionCard } from '../survey/QuestionCard';
import { useShortFunnel } from '@/contexts/ShortFunnelContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const examples = [
  "My competitors look way more professional online",
  "I'm tired of losing customers to better-looking sites",
  "I want something I'm proud to put on my business card",
];

export function ShortMotivationQuestion() {
  const { surveyData, updateSurveyData, setCurrentQuestion } = useShortFunnel();
  const [charCount, setCharCount] = useState(surveyData.motivation.length);
  const maxChars = 200;

  const handleChange = (value: string) => {
    if (value.length <= maxChars) {
      updateSurveyData('motivation', value);
      setCharCount(value.length);
    }
  };

  return (
    <QuestionCard question="In one sentence, why do you want a new website?">
      <Textarea
        value={surveyData.motivation}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="e.g., I want customers to take my business seriously when they find me online"
        className="min-h-[100px] resize-none"
        maxLength={maxChars}
      />
      <p className="text-sm text-muted-foreground text-right mt-2">
        {charCount}/{maxChars} characters
      </p>

      <div className="mt-4 p-4 bg-muted/50 rounded-xl">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Some recent answers:</span>{' '}
          {examples.map((ex, i) => (
            <span key={i}>
              "{ex}"{i < examples.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-6">
        <Button
          onClick={() => {
            if (surveyData.motivation.trim().length > 0) {
              setCurrentQuestion(4);
            }
          }}
          disabled={!surveyData.motivation.trim()}
          className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold disabled:opacity-50"
        >
          Continue →
        </Button>
      </div>
    </QuestionCard>
  );
}
