import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface IndustryFunnelData {
  industry: string;
  location: string;
  businessAge: string;
  websiteSituation: string;
  frustration: string;
  investmentReady: string;
  stylePreference: string;
  features: string[];
  motivation: string;
  monthlyRevenue: string;
  googleReviewsInterest: string;
  billingAddress: string;
  fullName: string;
  businessName: string;
  email: string;
  whatsapp: string;
  websiteUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
}

interface IndustryFunnelContextType {
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  data: IndustryFunnelData;
  updateData: <K extends keyof IndustryFunnelData>(field: K, value: IndustryFunnelData[K]) => void;
  isDisqualified: boolean;
  setIsDisqualified: (val: boolean) => void;
  isCompleted: boolean;
  setIsCompleted: (val: boolean) => void;
  personalizeText: (text: string) => string;
  fomoShown: boolean;
  setFomoShown: (val: boolean) => void;
}

const defaultData: IndustryFunnelData = {
  industry: '',
  location: '',
  businessAge: '',
  websiteSituation: '',
  frustration: '',
  investmentReady: '',
  stylePreference: '',
  features: [],
  motivation: '',
  fullName: '',
  businessName: '',
  email: '',
  whatsapp: '',
  websiteUrl: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
};

const IndustryFunnelContext = createContext<IndustryFunnelContextType | undefined>(undefined);

export function IndustryFunnelProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [data, setData] = useState<IndustryFunnelData>(defaultData);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [fomoShown, setFomoShown] = useState(false);

  useEffect(() => {
    const industryParam = searchParams.get('industry');
    const utmSource = searchParams.get('utm_source') || '';
    const utmMedium = searchParams.get('utm_medium') || '';
    const utmCampaign = searchParams.get('utm_campaign') || '';
    const utmContent = searchParams.get('utm_content') || '';

    setData(prev => ({ ...prev, utmSource, utmMedium, utmCampaign, utmContent }));

    if (industryParam) {
      const formatted = industryParam.charAt(0).toUpperCase() + industryParam.slice(1).toLowerCase();
      setData(prev => ({ ...prev, industry: formatted }));
      setCurrentQuestion(2);
    }
  }, [searchParams]);

  const updateData = <K extends keyof IndustryFunnelData>(field: K, value: IndustryFunnelData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const personalizeText = (text: string) => {
    return text.replace(/\{industry\}/g, data.industry || 'business');
  };

  return (
    <IndustryFunnelContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        data,
        updateData,
        isDisqualified,
        setIsDisqualified,
        isCompleted,
        setIsCompleted,
        personalizeText,
        fomoShown,
        setFomoShown,
      }}
    >
      {children}
    </IndustryFunnelContext.Provider>
  );
}

export function useIndustryFunnel() {
  const context = useContext(IndustryFunnelContext);
  if (!context) {
    throw new Error('useIndustryFunnel must be used within IndustryFunnelProvider');
  }
  return context;
}
