import { FomoTicker } from '@/components/FomoTicker';
import { Funnel2HeroSection } from '@/components/funnel-2/Funnel2HeroSection';
import { Funnel2Survey } from '@/components/funnel-2/Funnel2Survey';
import { Funnel2DisqualifiedPage } from '@/components/funnel-2/Funnel2DisqualifiedPage';
import { Funnel2SuccessPage } from '@/components/funnel-2/Funnel2SuccessPage';
import { Funnel2Provider, useFunnel2 } from '@/contexts/Funnel2Context';

const Funnel2Content = () => {
  const { showSurvey, isDisqualified, isCompleted } = useFunnel2();

  if (isCompleted) return <Funnel2SuccessPage />;
  if (isDisqualified) return <Funnel2DisqualifiedPage />;

  if (showSurvey) {
    return (
      <>
        <FomoTicker />
        <Funnel2Survey />
      </>
    );
  }

  return (
    <>
      <FomoTicker />
      <Funnel2HeroSection />
    </>
  );
};

function Funnel2Page() {
  return (
    <Funnel2Provider>
      <Funnel2Content />
    </Funnel2Provider>
  );
}

export default Funnel2Page;
