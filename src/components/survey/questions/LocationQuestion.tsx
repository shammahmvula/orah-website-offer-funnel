import { useState } from 'react';
import { QuestionCard } from '../QuestionCard';
import { AnswerOption } from '../AnswerOption';
import { useSurvey } from '@/contexts/SurveyContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const options = [
  "Gauteng (Joburg, Pretoria, etc.)",
  "Western Cape (Cape Town, etc.)",
  "KwaZulu-Natal (Durban, etc.)",
  "Other South African Province",
  "❌ I'm not based in South Africa",
];

export function LocationQuestion() {
  const { updateSurveyData, setCurrentQuestion } = useSurvey();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleSelect = (option: string) => {
    if (option.includes("not based in South Africa")) {
      setShowWaitlist(true);
    } else {
      updateSurveyData('province', option);
      setTimeout(() => setCurrentQuestion(2), 300);
    }
  };

  const handleWaitlistSubmit = () => {
    if (waitlistEmail) {
      setWaitlistSubmitted(true);
    }
  };

  if (showWaitlist) {
    return (
      <QuestionCard question="We're currently only serving South African businesses">
        {waitlistSubmitted ? (
          <div className="text-center py-4">
            <p className="text-success font-medium">You're on the list!</p>
            <p className="text-muted-foreground text-sm mt-2">
              We'll notify you when we expand internationally.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Join our waitlist to be notified when we expand:
            </p>
            <Input
              type="email"
              placeholder="your@email.com"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              className="h-12"
            />
            <Button onClick={handleWaitlistSubmit} className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90">
              Join Waitlist
            </Button>
          </div>
        )}
      </QuestionCard>
    );
  }

  return (
    <QuestionCard question="Where is your business located?">
      <div className="space-y-3">
        {options.map((option) => (
          <AnswerOption
            key={option}
            label={option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionCard>
  );
}
