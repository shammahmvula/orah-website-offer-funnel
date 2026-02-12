import { createContext, useContext, useState, ReactNode } from 'react';

export interface SurveyData {
  province: string;
  businessAge: string;
  monthlyRevenue: string;
  industry: string;
  websiteSituation: string;
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

interface SurveyContextType {
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  surveyData: SurveyData;
  updateSurveyData: (field: keyof SurveyData, value: string | string[]) => void;
  isDisqualified: boolean;
  setIsDisqualified: (val: boolean) => void;
  isCompleted: boolean;
  setIsCompleted: (val: boolean) => void;
  showSurvey: boolean;
  setShowSurvey: (val: boolean) => void;
}

const defaultSurveyData: SurveyData = {
  province: '',
  businessAge: '',
  monthlyRevenue: '',
  industry: '',
  websiteSituation: '',
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

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData>(defaultSurveyData);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  const updateSurveyData = (field: keyof SurveyData, value: string | string[]) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SurveyContext.Provider
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
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}
