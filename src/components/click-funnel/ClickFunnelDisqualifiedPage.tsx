import { useState } from 'react';
import { motion } from 'framer-motion';
import { useClickFunnel } from '@/contexts/ClickFunnelContext';
import { ClickFunnelLayout } from './ClickFunnelLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export function ClickFunnelDisqualifiedPage() {
  const { data } = useClickFunnel();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('survey_responses').insert({
        email,
        industry: data.heardAbout || null,
        website_situation: data.seriousness || null,
        motivation: data.motivation || null,
        investment_ready: data.budget || null,
        is_disqualified: true,
        disqualification_reason: 'Budget not ready',
        funnel_source: 'click-funnel',
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        utm_content: data.utmContent || null,
        utm_term: data.utmTerm || null,
        campaign_id: data.campaignId || null,
        ad_id: data.adId || null,
        placement: data.placement || null,
      });
      if (!error) setSubmitted(true);
    } catch {
      // Silently handle
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ClickFunnelLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            We Get It. Timing Is Everything
          </h2>
          <p className="text-muted-foreground mb-6">
            No hard feelings! When you're ready to invest in your online presence, we'll be here. Join our waitlist and we'll notify you about future offers.
          </p>
          {submitted ? (
            <div className="py-4">
              <p className="text-success font-medium text-lg">✅ You're on the list!</p>
              <p className="text-muted-foreground text-sm mt-2">We'll reach out when we have a new offer.</p>
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
                disabled={isSubmitting}
                className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
              >
                {isSubmitting ? 'Joining...' : 'Join the Waitlist →'}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </ClickFunnelLayout>
  );
}
