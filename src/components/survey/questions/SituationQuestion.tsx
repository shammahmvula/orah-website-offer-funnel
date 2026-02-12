import { QuestionCard } from '../QuestionCard';
import { AnswerOption } from '../AnswerOption';
import { useSurvey } from '@/contexts/SurveyContext';

const options = [
  "😬 I have a website but I'm embarrassed by it",
  "🚧 I tried building one myself but gave up",
  "🦗 I don't have a website at all",
  "🤷 I have something, but it's seriously outdated",
  "😎 I have a decent site but want something better",
];

export function SituationQuestion() {
  const { updateSurveyData, setCurrentQuestion } = useSurvey();

  const handleSelect = (option: string) => {
    updateSurveyData('websiteSituation', option);
    setTimeout(() => setCurrentQuestion(6), 300);
  };

  return (
    <QuestionCard
      question="What's your current website situation?"
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
