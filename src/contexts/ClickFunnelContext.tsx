import { createContext, useContext, useState, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export interface ClickFunnelData {
  heardAbout: string;
  seriousness: string;
  motivation: string;
  budget: string;
  firstName: string;
  lastName: string;
  phone: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
}

const defaultData: ClickFunnelData = {
  heardAbout: '',
  seriousness: '',
  motivation: '',
  budget: '',
  firstName: '',
  lastName: '',
  phone: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  utmTerm: '',
};

interface ClickFunnelContextType {
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  data: ClickFunnelData;
  updateData: <K extends keyof ClickFunnelData>(field: K, value: ClickFunnelData[K]) => void;
  isCompleted: boolean;
  setIsCompleted: (val: boolean) => void;
  isDisqualified: boolean;
  setIsDisqualified: (val: boolean) => void;
}

const ClickFunnelContext = createContext<ClickFunnelContextType | undefined>(undefined);

export function ClickFunnelProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [data, setData] = useState<ClickFunnelData>(defaultData);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);

  useEffect(() => {
    setData(prev => ({
      ...prev,
      utmSource: searchParams.get('utm_source') || '',
      utmMedium: searchParams.get('utm_medium') || '',
      utmCampaign: searchParams.get('utm_campaign') || '',
      utmContent: searchParams.get('utm_content') || '',
      utmTerm: searchParams.get('utm_term') || '',
    }));
  }, [searchParams]);

  const updateData = <K extends keyof ClickFunnelData>(field: K, value: ClickFunnelData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ClickFunnelContext.Provider value={{
      currentQuestion, setCurrentQuestion,
      data, updateData,
      isCompleted, setIsCompleted,
      isDisqualified, setIsDisqualified,
    }}>
      {children}
    </ClickFunnelContext.Provider>
  );
}

export function useClickFunnel() {
  const ctx = useContext(ClickFunnelContext);
  if (!ctx) throw new Error('useClickFunnel must be used within ClickFunnelProvider');
  return ctx;
}
