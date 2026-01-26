import { QuestionCard } from '../QuestionCard';
import { AnswerOption } from '../AnswerOption';
import { useSurvey } from '@/contexts/SurveyContext';

const options = [
  "🏪 Retail / E-commerce",
  "🍽️ Restaurant / Food & Beverage",
  "💇 Beauty / Salon / Spa",
  "🏋️ Fitness / Health / Wellness",
  "🔧 Trades / Home Services",
  "📸 Creative / Photography / Design",
  "💼 Professional Services",
  "🏥 Medical / Healthcare",
  "🎓 Education / Coaching",
  "🏢 Other",
];

export function IndustryQuestion() {
  const { updateSurveyData, setCurrentQuestion } = useSurvey();

  const handleSelect = (option: string) => {
    updateSurveyData('industry', option);
    setTimeout(() => setCurrentQuestion(5), 300);
  };

  return (
    <QuestionCard
      question="What industry is your business in?"
      showBack
      onBack={() => setCurrentQuestion(3)}
    >
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
