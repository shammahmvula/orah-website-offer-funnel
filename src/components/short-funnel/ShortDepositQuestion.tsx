import { motion } from 'framer-motion';
import { useShortFunnel } from '@/contexts/ShortFunnelContext';
import { AnswerOption } from '../survey/AnswerOption';

export function ShortDepositQuestion() {
  const { setCurrentQuestion, updateSurveyData } = useShortFunnel();

  const handleSelect = (option: string) => {
    updateSurveyData('depositResponse', option);
    setTimeout(() => setCurrentQuestion(5), 300);
  };

  return (
    <motion.div
      key="deposit"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-lg mx-auto px-4 py-12"
    >
      <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
        Perfect — one last thing to make sure we're a great fit.
      </h2>

      <div className="card-premium mb-6 space-y-3">
        <p className="text-foreground text-sm">
          Once you've approved your custom design, we ask for a small <span className="font-semibold text-accent">10% deposit</span> to begin the build. This secures your spot and covers the initial design work.
        </p>
        <p className="text-foreground text-sm">
          The remaining balance is only due once your website is live and you're <span className="font-semibold">100% happy with it</span>.
        </p>
      </div>

      <h3 className="text-foreground font-semibold mb-3">Does this approach work for you?</h3>

      <div className="space-y-3">
        <AnswerOption label="Yes, that's fair — let's do it ✅" onClick={() => handleSelect("Yes, that's fair")} />
        <AnswerOption label="I'd like to discuss this on our call 📞" onClick={() => handleSelect("Discuss on call")} />
      </div>
    </motion.div>
  );
}
