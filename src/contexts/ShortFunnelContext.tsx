import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface ShortFunnelData {
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
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  campaignId: string;
  adId: string;
  placement: string;
}

interface ShortFunnelContextType {
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  surveyData: ShortFunnelData;
  updateSurveyData: (field: keyof ShortFunnelData, value: string) => void;
  isDisqualified: boolean;
  setIsDisqualified: (val: boolean) => void;
  isCompleted: boolean;
  setIsCompleted: (val: boolean) => void;
  showSurvey: boolean;
  setShowSurvey: (val: boolean) => void;
  personalizeText: (text: string) => string;
}

const defaultData: ShortFunnelData = {
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
};

const ShortFunnelContext = createContext<ShortFunnelContextType | undefined>(undefined);

export function ShortFunnelProvider({ children }: { children: ReactNode }) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [surveyData, setSurveyData] = useState<ShortFunnelData>(defaultData);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  const updateSurveyData = (field: keyof ShortFunnelData, value: string) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const personalizeText = (text: string) => {
    return text.replace(/\{industry\}/g, surveyData.industry || 'business');
  };

  return (
    <ShortFunnelContext.Provider
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
    </ShortFunnelContext.Provider>
  );
}

export function useShortFunnel() {
  const context = useContext(ShortFunnelContext);
  if (context === undefined) {
    throw new Error('useShortFunnel must be used within a ShortFunnelProvider');
  }
  return context;
}
