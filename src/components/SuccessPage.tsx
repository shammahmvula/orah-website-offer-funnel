import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, MessageCircle, Shield, Star } from 'lucide-react';
import { useSurvey } from '@/contexts/SurveyContext';
import { Button } from '@/components/ui/button';
import { FomoTicker } from './FomoTicker';
import { supabase } from '@/integrations/supabase/client';

export function SuccessPage() {
  const { surveyData } = useSurvey();
  const [copied, setCopied] = useState(false);

  // Save completed survey to database
  useEffect(() => {
    const saveResponse = async () => {
      await supabase.from('survey_responses').insert({
        province: surveyData.province || null,
        business_age: surveyData.businessAge || null,
        monthly_revenue: surveyData.monthlyRevenue || null,
        industry: surveyData.industry || null,
        website_situation: surveyData.websiteSituation || null,
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
      });
    };
    saveResponse();
  }, []);

  const wantsReviews = surveyData.googleReviewsInterest === 'yes';

  const emailBody = `Hi there,

I just completed my application for the R5,000 bespoke website offer.

Name: ${surveyData.fullName}
Business: ${surveyData.businessName}
Billing Address: ${surveyData.billingAddress}
Industry: ${surveyData.industry}
Location: ${surveyData.province}
Current website: ${surveyData.websiteUrl || 'None'}
${wantsReviews ? 'Google Reviews: Yes, interested in free month!\n' : ''}
My motivation: "${surveyData.motivation}"

Looking forward to hearing from you!

${surveyData.fullName}
${surveyData.whatsapp}`;

  const emailText = `To: designer@agency.co.za
Subject: Website Application - ${surveyData.businessName}

${emailBody}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I just qualified for the R5,000 website offer. My business is ${surveyData.businessName} in ${surveyData.industry}. ${wantsReviews ? "I'm also interested in the free Google Reviews offer! " : ""}Looking forward to discussing!`
  );

  const mailtoLink = `mailto:designer@agency.co.za?subject=${encodeURIComponent(`Website Application - ${surveyData.businessName}`)}&body=${encodeURIComponent(emailBody)}`;

  const steps = [
    "Within 24 hours, our designer will reach out via WhatsApp.",
    "Our designer will chat with you to understand your design preferences, style, and exactly what you need.",
    "You'll receive an invoice for your 50% deposit (R2,500) to kick things off.",
    "Once payment is confirmed, your design mockup will be ready within 3-5 business days.",
    "After approval and final payment, your website launches within 7 days!",
  ];

  return (
    <div className="min-h-screen bg-background">
      <FomoTicker />
      <div className="pt-20 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto space-y-6"
        >
          {/* Celebration Header */}
          <div className="text-center">
            <h1 className="font-serif text-4xl text-foreground mb-2">
              🎉 Congratulations!
            </h1>
            <p className="text-lg text-muted-foreground">
              You've officially qualified for our R5,000 Bespoke Website Offer!
            </p>
          </div>

          {/* Google Reviews Bonus */}
          {wantsReviews && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-accent/10 border border-accent/30 rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-lg mb-1">⭐ Google Reviews Bonus Activated!</p>
                  <p className="text-sm text-foreground">
                    Great choice, {surveyData.fullName?.split(' ')[0]}! As a {surveyData.industry?.replace(/^[^\s]+\s/, '')} business in {surveyData.province?.replace(/\s*\(.*\)/, '')}, getting more 5-star reviews will set you apart from competitors. We'll set up your review generation system completely free for the first month alongside your new website.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Summary Card */}
          <div className="card-premium">
            <h2 className="font-semibold text-foreground text-lg mb-4 uppercase tracking-wide">
              Your Application Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="text-foreground font-medium">{surveyData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Business:</span>
                <span className="text-foreground font-medium">{surveyData.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Industry:</span>
                <span className="text-foreground font-medium">{surveyData.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="text-foreground font-medium">{surveyData.province}</span>
              </div>
              {wantsReviews && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Google Reviews:</span>
                  <span className="text-accent font-medium">✅ Free month activated</span>
                </div>
              )}
              {surveyData.motivation && (
                <div className="pt-2 border-t border-border">
                  <span className="text-muted-foreground">Motivation:</span>
                  <p className="text-foreground italic mt-1">"{surveyData.motivation}"</p>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-muted-foreground">WhatsApp:</span>
                <span className="text-foreground font-medium">{surveyData.whatsapp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground font-medium">{surveyData.email}</span>
              </div>
            </div>
          </div>

          {/* Copy Email Instructions */}
          <div className="card-premium">
            <h2 className="font-semibold text-foreground text-lg mb-2 flex items-center gap-2">
              ✉️ NEXT STEP: SEND US YOUR APPLICATION
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              👇 <strong>Copy the email below</strong> and paste it into a new email to <span className="text-accent font-semibold">designer@agency.co.za</span> — this confirms your spot and gets the ball rolling!
            </p>
            <div className="relative bg-muted/50 rounded-xl p-4">
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-success">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans pr-16">
                {emailText}
              </pre>
            </div>
            <Button
              onClick={handleCopy}
              className="w-full mt-4 h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base"
            >
              {copied ? '✅ Copied! Now paste it in your email' : '📋 COPY EMAIL TO CLIPBOARD'}
            </Button>
          </div>

          {/* What Happens Next */}
          <div className="card-premium">
            <h2 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              📱 WHAT HAPPENS NEXT?
            </h2>
            <ol className="space-y-3">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Guarantee Box */}
          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">💰 OUR GUARANTEE</p>
                <p className="text-sm text-foreground">
                  Not 100% satisfied with your design mockup? We'll revise until you love it. Your satisfaction is our priority.
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <a href={mailtoLink} className="block">
              <Button className="btn-primary flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                SEND EMAIL NOW →
              </Button>
            </a>
            <a
              href={`https://wa.me/27000000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full h-14 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold text-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp →
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
