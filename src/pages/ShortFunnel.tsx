import { FomoTicker } from '@/components/FomoTicker';
import { ShortHeroSection } from '@/components/short-funnel/ShortHeroSection';
import { ShortSurvey } from '@/components/short-funnel/ShortSurvey';
import { ShortDisqualifiedPage } from '@/components/short-funnel/ShortDisqualifiedPage';
import { ShortSuccessPage } from '@/components/short-funnel/ShortSuccessPage';
import { ShortFunnelProvider, useShortFunnel } from '@/contexts/ShortFunnelContext';

const ShortFunnelContent = () => {
  const { showSurvey, isDisqualified, isCompleted } = useShortFunnel();

  if (isCompleted) return <ShortSuccessPage />;
  if (isDisqualified) return <ShortDisqualifiedPage />;

  if (showSurvey) {
    return (
      <>
        <FomoTicker />
        <ShortSurvey />
      </>
    );
  }

  return (
    <>
      <FomoTicker />
      <ShortHeroSection />
    </>
  );
};

const ShortFunnelPage = () => (
  <ShortFunnelProvider>
    <ShortFunnelContent />
  </ShortFunnelProvider>
);

export default ShortFunnelPage;
