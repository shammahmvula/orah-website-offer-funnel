import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, Star } from 'lucide-react';
import { useShortFunnel } from '@/contexts/ShortFunnelContext';
import { Button } from '@/components/ui/button';
import { FomoTicker } from '../FomoTicker';
import { supabase } from '@/integrations/supabase/client';

export function ShortSuccessPage() {
  const { surveyData } = useShortFunnel();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('survey_submitted_short');
    if (saved) return;

    const saveResponse = async () => {
      try {
        const { error } = await supabase.from('survey_responses').insert({
          monthly_revenue: surveyData.monthlyRevenue || null,
          investment_ready: surveyData.investmentReady || null,
          motivation: surveyData.motivation || null,
          full_name: surveyData.fullName || null,
          business_name: surveyData.businessName || null,
          email: surveyData.email || null,
          whatsapp: surveyData.whatsapp || null,
          website_url: surveyData.websiteUrl || null,
          billing_address: surveyData.billingAddress || null,
          google_reviews_interest: surveyData.googleReviewsInterest === 'yes',
          is_disqualified: false,
          funnel_source: 'funnel',
          utm_source: surveyData.utmSource || null,
          utm_medium: surveyData.utmMedium || null,
          utm_campaign: surveyData.utmCampaign || null,
          utm_content: surveyData.utmContent || null,
          utm_term: surveyData.utmTerm || null,
          campaign_id: surveyData.campaignId || null,
          ad_id: surveyData.adId || null,
          placement: surveyData.placement || null,
        });
        if (!error) {
          localStorage.setItem('survey_submitted_short', 'true');
        }
      } catch (err) {
        // Silently handle
      }
    };
    saveResponse();
  }, []);

  const wantsReviews = surveyData.googleReviewsInterest === 'yes';

  const emailBody = useMemo(() => `Hi there,

I just completed my application for the R5,000 bespoke website offer.

Name: ${surveyData.fullName}
Business: ${surveyData.businessName}
Billing Address: ${surveyData.billingAddress}
Current website: ${surveyData.websiteUrl || 'None'}
${wantsReviews ? 'Google Reviews: Yes, interested in free month!\n' : ''}My motivation: "${surveyData.motivation}"

Looking forward to hearing from you!

${surveyData.fullName}
${surveyData.whatsapp}`, [surveyData, wantsReviews]);

  const emailText = `To: growth@getorah.co.za
Subject: Website Application - ${surveyData.businessName}

${emailBody}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoLink = `mailto:growth@getorah.co.za?subject=${encodeURIComponent(`Website Application - ${surveyData.businessName}`)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="min-h-screen bg-background">
      <FomoTicker />
      <div className="pt-20 pb-12 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto space-y-6">

          {/* Confirmation */}
          <div className="text-center">
            <h1 className="font-serif text-4xl text-foreground mb-2">🎉 Congratulations!</h1>
            <p className="text-lg text-accent font-medium">
              You've officially qualified for our R5,000 Bespoke Website Offer!
            </p>
          </div>

          {/* Application Summary */}
          <div className="card-premium">
            <h2 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-4">YOUR APPLICATION SUMMARY</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Name:</span>
                <span className="text-foreground font-medium">{surveyData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Business:</span>
                <span className="text-foreground font-medium">{surveyData.businessName}</span>
              </div>
              <div className="border-b border-border pb-2">
                <span className="text-muted-foreground">Motivation:</span>
                <p className="text-foreground font-medium mt-1">"{surveyData.motivation}"</p>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">WhatsApp:</span>
                <span className="text-foreground font-medium">{surveyData.whatsapp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground font-medium">{surveyData.email}</span>
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="card-premium">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-accent" />
              <h2 className="font-semibold text-foreground text-sm uppercase tracking-wider">NEXT STEP: SEND US YOUR APPLICATION</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              👇 <span className="font-semibold text-foreground">Copy the email below</span> and paste it into a new email to
            </p>
            <p className="text-sm text-accent font-medium mb-4">growth@getorah.co.za</p>

            <div className="relative bg-muted/50 rounded-xl p-4">
              <button onClick={handleCopy} className="absolute top-3 right-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {copied ? <><Check className="w-4 h-4 text-success" /><span className="text-success">Copied!</span></> : <><Copy className="w-4 h-4" /><span>Copy</span></>}
              </button>
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans pr-16">{emailText}</pre>
            </div>

            <Button onClick={handleCopy} className="w-full mt-4 h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base">
              {copied ? '✅ Copied! Now paste it in your email' : '📋 COPY EMAIL TO CLIPBOARD'}
            </Button>
          </div>

          {/* What Happens Next */}
          <div className="space-y-4">
            <h2 className="font-semibold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
              📋 WHAT HAPPENS NEXT?
            </h2>
            <div className="space-y-4">
              {[
                "Within 24 hours, our designer will reach out via WhatsApp.",
                "Our designer will chat with you to understand your design preferences, style, and exactly what you need.",
                "You'll receive an invoice for your 50% deposit (R2,500) to kick things off.",
                "Once payment is confirmed, your design mockup will be ready within 3-5 business days.",
                "After approval and final payment, your website launches within 7 days!",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">{i + 1}</div>
                  <p className="text-sm text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee */}
          <div className="bg-success/10 border border-success/30 rounded-xl p-5">
            <p className="font-semibold text-foreground mb-1">🛡️ OUR GUARANTEE</p>
            <p className="text-sm text-foreground">
              Not 100% satisfied with your design mockup? We'll revise until you love it.
            </p>
          </div>

          {/* Send Email CTA */}
          <a href={mailtoLink} className="block">
            <Button className="btn-primary flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />SEND EMAIL NOW →
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
