import { useEffect } from 'react';
import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Shield, Zap, Heart } from 'lucide-react';

const styles = [
  { label: 'Professional & Trustworthy', icon: Shield, desc: 'Clean lines, authority, trust signals' },
  { label: 'Bold & Modern', icon: Zap, desc: 'Eye-catching, cutting-edge, dynamic' },
  { label: 'Warm & Approachable', icon: Heart, desc: 'Friendly, welcoming, personal touch' },
];

export function Q7StyleQuestion() {
  const { updateData, setCurrentQuestion, personalizeText, data, fomoShown, setFomoShown } = useIndustryFunnel();
  const [showFomo, setShowFomo] = useState(false);

  useEffect(() => {
    if (!fomoShown) {
      const timer = setTimeout(() => {
        setShowFomo(true);
        setFomoShown(true);
        setTimeout(() => setShowFomo(false), 5000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [fomoShown, setFomoShown]);

  const handleSelect = (style: string) => {
    updateData('stylePreference', style);
    setTimeout(() => setCurrentQuestion(8), 300);
  };

  return (
    <>
      <IndustryQuestionCard
        question={personalizeText("What vibe fits your {industry} brand?")}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {styles.map(s => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.label}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(s.label)}
                className="card-premium flex flex-col items-center text-center gap-3 p-6 hover:border-accent border border-transparent transition-all cursor-pointer"
              >
                <Icon className="w-10 h-10 text-accent" />
                <span className="font-semibold text-foreground">{s.label}</span>
                <span className="text-sm text-muted-foreground">{s.desc}</span>
              </motion.button>
            );
          })}
        </div>
      </IndustryQuestionCard>

      <AnimatePresence>
        {showFomo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-card border border-border rounded-xl p-4 shadow-lg max-w-xs"
          >
            <p className="text-sm text-foreground">
              🔥 A <strong>{data.industry || 'business'}</strong> in <strong>{data.location || 'South Africa'}</strong> just started their application
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
