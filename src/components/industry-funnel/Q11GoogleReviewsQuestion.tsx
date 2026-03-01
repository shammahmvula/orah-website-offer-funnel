import { useState } from 'react';
import { IndustryQuestionCard } from './IndustryQuestionCard';
import { useIndustryFunnel } from '@/contexts/IndustryFunnelContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export function Q11GoogleReviewsQuestion() {
  const { updateData, setCurrentQuestion, personalizeText } = useIndustryFunnel();
  const [googleReviews, setGoogleReviews] = useState(false);

  const handleContinue = () => {
    updateData('googleReviewsInterest', googleReviews ? 'yes' : 'no');
    setTimeout(() => setCurrentQuestion(12), 200);
  };

  return (
    <IndustryQuestionCard
      question="🎉 Great news! Based on your answers, you're a strong candidate for our R5,000 offer."
    >
      <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
        <p className="text-foreground font-semibold mb-2">⭐ BONUS OFFER</p>
        <p className="text-sm text-foreground mb-3">
          {personalizeText("Would you also like us to help your {industry} business generate more 5-star Google reviews, ")}<span className="font-semibold text-accent">on the house for one month?</span>
        </p>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            checked={googleReviews}
            onCheckedChange={(checked) => setGoogleReviews(checked as boolean)}
            className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <span className="text-sm text-foreground font-medium">Yes, I'd love free Google Reviews help! 🙌</span>
        </label>
      </div>
      <Button onClick={handleContinue} className="btn-primary mt-4">
        Continue →
      </Button>
    </IndustryQuestionCard>
  );
}
