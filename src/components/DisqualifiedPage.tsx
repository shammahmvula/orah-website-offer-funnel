import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSurvey } from '@/contexts/SurveyContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FomoTicker } from './FomoTicker';
import { supabase } from '@/integrations/supabase/client';

export function DisqualifiedPage() {
  const { surveyData } = useSurvey();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEcommerce = surveyData.industry?.includes('E-commerce');

  const handleSubmit = async () => {
    if (email) {
      await supabase.from('survey_responses').insert({
        province: surveyData.province || null,
        business_age: surveyData.businessAge || null,
        monthly_revenue: surveyData.monthlyRevenue || null,
        industry: surveyData.industry || null,
        website_situation: surveyData.websiteSituation || null,
        investment_ready: surveyData.investmentReady || null,
        email,
        is_disqualified: true,
        disqualification_reason: isEcommerce ? 'E-commerce (not currently served)' : 'Budget not ready',
      });
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <FomoTicker />
      <div className="pt-20 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="card-premium">
            {isEcommerce ? (
              <>
                <h1 className="font-serif text-3xl text-foreground mb-4">
                  🛒 E-Commerce Support Coming Soon!
                </h1>
                <p className="text-muted-foreground mb-6">
                  We're currently focused on service-based businesses, but we're building something amazing for e-commerce businesses too. Join our waitlist and we'll reach out as soon as we're ready to help you!
                </p>
              </>
            ) : (
              <>
                <h1 className="font-serif text-3xl text-foreground mb-4">
                  We Get It — Timing Is Everything
                </h1>
                <p className="text-muted-foreground mb-6">
                  No hard feelings! When you're ready to invest in your online presence, we'll be here. Join our waitlist and we'll notify you about future offers.
                </p>
              </>
            )}

            {submitted ? (
              <div className="py-4">
                <p className="text-success font-medium text-lg">✅ You're on the list!</p>
                <p className="text-muted-foreground text-sm mt-2">
                  We'll reach out when {isEcommerce ? "our e-commerce service launches" : "we have a new offer"}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
                <Button
                  onClick={handleSubmit}
                  className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                >
                  Join the Waitlist →
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
