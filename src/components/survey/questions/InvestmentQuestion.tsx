import { useState } from 'react';
import { QuestionCard } from '../QuestionCard';
import { AnswerOption } from '../AnswerOption';
import { Toast } from '../Toast';
import { useSurvey } from '@/contexts/SurveyContext';

const options = [
  { label: "✅ Yes, I'm ready to invest R5,000 now", toast: "Perfect! You're exactly who we love working with." },
  { label: "❌ No, I'm just a tyre kicker — not willing to invest in my own business", toast: null },
];

export function InvestmentQuestion() {
  const { updateSurveyData, setCurrentQuestion, setIsDisqualified } = useSurvey();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSelect = (option: typeof options[0]) => {
    updateSurveyData('investmentReady', option.label);

    if (option.label.includes("tyre kicker")) {
      setIsDisqualified(true);
    } else {
      if (option.toast) {
        setToastMessage(option.toast);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
      setTimeout(() => setCurrentQuestion(7), 300);
    }
  };

  return (
    <>
      <QuestionCard
        question="If you qualify, are you ready to invest R5,000 to get your bespoke website built?"
        preText="Real talk: We only work with business owners who are serious about investing in their online presence. A quality bespoke website normally costs R20,000+. We're offering 50 spots at just R5,000."
      >
        <div className="space-y-3">
          {options.map((option) => (
            <AnswerOption
              key={option.label}
              label={option.label}
              onClick={() => handleSelect(option)}
            />
          ))}
        </div>
      </QuestionCard>
      <Toast message={toastMessage} visible={showToast} />
    </>
  );
}
