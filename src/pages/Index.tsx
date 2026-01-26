import { FomoTicker } from '@/components/FomoTicker';
import { HeroSection } from '@/components/HeroSection';
import { Survey } from '@/components/Survey';
import { DisqualifiedPage } from '@/components/DisqualifiedPage';
import { SuccessPage } from '@/components/SuccessPage';
import { SurveyProvider, useSurvey } from '@/contexts/SurveyContext';

function IndexContent() {
  const { showSurvey, isDisqualified, isCompleted } = useSurvey();

  if (isCompleted) {
    return <SuccessPage />;
  }

  if (isDisqualified) {
    return <DisqualifiedPage />;
  }

  if (showSurvey) {
    return (
      <>
        <FomoTicker />
        <Survey />
      </>
    );
  }

  return (
    <>
      <FomoTicker />
      <HeroSection />
    </>
  );
}

const Index = () => {
  return (
    <SurveyProvider>
      <IndexContent />
    </SurveyProvider>
  );
};

export default Index;
