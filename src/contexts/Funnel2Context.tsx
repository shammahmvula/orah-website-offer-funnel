import { createContext, useContext, useState, ReactNode } from 'react';

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
};

const Funnel2Context = createContext<Funnel2ContextType | undefined>(undefined);

export function Funnel2Provider({ children }: { children: ReactNode }) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [surveyData, setSurveyData] = useState<Funnel2Data>(defaultData);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

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
