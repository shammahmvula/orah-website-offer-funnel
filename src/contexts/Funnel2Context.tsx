import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface Funnel2Data {
  industry: string;
  monthlyRevenue: string;
  investmentReady: string;
  motivation: string;
  fullName: string;
  businessName: string;
  email: string;
  whatsapp: string;
  websiteUrl: string;
  billingAddress: string;
  googleReviewsInterest: string;
  depositResponse: string;
  // UTM & Facebook ad tracking
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  campaignId: string;
  adId: string;
  placement: string;
}

interface Funnel2ContextType {
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  surveyData: Funnel2Data;
  updateSurveyData: (field: keyof Funnel2Data, value: string) => void;
  isDisqualified: boolean;
  setIsDisqualified: (val: boolean) => void;
  isCompleted: boolean;
  setIsCompleted: (val: boolean) => void;
  showSurvey: boolean;
  setShowSurvey: (val: boolean) => void;
  personalizeText: (text: string) => string;
}

const defaultData: Funnel2Data = {
  industry: '',
  monthlyRevenue: '',
  investmentReady: '',
  motivation: '',
  fullName: '',
  businessName: '',
  email: '',
  whatsapp: '',
  websiteUrl: '',
  billingAddress: '',
  googleReviewsInterest: '',
  depositResponse: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  utmTerm: '',
  campaignId: '',
  adId: '',
  placement: '',
};

const Funnel2Context = createContext<Funnel2ContextType | undefined>(undefined);

export function Funnel2Provider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [surveyData, setSurveyData] = useState<Funnel2Data>(defaultData);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  // Capture URL params on mount
  useEffect(() => {
    const industry = searchParams.get('industry') || '';
    const utmSource = searchParams.get('utm_source') || '';
    const utmMedium = searchParams.get('utm_medium') || '';
    const utmCampaign = searchParams.get('utm_campaign') || '';
    const utmContent = searchParams.get('utm_content') || '';
    const utmTerm = searchParams.get('utm_term') || '';
    const campaignId = searchParams.get('campaign_id') || '';
    const adId = searchParams.get('ad_id') || '';
    const placement = searchParams.get('placement') || '';

    setSurveyData(prev => ({
      ...prev,
      industry: industry || prev.industry,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      campaignId,
      adId,
      placement,
    }));
  }, [searchParams]);

  const updateSurveyData = (field: keyof Funnel2Data, value: string) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const personalizeText = (text: string) => {
    return text.replace(/\{industry\}/g, surveyData.industry || 'business');
  };

  return (
    <Funnel2Context.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        surveyData,
        updateSurveyData,
        isDisqualified,
        setIsDisqualified,
        isCompleted,
        setIsCompleted,
        showSurvey,
        setShowSurvey,
        personalizeText,
      }}
    >
      {children}
    </Funnel2Context.Provider>
  );
}

export function useFunnel2() {
  const context = useContext(Funnel2Context);
  if (context === undefined) {
    throw new Error('useFunnel2 must be used within a Funnel2Provider');
  }
  return context;
}
