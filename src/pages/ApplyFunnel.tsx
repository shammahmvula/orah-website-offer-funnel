import { IndustryFunnelProvider } from '@/contexts/IndustryFunnelContext';
import { IndustrySurvey } from '@/components/industry-funnel/IndustrySurvey';

export default function ApplyFunnel() {
  return (
    <IndustryFunnelProvider>
      <IndustrySurvey />
    </IndustryFunnelProvider>
  );
}
