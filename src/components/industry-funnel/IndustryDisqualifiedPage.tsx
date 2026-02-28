import { motion } from 'framer-motion';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { Button } from '@/components/ui/button';

export function IndustryDisqualifiedPage() {
  const { setIsDisqualified, setCurrentQuestion, personalizeText } = useIndustryFunnel();

  const handleGoBack = () => {
    setIsDisqualified(false);
    setCurrentQuestion(6);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full card-premium text-center space-y-6"
      >
        <h1 className="text-3xl font-bold text-foreground">
          No problem — we get it.
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Investing R5,000 isn't for everyone. But every week you wait, competitors are getting <strong className="text-foreground">YOUR</strong> customers.
        </p>
        <div className="space-y-3 pt-2">
          <Button onClick={handleGoBack} className="btn-primary w-full">
            Changed my mind? Go back →
          </Button>
          <a href="/" className="block">
            <Button variant="outline" className="w-full rounded-xl">
              Check out our Google Reviews service instead
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
