import { useState, useEffect } from 'react';
import { QuestionCard } from '../QuestionCard';
import { StyleCard } from '../StyleCard';
import { SocialProofPopup } from '../SocialProofPopup';
import { useSurvey } from '@/contexts/SurveyContext';

const styles = [
  {
    title: "Modern & Minimal",
    subtitle: "Clean lines, lots of white space, elegant",
    gradient: "bg-gradient-to-br from-slate-100 to-slate-200",
    value: "Modern & Minimal",
  },
  {
    title: "Bold & Dynamic",
    subtitle: "Strong colors, energetic, eye-catching",
    gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
    value: "Bold & Dynamic",
  },
  {
    title: "Warm & Personal",
    subtitle: "Friendly, approachable, trustworthy",
    gradient: "bg-gradient-to-br from-rose-200 to-amber-200",
    value: "Warm & Personal",
  },
];

export function StyleQuestion() {
  const { updateSurveyData, setCurrentQuestion, surveyData } = useSurvey();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (style: string) => {
    updateSurveyData('stylePreference', style);
    setTimeout(() => setCurrentQuestion(8), 300);
  };

  return (
    <>
      <QuestionCard
        question="What style resonates most with your brand?"
        showBack
        onBack={() => setCurrentQuestion(6)}
      >
        <div className="space-y-4">
          {styles.map((style) => (
            <StyleCard
              key={style.value}
              title={style.title}
              subtitle={style.subtitle}
              gradient={style.gradient}
              selected={surveyData.stylePreference === style.value}
              onClick={() => handleSelect(style.value)}
            />
          ))}
        </div>
      </QuestionCard>
      <SocialProofPopup visible={showPopup} onHide={() => setShowPopup(false)} />
    </>
  );
}
