import { ClickFunnelProvider } from '@/contexts/ClickFunnelContext';
import { ClickFunnelSurvey } from '@/components/click-funnel/ClickFunnelSurvey';

export default function ClickFunnel() {
  return (
    <ClickFunnelProvider>
      <ClickFunnelSurvey />
    </ClickFunnelProvider>
  );
}
