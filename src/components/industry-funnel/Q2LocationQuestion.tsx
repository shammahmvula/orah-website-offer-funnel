import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { AnswerOption } from '../survey/AnswerOption';

const provinces = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Free State', 'Mpumalanga', 'Limpopo', 'North West', 'Northern Cape',
];

export function Q2LocationQuestion() {
  const { updateData, setCurrentQuestion, personalizeText } = useIndustryFunnel();

  const handleSelect = (province: string) => {
    updateData('location', province);
    setTimeout(() => setCurrentQuestion(3), 300);
  };

  return (
    <IndustryQuestionCard
      question={personalizeText("Great! Where is your {industry} business located?")}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {provinces.map(p => (
          <AnswerOption key={p} label={p} onClick={() => handleSelect(p)} />
        ))}
      </div>
    </IndustryQuestionCard>
  );
}
