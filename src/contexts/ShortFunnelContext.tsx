import { createContext, useContext, useState, ReactNode } from 'react';

export interface ShortFunnelData {
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
}

const defaultData: ShortFunnelData = {
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
