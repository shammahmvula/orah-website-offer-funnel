import { useState } from 'react';
import { QuestionCard } from '../QuestionCard';
import { useSurvey } from '@/contexts/SurveyContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const examples = [
  "My competitors look way more professional online",
  "I'm tired of losing customers to better-looking sites",
  "I want something I'm proud to put on my business card",
];

export function MotivationQuestion() {
  const { surveyData, updateSurveyData, setCurrentQuestion } = useSurvey();
  const [charCount, setCharCount] = useState(surveyData.motivation.length);
  const maxChars = 200;

  const handleChange = (value: string) => {
    if (value.length <= maxChars) {
      updateSurveyData('motivation', value);
      setCharCount(value.length);
    }
  };

  return (
    <QuestionCard
      question="In one sentence, why do you want a new website?"
      showBack
      onBack={() => setCurrentQuestion(6)}
    >
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

      <div className="mt-6 space-y-3">
        <Button
          onClick={() => setCurrentQuestion(8)}
          className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
        >
          Continue →
        </Button>
        <button
          onClick={() => setCurrentQuestion(8)}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip this question
        </button>
      </div>
    </QuestionCard>
  );
}
